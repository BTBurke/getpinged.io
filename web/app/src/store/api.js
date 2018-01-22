import axios from 'axios';

axios.interceptors.response.use(function(response) {
    return Promise.resolve(response.data)
}, function (error) {
    if (error.response) {
        const err = {
            code: error.response.status,
            msg: error.response.data.msg,
        }
    } else {
        const err = {
            code: 503,
            msg: 'server did not respond',
        }
    } 

    return Promise.reject(err); 
})

const client = axios.create({
    baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:9000/' : 'https://api.getpinged.io/',
    timeout: 2000,
})


function search(term, qualifiers) {
    return client.request({
        url: '/search',
        method: 'post',
        data: {
            term: term,
            qualifiers: qualifiers,
        }
    })
}

function follow(project) {
    return client.request({
        url: '/projects',
        method: 'post',
        data: project,
    })
}

function unfollow(project) {
    return client.request({
        url: '/projects/' + project.id,
        method: 'delete'
    })
}

function getAllFollows() {
    return client.request({
        url: '/projects',
        method: 'get'
    })
}

function login(user, password) {
    return client.request({
        url: '/session',
        method: 'post',
        data: {
            user: user,
            password: password
        }
    })
}

function loginWithCookie() {
    return client.request({
        url: '/session',
        method: 'get',
    })
}

function logout() {
    return client.request({
        url: '/session',
        method: 'delete' 
    })
} 

// TODO: createUser, updateUserEmail, changeUserPassword, deleteUser

const api = {
    search,
    follow,
    unfollow,
    login,
    loginWithCookie,
    logout
}

export default api;
