package gh

import (
	"context"
	"sort"
	"time"

	"github.com/Masterminds/semver"
	"github.com/cenkalti/backoff"
	"github.com/google/go-github/github"
)

// Tag is a repository tag name, commit, and date
type Tag struct {
	Date time.Time
	SHA  string
	Name string
}

// GetLatestTag returns the latest tag for the repo.  A nil value indicates no valid semantic version tags found in the repo.
func (c Client) GetLatestTag(ctx context.Context, owner string, repo string) (*Tag, error) {
	allTags, err := c.getTags(ctx, owner, repo)
	if err != nil {
		return nil, err
	}
	if len(allTags) >= 1 {
		latest := allTags[0]
		return &latest, nil
	}
	return nil, nil

}

// ListTags returns all semantic version tags for the given repo, sorted by date descending
func (c Client) ListTags(ctx context.Context, owner string, repo string) ([]Tag, error) {
	return c.getTags(ctx, owner, repo)
}

// getTags returns all tags that match valid semantic version numbers
func (c Client) getTags(ctx context.Context, owner string, repo string, opts ...ReqTransform) ([]Tag, error) {
	u := UpgradeClient(c, opts...)
	var tags []Tag
	get := func() error {
		opt := &github.ListOptions{
			PerPage: 100,
		}
		allTags, resp, err := u.client.Repositories.ListTags(ctx, owner, repo, opt)
		if err != nil && resp.StatusCode != Unmodified {
			return err
		}
		if resp.LastPage > 1 {
			for i := 2; i <= resp.LastPage; i++ {
				opt = &github.ListOptions{
					PerPage: 100,
					Page:    i,
				}
				pageTags, _, err := u.client.Repositories.ListTags(ctx, owner, repo, opt)
				if err != nil {
					return err
				}
				allTags = append(allTags, pageTags...)
			}
		}

		for _, tag := range allTags {
			_, err := semver.NewVersion(tag.GetName())
			if err != nil {
				continue
			}
			commit, err := c.GetCommit(ctx, owner, repo, tag.Commit.GetSHA())
			if err != nil {
				return err
			}
			tags = append(tags, Tag{
				Name: tag.GetName(),
				SHA:  tag.Commit.GetSHA(),
				Date: commit.Committer.GetDate(),
			})
		}
		return nil
	}
	if err := backoff.Retry(get, backoff.WithContext(backoff.NewExponentialBackOff(), ctx)); err != nil {
		return nil, err
	}
	if len(tags) > 1 {
		sort.Slice(tags, func(i, j int) bool { return tags[i].Date.After(tags[j].Date) })
	}
	return tags, nil
}

// GetCommit returns a commit from a specific repo and hash
func (c Client) GetCommit(ctx context.Context, owner string, repo string, sha string) (*github.Commit, error) {
	var commit *github.Commit
	get := func() error {
		var err error
		commit, _, err = c.client.Git.GetCommit(ctx, owner, repo, sha)
		if err != nil {
			return err
		}
		return nil
	}
	if err := backoff.Retry(get, backoff.WithContext(backoff.NewExponentialBackOff(), ctx)); err != nil {
		return nil, err
	}
	return commit, nil
}

// TakeTagsActiveBetween returns all tags that were active between two dates.  The tag[0] is the most current tag on the "to"
// date.  The tag[len-1] is the active tag on the from date.
func TakeTagsActiveBetween(from time.Time, to time.Time, tags []Tag) []Tag {
	var taken []Tag
	for _, tag := range tags {
		switch {
		case tag.Date.After(to):
			continue
		case tag.Date.After(from):
			taken = append(taken, tag)
		default:
			// add the last tag that was active at time "from" then break
			taken = append(taken, tag)
			break
		}
	}
	return taken
}
