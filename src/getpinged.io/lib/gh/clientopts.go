package gh

import (
	"fmt"
	"net/http"
	"time"

	"github.com/google/go-github/github"
)

// UpgradeClient will create a new client with the additional options that will
// modify the outgoing request.
func UpgradeClient(base Client, opts ...ReqTransform) Client {
	newOpts := append(base.transformers, opts...)

	return Client{
		ID:           base.ID,
		Secret:       base.Secret,
		Token:        base.Token,
		transformers: newOpts,
		client: github.NewClient(&http.Client{
			Transport: &transport{
				id:           base.ID,
				secret:       base.Secret,
				token:        base.Token,
				transformers: newOpts,
				tr:           tr,
			},
		}),
	}
}

// Etag will add an If-None-Match header to the outgoing request.  A 304 response
// indicates that there are no changes since the last request.
func Etag(tag string) ReqTransform {
	return func(req *http.Request) {
		quotedTag := fmt.Sprintf("\"%s\"", tag)
		req.Header.Set("If-None-Match", quotedTag)
	}
}

// Since will an an If-Modified-Since header to the outgoing request.  A 304 response
// indicates that there are no changes since the last request.
func Since(t time.Time) ReqTransform {
	return func(req *http.Request) {
		tFormatted := t.Format(time.RFC1123)
		req.Header.Set("If-Modified-Since", tFormatted)
	}
}

// UserAgent adds a User-Agent header.  This is a default option that is added to every
// outgoing request as required by the Github API.
func UserAgent(agent string) ReqTransform {
	return func(req *http.Request) {
		req.Header.Set("User-Agent", agent)
	}
}

// Creds adds the oAuth client id and secret to the outgoing request.  This is a default
// option that is added to every outgoing request as required by the Github API.
func Creds(id string, secret string) ReqTransform {
	return func(req *http.Request) {
		q := req.URL.Query()
		q.Set("client_id", id)
		q.Set("client_secret", secret)
		req.URL.RawQuery = q.Encode()
	}
}

// Token uses the personal oAuth token set via the Authorization header
func Token(token string) ReqTransform {
	return func(req *http.Request) {
		req.Header.Set("Authorization", "token "+token)
	}
}
