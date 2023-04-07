import * as ActionTypes from "./ActionTypes";

export const Alums=(state={
    isLoading:true,
    errMess:null,
    alums:[]
},action)=>{
    switch (action.type){
        case ActionTypes.ADD_ALUMS:
            return {...state,isLoading:false,errMess:null,alums:action.payload};

        case ActionTypes.ALUMS_LOADING:
            return {...state,isLoading:true,errMess:null,alums:[]};

        case ActionTypes.ALUMS_FAILED:
            return {...state,isLoading:false,errMess:action.payload,alums:[]};

        default:
            return state;
    }
}