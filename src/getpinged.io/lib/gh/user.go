package gh

import (
	"context"

	"github.com/cenkalti/backoff"
	"github.com/google/go-github/github"
)

// GetUser returns user data and the raw JSON response
func (u Client) GetUser(ctx context.Context) (*github.User, error) {
	var user *github.User
	get := func() error {
		var err error
		user, _, err = u.client.Users.Get(ctx, "")
		if err != nil {
			return err
		}
		return nil
	}
	if err := backoff.Retry(get, backoff.WithContext(backoff.NewExponentialBackOff(), ctx)); err != nil {
		return nil, err
	}
	return user, nil
}

// ListUserEmails returns all registered emails for a user
func (u Client) ListUserEmails(ctx context.Context) ([]*github.UserEmail, error) {
	var emails []*github.UserEmail
	get := func() error {
		var err error
		emails, _, err = u.client.Users.ListEmails(ctx, nil)
		if err != nil {
			return err
		}
		return nil
	}
	if err := backoff.Retry(get, backoff.WithContext(backoff.NewExponentialBackOff(), ctx)); err != nil {
		return nil, err
	}
	return emails, nil
}

// ListRepos returns all public repos associated with the currrent user's token
func (u Client) ListRepos(ctx context.Context) ([]*github.Repository, error) {
	var repos []*github.Repository
	get := func() error {
		var err error
		opt := &github.RepositoryListOptions{
			Type: "public",
			Sort: "updated",
		}
		repos, _, err = u.client.Repositories.List(ctx, "", opt)
		if err != nil {
			return err
		}
		return nil
	}
	if err := backoff.Retry(get, backoff.WithContext(backoff.NewExponentialBackOff(), ctx)); err != nil {
		return nil, err
	}
	return repos, nil
}

// ListStarredRepos returns all public repos starred by the current user
func (u Client) ListStarredRepos(ctx context.Context) ([]*github.StarredRepository, error) {
	var repos []*github.StarredRepository
	get := func() error {
		var err error
		var resp *github.Response
		opt := &github.ActivityListStarredOptions{
			Sort: "updated",
			ListOptions: github.ListOptions{
				Page:    1,
				PerPage: 100,
			},
		}
		repos, resp, err = u.client.Activity.ListStarred(ctx, "", opt)
		if err != nil {
			return err
		}
		if resp.LastPage > 1 {
			for i := 2; i <= resp.LastPage; i++ {
				opt = &github.ActivityListStarredOptions{
					Sort: "updated",
					ListOptions: github.ListOptions{
						Page:    i,
						PerPage: 100,
					},
				}
				pageRepos, _, err := u.client.Activity.ListStarred(ctx, "", opt)
				if err != nil {
					return err
				}
				repos = append(repos, pageRepos...)
			}
		}
		return nil
	}
	if err := backoff.Retry(get, backoff.WithContext(backoff.NewExponentialBackOff(), ctx)); err != nil {
		return nil, err
	}
	return repos, nil
}

// ListWatchedRepos returns all public repos watched by the current user (removing any autowatched where
// user is owner)
func (u Client) ListWatchedRepos(ctx context.Context) ([]*github.Repository, error) {
	var repos []*github.Repository
	get := func() error {
		var allRepos []*github.Repository
		var err error
		var resp *github.Response
		opt := &github.ListOptions{
			Page:    1,
			PerPage: 100,
		}
		allRepos, resp, err = u.client.Activity.ListWatched(ctx, "", opt)
		if err != nil {
			return err
		}
		if resp.LastPage > 1 {
			for i := 2; i <= resp.LastPage; i++ {
				opt = &github.ListOptions{
					Page:    i,
					PerPage: 100,
				}
				pageRepos, _, err := u.client.Activity.ListWatched(ctx, "", opt)
				if err != nil {
					return err
				}
				allRepos = append(allRepos, pageRepos...)
			}
		}

		user, _, err := u.client.Users.Get(ctx, "")
		if err != nil {
			return err
		}

		for _, repo := range allRepos {
			if repo.Owner.GetLogin() != user.GetLogin() {
				repos = append(repos, repo)
			}
		}
		return nil
	}
	if err := backoff.Retry(get, backoff.WithContext(backoff.NewExponentialBackOff(), ctx)); err != nil {
		return nil, err
	}
	return repos, nil
}
