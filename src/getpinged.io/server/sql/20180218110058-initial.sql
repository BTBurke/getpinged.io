
-- +migrate Up
CREATE TABLE users (
    user_id bytea PRIMARY KEY,
    email text NOT NULL,
    password text NOT NULL,
    name text,
    token text,
    avatar text,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

CREATE TABLE projects (
    project_id integer PRIMARY KEY,
    owner varchar(50) NOT NULL,
    repo varchar(50) NOT NULL,
    url varchar(100) NOT NULL,
    description text NOT NULL DEFAULT '',
    topics text[] NOT NULL DEFAULT '{}'::text[],
    language varchar(40) NOT NULL
);

CREATE TABLE users_projects (
    user_id bytea REFERENCES users(user_id),
    project_id integer REFERENCES projects(project_id)  
);

ALTER TABLE users_projects ADD PRIMARY KEY (user_id, project_id);

-- +migrate Down
DROP TABLE users_projects;
DROP TABLE users CASCADE;
DROP TABLE projects CASCADE;