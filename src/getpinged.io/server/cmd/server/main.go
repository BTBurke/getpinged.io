package main

import (
	"os"
	"time"

	"getpinged.io/server"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
)

func connectDatabase() (*sqlx.DB, error) {
	db, err := sqlx.Connect("postgres", "user=postgres password=postgres dbname=pinged sslmode=disable")
	err = errors.Wrap(err, "failed to connect to database")
	return db, err
}

func main() {
	log.SetOutput(os.Stdout)
	log.SetFormatter(&log.JSONFormatter{})
	log.SetLevel(log.ErrorLevel)

	db, err := connectDatabase()
	if err != nil {
		log.Fatal(err)
	}

	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))

	r.Post("/session", SessionHandler(db))
	// adds custom context values for sessions
	r.Route("/projects", func(r chi.Router) {
		r.Use(server.SessionMiddleware)
		r.Get("/", getProjects(db))

	})

}
