




import { combineReducers } from "redux";
import { authorization,searchParameters } from "./authorization";


const allReducer = combineReducers({
    'authorization': authorization,
    'searchParameters': searchParameters
});


export default allReducer;