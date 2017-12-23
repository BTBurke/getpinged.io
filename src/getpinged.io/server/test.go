package server

import (
	"github.com/go-chi/chi"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/pkg/errors"
)

func connect() (*sqlx.DB, error) {
	db, err := sqlx.Connect("postgres", "user=foo dbname=bar sslmode=disable")
	err = errors.Wrap(err, "failed to connect to database")
	return db, err
}

func server() error {
	_ := chi.NewRouter()
}
