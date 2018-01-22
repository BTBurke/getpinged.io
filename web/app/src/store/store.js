import { types, flow } from 'mobx-state-tree';
import drop from 'lodash/drop';
import take from 'lodash/take';
import pull from 'lodash/pull';
import includes from 'lodash/includes';
import map from 'lodash/map';
import { ulid } from 'ulid';
import api from './api';

const User = types.model("User", {
    id: types.identifier(),
    email: types.string,
    name: types.maybe(types.string),
    githubUser: types.maybe(types.string),
    avatar: types.maybe(types.string)
})
.actions(self => {
    return {
        updateEmail(email) {
            self.email = email
        }
    }
});

const Error = types.model("Error", {
    code: types.number(),
    msg: types.optional(types.string, "")
})

const Session = types.model("Session", {
    id: types.maybe(types.string),
    error: types.maybe(Error),
    role: types.enumeration("role", ["user", "admin"]),
})


const Project = types.model("Project", {
    id: types.identifier(types.number),
    owner: types.string,
    repo: types.string,
    url: types.string,
    description: types.optional(types.string, ""),
    stars: types.optional(types.number, 0),
    topics: types.optional(types.array(types.string), []),
    commit: types.maybe(types.Date),
    language: types.maybe(types.string),
    score: types.maybe(types.number),
})

const SearchResult = types.model("SearchResult", {
    results: types.optional(types.array(Project), []),
    total: types.optional(types.number, 0),
    term: types.string,
    qualifiers: types.maybe(types.array(types.string)),
    perPage: types.optional(types.number, 25),
    inFlight: types.boolean,
})
.views(self => {
    return {
        getPage(page) {
            const start = (page-1)*self.perPage + 1;
            const end = page * self.perPage;
            if (end >= self.results.length && self.total >= start) {
                console.log('would fetch next page');
            }
            return take(drop(self.results, (page-1)*self.perPage), self.perPage)
        },
        get totalPages() {
            return Math.ceil(self.total/self.perPage);
        }
    }
})
.actions(self => {
    return {
        getNextPage() {
            self.inFlight = true
            
        }
    }
})

const Store = types.model("Store", {
    session: types.maybe(Session),
    user: types.maybe(User),
    following: types.optional(types.array(Project), []),
    search: types.maybe(SearchResult),
    inFlight: types.optional(types.array(types.string), [])
})
.views(self => {
    return {
        get isFollowing(project) {
            return includes(self.following, project)
        },
        get isInFlight(id) {
            return includes(self.inFlight, id)
        }
    }
})
.actions(self => {
    return {
        clearSearch() {
            self.search = null
        },
        search: flow(function* search(term, qualifiers) {
            self.search = Search.create({
                term = term,
                qualifiers = qualifiers,
                inFlight = true,
            })
            console.log("starting search: ", self.search)
            try {
                const results = yield api.search(term, qualifiers, 1)
                self.search.results = map(results, (resp) => {
                    Project.create({
                        id: resp.id,
                        owner: resp.owner,
                        repo: resp.repo,
                        url: resp.url,
                        description: resp.description,
                        stars: resp.stars,
                        topics: resp.topics,
                        commit: new Date(resp.commit),
                        language: resp.language,
                        score: resp.score,
                    })
                })
            } catch (e) {
                self.session.error = Error.create({
                    code = e.code,
                    msg = e.msg,
                })
            }
        }),
        follow: flow(function* follow(project, requestID) {
            const id = requestID || ulid()
            self.inFlight.push(id)
            try {
                yield api.follow(project)
            } catch (e) {
                self.session.error = Error.create({
                    code = e.code,
                    msg = e.msg
                })
            }
            self.following.push(project)
            pull(self.inFlight, id)
        }),
        unfollow: flow(function* unfollow(project, requestID) {
            const id = requestID || ulid()
            self.inFlight.push(id)
            try {
                yield api.unfollow(project)
            } catch (e) {
                self.session.error = Error.create({
                    code = e.code,
                    msg = e.msg
                })
            }
            pull(self.following, project)
            pull(self.inFlight, id)
        }),
        logout: flow(function* logout(requestID) {
            self.session = null;
            self.user = null;
            self.following = [];
            self.search = null;
            self.inFlight = [];
            try {
                yield api.logout()
            } catch (e) {
                // do nothing here, even if logout fails
            }
            // TODO: delete cookie
            window.location.replace('https://getpinged.io');
        }),
        login: flow(function* login(email, password, requestID) {
            const id = requestID || ulid()
            self.inFlight.push(id)
            try {
                const sess = yield api.login(email, password)
                self.session = Session.create({
                    id: sess.id,
                    role: sess.role
                });
                
                const projects = yield api.getAllFollows()
                self.following = map(projects, (resp) => {
                    Project.create({
                        id: resp.id,
                        owner: resp.owner,
                        repo: resp.repo,
                        url: resp.url,
                        description: resp.description,
                        stars: resp.stars,
                        topics: resp.topics,
                        commit: new Date(resp.commit),
                        language: resp.language,
                    })
                })
            } catch (e) {
                self.session.error = Error.create({
                    code = e.code,
                    msg = e.msg
                })
            }
            pull(self.inFlight, id);         
        }),
        loginWithCookie: flow(function* loginWithCookie(cookie, requestID) {
            const id = requestID || ulid()
            self.inFlight.push(id)
            try {
                const sess = yield api.loginWithCookie(cookie)
                self.session = Session.create({
                    id: sess.id,
                    role: sess.role
                });
            
                const projects = yield api.getAllFollows()
                self.following = map(projects, (resp) => {
                    Project.create({
                        id: resp.id,
                        owner: resp.owner,
                        repo: resp.repo,
                        url: resp.url,
                        description: resp.description,
                        stars: resp.stars,
                        topics: resp.topics,
                        commit: new Date(resp.commit),
                        language: resp.language,
                    })
                })
            } catch (e) {
                self.session.error = Error.create({
                    code = e.code,
                    msg = e.msg
                })
            }
            pull(self.inFlight, id);
        })
    }
})