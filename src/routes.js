const BASE_URL = "http://localhost:8080/api";

export const MEDIAS = {
  SELF: `${BASE_URL}/medias?page=0&size=20`,
  PROFILE: `${BASE_URL}/profile/medias`,
  SEARCH: `${BASE_URL}/medias/search`
};

export const SPECIES = {
  SELF: `${BASE_URL}/species?page=0&size=20`,
  PROFILE: `${BASE_URL}/profile/species`,
  SEARCH: `${BASE_URL}/species/search`
};

export const ROLES = {
  SELF: `${BASE_URL}/roles?page=0&size=20`,
  PROFILE: `${BASE_URL}/profile/roles`
};

export const ANNOUNCES = {
  SELF: `${BASE_URL}/announces?page=0&size=20`,
  PROFILE: `${BASE_URL}/profile/announces`,
  SEARCH: `${BASE_URL}/announces/search`
};

export const LOGINS = {
  SELF: `${BASE_URL}/logins?page=0&size=20`,
  PROFILE: `${BASE_URL}/profile/logins`,
  SEARCH: `${BASE_URL}/logins/search`
};

export const CONVERSATIONS = {
  SELF: `${BASE_URL}/conversations?page=0&size=20`,
  PROFILE: `${BASE_URL}/profile/conversations`,
  SEARCH: `${BASE_URL}/conversations/search`
};

export const PLANTS = {
  SELF: `${BASE_URL}/plants?page=0&size=20`,
  PROFILE: `${BASE_URL}/profile/plants`,
  SEARCH: `${BASE_URL}/plants/search`
};

export const USERS = {
  SELF: `${BASE_URL}/users?page=0&size=20`,
  PROFILE: `${BASE_URL}/profile/users`,
  SEARCH: `${BASE_URL}/users/search`
};

export const UPKEEPS = {
  SELF: `${BASE_URL}/upkeeps?page=0&size=20`,
  PROFILE: `${BASE_URL}/profile/upkeeps`,
  SEARCH: `${BASE_URL}/upkeeps/search`
};

export const COMMENTS = {
  SELF: `${BASE_URL}/comments?page=0&size=20`,
  PROFILE: `${BASE_URL}/profile/comments`,
  SEARCH: `${BASE_URL}/comments/search`
};

export const PROFILE = `${BASE_URL}/profile`;