export const generateSearchURL = (baseURL, searchMethod, params) => {
  const queryString = Object.keys(params)
      .map(key => `${searchMethod[key]}=${encodeURIComponent(params[key])}`)
      .join('&');
  return `${baseURL}/search?${queryString}`;
};

const searchMethods = {
  ANNOUNCES: {
    findByStartDate: 'startDate',
    findByTitle: 'title',
    findByAnnouncerId: 'announcerId',
    findByPlantId: 'plantId',
    findByEndDate: 'endDate',
  },
  SPECIES: {
    findByName: 'name',
  },
  UPKEEPS: {
    findByCaretakerId: 'caretakerId',
    findByStatus: 'status',
    findByPlantId: 'plantId',
  },
  COMMENTS: {
    findByUserId: 'userId',
    findByEntityTypeAndEntityId: 'entityType,entityId',
  },
  USERS: {
    findByCountry: 'country',
    findByRoleId: 'roleId',
    findByLastName: 'lastName',
    findByUsername: 'username',
    findByFirstName: 'firstName',
    findByZipCode: 'zipCode',
    findByStreetName: 'streetName',
    findByCity: 'city',
  },
  LOGINS: {
    findByEmail: 'email',
  },
  CONVERSATIONS: {
    findByUser1Id: 'user1Id',
    findByUser1IdAndUser2Id: 'user1Id,user2Id',
    findByUser2Id: 'user2Id',
  },
  PLANTS: {
    findByOwnerId: 'ownerId',
    findByCurrentState: 'currentState',
    findBySpeciesId: 'speciesId',
  },
  MEDIAS: {
    findByUserId: 'userId',
    findByEntityTypeAndEntityId: 'entityType,entityId',
  },
};

export const ANNOUNCES = {
  URL: "http://localhost:8080/api/announces",
  METHOD: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
  ID: (id) => `http://localhost:8080/api/announces/${id}`,
  SEARCH: {
    findByStartDate: (startDate) => generateSearchURL("http://localhost:8080/api/announces", searchMethods.ANNOUNCES, {startDate}),
    findByTitle: (title) => generateSearchURL("http://localhost:8080/api/announces", searchMethods.ANNOUNCES, {title}),
    findByAnnouncerId: (announcerId) => generateSearchURL("http://localhost:8080/api/announces", searchMethods.ANNOUNCES, {announcerId}),
    findByPlantId: (plantId) => generateSearchURL("http://localhost:8080/api/announces", searchMethods.ANNOUNCES, {plantId}),
    findByEndDate: (endDate) => generateSearchURL("http://localhost:8080/api/announces", searchMethods.ANNOUNCES, {endDate}),
  },
};

export const SPECIES = {
  URL: "http://localhost:8080/api/species",
  METHOD: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
  ID: (id) => `http://localhost:8080/api/species/${id}`,
  SEARCH: {
    findByName: (name) => generateSearchURL("http://localhost:8080/api/species", searchMethods.SPECIES, {name}),
  },
};



export const UPKEEPS = {
  URL: "http://localhost:8080/api/upkeeps",
  METHOD: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
  ID: (id) => `http://localhost:8080/api/upkeeps/${id}`,
  SEARCH: {
    findByCaretakerId: (caretakerId) => generateSearchURL("http://localhost:8080/api/upkeeps", searchMethods.UPKEEPS, {caretakerId}),
    findByStatus: (status) => generateSearchURL("http://localhost:8080/api/upkeeps", searchMethods.UPKEEPS, {status}),
    findByPlantId: (plantId) => generateSearchURL("http://localhost:8080/api/upkeeps", searchMethods.UPKEEPS, {plantId}),
  },
};

export const COMMENTS = {
  URL: "http://localhost:8080/api/comments",
  METHOD: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
  ID: (id) => `http://localhost:8080/api/comments/${id}`,
  SEARCH: {
    findByUserId: (userId) => generateSearchURL("http://localhost:8080/api/comments", searchMethods.COMMENTS, {userId}),
    findByEntityTypeAndEntityId: (entityType, entityId) => generateSearchURL("http://localhost:8080/api/comments", searchMethods.COMMENTS, {entityType, entityId}),
  },
};

export const USERS = {
  URL: "http://localhost:8080/api/users",
  METHOD: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
  ID: (id) => `http://localhost:8080/api/users/${id}`,
  SEARCH: {
    findByCountry: (country) => generateSearchURL("http://localhost:8080/api/users", searchMethods.USERS, {country}),
    findByRoleId: (roleId) => generateSearchURL("http://localhost:8080/api/users", searchMethods.USERS, {roleId}),
    findByLastName: (lastName) => generateSearchURL("http://localhost:8080/api/users", searchMethods.USERS, {lastName}),
    findByUsername: (username) => generateSearchURL("http://localhost:8080/api/users", searchMethods.USERS, {username}),
    findByFirstName: (firstName) => generateSearchURL("http://localhost:8080/api/users", searchMethods.USERS, {firstName}),
    findByZipCode: (zipCode) => generateSearchURL("http://localhost:8080/api/users", searchMethods.USERS, {zipCode}),
    findByStreetName: (streetName) => generateSearchURL("http://localhost:8080/api/users", searchMethods.USERS, {streetName}),
    findByCity: (city) => generateSearchURL("http://localhost:8080/api/users", searchMethods.USERS, {city}),
  },
};
