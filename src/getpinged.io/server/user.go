package server

import (
	"time"

	"github.com/jmoiron/sqlx"
)

type User struct {
	UserID    string
	Email     string
	Password  string `json:"-"`
	Name      string
	Token     string
	Avatar    string
	CreatedAt time.Time
	UpdatedAt time.Time
}

type UserService interface {
	CreateUser(u *User) error
	UpdateUser(u *User) error
	DeleteUser(id string) error
	GetUserByEmail(email string) (User, error)
	GetUserByID(id string) (User, error)
}

type userService struct {
	db *sqlx.DB
}

func NewUserService(db *sqlx.DB) *userService {
	return &userService{
		db: db,
	}
}

func (u *userService) CreateUser(user *User) error {
	sqlStr := `INSERT INTO users (` +
		`user_id, email, password, name, token, avatar` +
		`) VALUES (` +
		`$1, $2, $3, $4, $5, $6)`
	_, err := u.db.Exec(sqlStr,
		user.UserID,
		user.Email,
		user.Password,
		user.Name,
		user.Token,
		user.Avatar)
	return err
}

func (u *userService) UpdateUser(user *User) error {
	sqlStr := `UPDATE users SET (` +
		`user_id, email, password, name, token, avatar` +
		`) = (` +
		`$1, $2, $3, $4, $5, $6)`
	_, err := u.db.Exec(sqlStr,
		user.UserID,
		user.Email,
		user.Password,
		user.Name,
		user.Token,
		user.Avatar)
	return err
}

func (u *userService) DeleteUser(userID string) error {
	sqlStr := `DELETE FROM users WHERE user_id = $1`
	_, err := u.db.Exec(sqlStr, userID)
	return err
}

func (u *userService) GetUserByEmail(email string) (User, error) {
	sqlStr := `SELECT * FROM users WHERE email = $1`
	var user User
	err := u.db.Get(&user, sqlStr, email)
	return user, err
}

func (u *userService) GetUserByID(id string) (User, error) {
	sqlStr := `SELECT * FROM users WHERE user_id = $1`
	var user User
	err := u.db.Get(&user, sqlStr, id)
	return user, err
}
