package gh

import (
	"context"
	"sort"
	"time"

	"github.com/cenkalti/backoff"
	"github.com/google/go-github/github"
)

// ListIssues returns all closed issues that have been updated since a particular time.  Note that every pull request
// also creates an issue.  Use IsPullRequest() to determine whether the particular issue was generated because
// of a new pull request.
func (c Client) ListIssues(ctx context.Context, owner string, repo string, since time.Time, opts ...ReqTransform) ([]*github.Issue, error) {
	u := UpgradeClient(c, opts...)
	var issues []*github.Issue
	get := func() error {
		var resp *github.Response
		var err error
		opt := &github.IssueListByRepoOptions{
			State: "closed",
			Since: since,
			ListOptions: github.ListOptions{
				Page:    1,
				PerPage: 100,
			},
		}
		issues, resp, err = u.client.Issues.ListByRepo(ctx, owner, repo, opt)
		if err != nil && resp.StatusCode != Unmodified {
			return err
		}
		if resp.LastPage > 1 {
			for i := 2; i <= resp.LastPage; i++ {
				opt = &github.IssueListByRepoOptions{
					State: "closed",
					Since: since,
					ListOptions: github.ListOptions{
						Page:    i,
						PerPage: 100,
					},
				}
				pageIssues, _, err := u.client.Issues.ListByRepo(ctx, owner, repo, opt)
				if err != nil {
					return err
				}
				issues = append(issues, pageIssues...)
			}
		}
		return nil
	}
	if err := backoff.Retry(get, backoff.WithContext(backoff.NewExponentialBackOff(), ctx)); err != nil {
		return nil, err
	}
	sort.Slice(issues, func(i, j int) bool {
		return issues[i].GetClosedAt().After(issues[j].GetClosedAt())
	})
	return issues, nil
}

// TakeIssuesClosedBetween returns all issues with a close date between from and to
func TakeIssuesClosedBetween(from time.Time, to time.Time, issues []*github.Issue) []*github.Issue {
	var taken []*github.Issue
	for _, issue := range issues {
		closeDate := issue.GetClosedAt()
		if closeDate.After(from) && closeDate.Before(to) {
			taken = append(taken, issue)
		}
	}
	return taken
}

// TakePullRequests returns only those issues that are pull requests
func TakePullRequests(issues []*github.Issue) []*github.Issue {
	var taken []*github.Issue
	for _, issue := range issues {
		if issue.IsPullRequest() {
			taken = append(taken, issue)
		}
	}
	return taken
}
