package server

import (
	"context"
	"net/http"
)

// ContextKey is a type for passing values via context
type ContextKey int

const (
	// UserID is a context value for the DB primary key of the user making the request
	// from the session store
	UserID ContextKey = iota

	// Role is the context value for the assigned role to the session, either user or
	// admin
	Role
)

// SessionMiddleware extracts the cookie from an incoming request and maps it
// to an existing session or rejects it 401
func SessionMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		_, err := r.Cookie("pinged")
		if err != nil {
			http.Error(w, http.StatusText(401), 401)
		}

		//TODO: look up session in redis
		ctx1 := context.WithValue(r.Context(), UserID, "11111111111")
		ctx2 := context.WithValue(ctx1, Role, "user")

		next.ServeHTTP(w, r.WithContext(ctx2))
	})
}
