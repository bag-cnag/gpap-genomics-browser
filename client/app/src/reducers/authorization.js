




//REDUCER

const initialState = {
    authorization: []
};


export const authorization = (state =initialState, action) => {

    console.log(action);
    switch (action.type) {
        case 'authorization':
            return action.authorization;
        default:
            return state
    }
};

const initialSearchParameters = {
    searchParameters: []
};


export const searchParameters = (state = initialSearchParameters, action) =>{

    switch (action.type) {
        case 'searchParameters':
            return action.searchParameters;
        default:
            return state
    }


}