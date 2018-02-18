package server

import (
	"database/sql"

	"github.com/lib/pq"

	"github.com/jmoiron/sqlx"
)

type Project struct {
	ProjectID   int64
	Owner       string
	Repo        string
	URL         string
	Description string
	Topics      []string
	Language    string
}

type ProjectService interface {
	UpsertProject(p *Project) error
	FollowProject(userID string, projectID int64) error
	UnfollowProject(userID string, projectID int64) error
	GetFollowedProjects(userID string) ([]Project, error)
}

type projectService struct {
	db *sqlx.DB
}

func NewProjectService(db *sqlx.DB) *projectService {
	return &projectService{
		db: db,
	}
}

func (p *projectService) UpsertProject(proj *Project) error {
	sqlStr := `INSERT INTO projects (` +
		`project_id, owner, repo, url, description, topics, language` +
		`) VALUES (` +
		`$1, $2, $3, $4, $5, $6, $7)
		ON CONFLICT (project_id)
		DO NOTHING;`
	_, err := p.db.Exec(sqlStr,
		proj.ProjectID,
		proj.Owner,
		proj.Repo,
		proj.URL,
		proj.Description,
		pq.Array(proj.Topics),
		proj.Language)
	return err
}

func (p *projectService) FollowProject(userID string, projectID int64) error {
	sqlStr := `INSERT INTO users_projects (` +
		`user_id, project_id` +
		`) VALUES (` +
		`$1, $2)
		ON CONFLICT (user_id, project_id)
		DO NOTHING;`
	_, err := p.db.Exec(sqlStr,
		userID,
		projectID)
	return err
}

func (p *projectService) UnfollowProject(userID string, projectID int64) error {
	sqlStr := `DELETE FROM users_projects WHERE user_id=$1 AND project_id=$2`
	_, err := p.db.Exec(sqlStr,
		userID,
		projectID)
	return err
}

func (p *projectService) GetFollowedProjects(userID string) ([]Project, error) {
	sqlStr := `SELECT p.user_id, p.owner, p.repo, p.url, p.description, p.topics, p.language` +
		`FROM users_projects up` +
		`INNER JOIN projects p ON p.project_id = up.project_id` +
		`WHERE up.user_id = $1`

	var projs []Project
	err := p.db.Select(&projs, sqlStr, userID)
	if err != nil && err != sql.ErrNoRows {
		return []Project{}, err
	}
	return projs, nil
}
