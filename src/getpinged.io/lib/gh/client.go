package gh

import (
	"fmt"
	"net/http"

	"github.com/google/go-github/github"
)

const (
	userAgent string = "getpinged.io"
	// Unmodified is the status code returned by the Github API when using
	// eTags or If-Modified-Since headers to control cached results
	Unmodified int = 304
)

// Default transport to reuse TCP connections
var tr = http.DefaultTransport

// ReqTransform is a function that will alter the request in the RoundTripper interface,
// such as setting headers or manipulating the URL
type ReqTransform func(req *http.Request)

// Transport using the oAuth creds
type transport struct {
	id           string
	secret       string
	token        string
	transformers []ReqTransform

	tr http.RoundTripper
}

func (t *transport) RoundTrip(req *http.Request) (*http.Response, error) {
	for _, transform := range t.transformers {
		transform(req)
	}
	resp, err := t.tr.RoundTrip(req)
	return resp, err
}

// Client wraps a Github client with an HTTP transport that handles authorization
// on behalf of the app using the app client id and secret or personal oauth token
type Client struct {
	ID     string
	Secret string
	Token  string

	transformers []ReqTransform
	client       *github.Client
}

// NewAppClient returns a Client using the app id and secret
func NewAppClient(id string, secret string, opts ...ReqTransform) (Client, error) {
	if len(id) == 0 || len(secret) == 0 {
		return Client{}, fmt.Errorf("app client must have a id and secret")
	}

	defaultOpts := []ReqTransform{UserAgent(userAgent), Creds(id, secret)}
	opts = append(defaultOpts, opts...)

	return Client{
		ID:           id,
		Secret:       secret,
		transformers: opts,
		client: github.NewClient(&http.Client{
			Transport: &transport{
				id:           id,
				secret:       secret,
				transformers: opts,
				tr:           tr,
			},
		}),
	}, nil
}

// NewUserClient returns a Client that uses the personal oAuth token of the user for authentication
func NewUserClient(token string, opts ...ReqTransform) (Client, error) {
	if len(token) == 0 {
		return Client{}, fmt.Errorf("user client must have a token")
	}

	defaultOpts := []ReqTransform{UserAgent(userAgent), Token(token)}
	opts = append(defaultOpts, opts...)

	return Client{
		Token:        token,
		transformers: opts,
		client: github.NewClient(&http.Client{
			Transport: &transport{
				token:        token,
				transformers: opts,
				tr:           tr,
			},
		}),
	}, nil
}
