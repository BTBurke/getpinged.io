package analyze

import (
	"fmt"
	"net/http"

	"github.com/google/go-github/github"
)

const (
	userAgent string = "getpinged.io"
)

// Default transport to reuse TCP connections
var tr http.DefaultTransport

// Transport using the app's oAuth creds
type appTransport struct {
	id     string
	secret string

	tr http.RoundTripper
}

func (t *appTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	req.Header.Set("User-Agent", userAgent)
	req.URL.Query().Set("client_id", t.id)
	req.URL.Query().Set("client_secret", t.secret)
	resp, err := t.tr.RoundTrip(req)
	return resp, err
}

// userTransport for the user's private credentials
type userTransport struct {
	token string

	tr http.RoundTripper
}

func (t *userTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	req.Header.Set("User-Agent", userAgent)
	req.Header.Set("Authorization", "token "+t.token)
	resp, err := t.tr.RoundTrip(req)
	return resp, err
}

type AppClient struct {
	ID     string
	Secret string

	client *github.Client
}

type UserClient struct {
	Token string

	client *github.Client
}

func NewAppClient(id string, secret string) (*AppClient, error) {
	if len(id) == 0 || len(secret) == 0 {
		return nil, fmt.Errorf("app client must have a id and secret")
	}

	return nil, &AppClient{
		ID:     id,
		Secret: secret,
		client: github.NewClient(&http.Client{
			Transport: &appTransport{
				id:     id,
				secret: secret,
				tr:     tr,
			},
		}),
	}
}
