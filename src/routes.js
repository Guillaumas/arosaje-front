export const createRoute = (baseURL, page = 0, size = 20, method = 'GET') => ({
  URL: `${baseURL}?page=${page}&size=${size}`,
  METHOD: method,
});

export const MEDIAS = {
  SELF: createRoute("http://localhost:8080/api/medias"),
  PROFILE: createRoute("http://localhost:8080/api/profile/medias"),
  SEARCH: createRoute("http://localhost:8080/api/medias/search", 0, 20, 'POST')
};

export const SPECIES = {
  SELF: createRoute("http://localhost:8080/api/species"),
  PROFILE: createRoute("http://localhost:8080/api/profile/species"),
  SEARCH: createRoute("http://localhost:8080/api/species/search", 0, 20, 'POST')
};

export const ROLES = {
  SELF: createRoute("http://localhost:8080/api/roles"),
  PROFILE: createRoute("http://localhost:8080/api/profile/roles")
};

export const ANNOUNCES = {
  SELF: createRoute("http://localhost:8080/api/announces"),
  PROFILE: createRoute("http://localhost:8080/api/profile/announces"),
  SEARCH: createRoute("http://localhost:8080/api/announces/search", 0, 20, 'POST')
};

export const LOGINS = {
  SELF: createRoute("http://localhost:8080/api/logins"),
  PROFILE: createRoute("http://localhost:8080/api/profile/logins"),
  SEARCH: createRoute("http://localhost:8080/api/logins/search", 0, 20, 'POST')
};

export const CONVERSATIONS = {
  SELF: createRoute("http://localhost:8080/api/conversations"),
  PROFILE: createRoute("http://localhost:8080/api/profile/conversations"),
  SEARCH: createRoute("http://localhost:8080/api/conversations/search", 0, 20, 'POST')
};

export const PLANTS = {
  SELF: createRoute("http://localhost:8080/api/plants"),
  PROFILE: createRoute("http://localhost:8080/api/profile/plants"),
  SEARCH: createRoute("http://localhost:8080/api/plants/search", 0, 20, 'POST')
};

export const USERS = {
  SELF: createRoute("http://localhost:8080/api/users"),
  PROFILE: createRoute("http://localhost:8080/api/profile/users"),
  SEARCH: createRoute("http://localhost:8080/api/users/search", 0, 20, 'POST')
};

export const UPKEEPS = {
  SELF: createRoute("http://localhost:8080/api/upkeeps"),
  PROFILE: createRoute("http://localhost:8080/api/profile/upkeeps"),
  SEARCH: createRoute("http://localhost:8080/api/upkeeps/search", 0, 20, 'POST')
};

export const COMMENTS = {
  SELF: createRoute("http://localhost:8080/api/comments"),
  PROFILE: createRoute("http://localhost:8080/api/profile/comments"),
  SEARCH: createRoute("http://localhost:8080/api/comments/search", 0, 20, 'POST')
};

export const PROFILE = {
  SELF: createRoute("http://localhost:8080/api/profile"),
  ROLES: createRoute("http://localhost:8080/api/profile/roles"),
  LOGINS: createRoute("http://localhost:8080/api/profile/logins"),
  CONVERSATIONS: createRoute("http://localhost:8080/api/profile/conversations"),
  SPECIES: createRoute("http://localhost:8080/api/profile/species"),
  COMMENTS: createRoute("http://localhost:8080/api/profile/comments"),
  USERS: createRoute("http://localhost:8080/api/profile/users"),
  UPKEEPS: createRoute("http://localhost:8080/api/profile/upkeeps"),
  ANNOUNCES: createRoute("http://localhost:8080/api/profile/announces"),
  PLANTS: createRoute("http://localhost:8080/api/profile/plants"),
  MEDIAS: createRoute("http://localhost:8080/api/profile/medias")
};