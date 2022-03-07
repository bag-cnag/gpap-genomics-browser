



export const ADD_AUTHORIZATION = 'authorization';
export const ADD_SEARCH_PARAMETERS = 'searchParameters';


export const addAuthorization = (authorization) => ({
    type: ADD_AUTHORIZATION,
    authorization: authorization
});

export const addSearchParameters = (searchParameters) => ({
    type: ADD_SEARCH_PARAMETERS,
    searchParameters: searchParameters
});