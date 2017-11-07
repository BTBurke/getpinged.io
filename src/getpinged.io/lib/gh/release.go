package gh

import (
	"context"
	"sort"

	"github.com/cenkalti/backoff"
	"github.com/google/go-github/github"
)

func (c Client) GetLatestRelease(ctx context.Context, owner string, repo string, opts ...ReqTransform) (*github.RepositoryRelease, error) {
	u := UpgradeClient(c, opts...)
	var release *github.RepositoryRelease
	get := func() error {
		var resp *github.Response
		var err error
		release, resp, err = u.client.Repositories.GetLatestRelease(ctx, owner, repo)
		if err != nil && resp.StatusCode != Unmodified {
			return err
		}
		return nil
	}
	if err := backoff.Retry(get, backoff.WithContext(backoff.NewExponentialBackOff(), ctx)); err != nil {
		return nil, err
	}
	return release, nil
}

// ListReleases will list all releases in descending time order
func (c Client) ListReleases(ctx context.Context, owner string, repo string, opts ...ReqTransform) ([]*github.RepositoryRelease, error) {
	u := UpgradeClient(c, opts...)
	var releases []*github.RepositoryRelease
	get := func() error {
		var resp *github.Response
		var err error
		opt := &github.ListOptions{
			Page:    1,
			PerPage: 100,
		}
		releases, resp, err = u.client.Repositories.ListReleases(ctx, owner, repo, opt)
		if err != nil && resp.StatusCode != Unmodified {
			return err
		}
		if resp.LastPage > 1 {
			for i := 2; i <= resp.LastPage; i++ {
				opt = &github.ListOptions{
					Page:    i,
					PerPage: 100,
				}
				pageReleases, _, err := u.client.Repositories.ListReleases(ctx, owner, repo, opt)
				if err != nil {
					return err
				}
				releases = append(releases, pageReleases...)
			}
		}
		return nil
	}
	if err := backoff.Retry(get, backoff.WithContext(backoff.NewExponentialBackOff(), ctx)); err != nil {
		return nil, err
	}
	sort.Slice(releases, func(i, j int) bool {
		t1 := releases[i].GetCreatedAt()
		t2 := releases[j].GetCreatedAt()
		return t1.After(t2.Time)
	})
	return releases, nil
}
