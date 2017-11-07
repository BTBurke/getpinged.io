package gh

import (
	"context"
	"sort"
	"time"

	"github.com/cenkalti/backoff"
	"github.com/google/go-github/github"
)

// ListPullRequests returns all the closed pull requests for the repo.  Use TakeMerged to filter only those that
// were eventually merged.
func (c Client) ListPullRequests(ctx context.Context, owner string, repo string, since time.Time, opts ...ReqTransform) ([]*github.PullRequest, error) {
	u := UpgradeClient(c, opts...)
	var requests []*github.PullRequest
	get := func() error {
		var resp *github.Response
		var err error
		opt := &github.PullRequestListOptions{
			State: "closed",
			ListOptions: github.ListOptions{
				Page:    1,
				PerPage: 100,
			},
		}
		requests, resp, err = u.client.PullRequests.List(ctx, owner, repo, opt)
		if err != nil && resp.StatusCode != Unmodified {
			return err
		}
		sort.Slice(requests, func(i, j int) bool { return requests[i].GetClosedAt().After(requests[j].GetClosedAt()) })
		if requests[len(requests)-1].GetClosedAt().Before(since) {
			return nil
		}

		if resp.LastPage > 1 {
			for i := 2; i <= resp.LastPage; i++ {
				opt = &github.PullRequestListOptions{
					State: "closed",
					ListOptions: github.ListOptions{
						Page:    i,
						PerPage: 100,
					},
				}
				pageReqs, _, err := u.client.PullRequests.List(ctx, owner, repo, opt)
				if err != nil {
					return err
				}
				requests = append(requests, pageReqs...)
				// sort then return once you get a pull request before the start date
				sort.Slice(requests, func(i, j int) bool { return requests[i].GetClosedAt().After(requests[j].GetClosedAt()) })
				if requests[len(requests)-1].GetClosedAt().Before(since) {
					return nil
				}
			}
		}
		return nil
	}
	if err := backoff.Retry(get, backoff.WithContext(backoff.NewExponentialBackOff(), ctx)); err != nil {
		return nil, err
	}
	var timeBoundRequests []*github.PullRequest
	for _, request := range requests {
		if request.GetClosedAt().After(since) {
			timeBoundRequests = append(timeBoundRequests, request)
		}
	}
	return timeBoundRequests, nil
}

// TakeMerged will filter a list of pull requests returning only those that were merged
func TakeMerged(pullRequests []*github.PullRequest) []*github.PullRequest {
	var taken []*github.PullRequest
	for _, pull := range pullRequests {
		if pull.MergedAt != nil {
			taken = append(taken, pull)
		}
	}
	return taken
}

// TakeBetween will filter a list of pull requests returning only those between the two dates
func TakeBetween(from time.Time, to time.Time, pullRequests []*github.PullRequest) []*github.PullRequest {
	var taken []*github.PullRequest
	for _, pull := range pullRequests {
		mergeDate := pull.GetMergedAt()
		if mergeDate.After(from) && mergeDate.Before(to) {
			taken = append(taken, pull)
		}
	}
	return taken
}
