import * as ActionTypes from "./ActionTypes";
import { ALUMS } from '../shared/alums';
import {baseUrl} from '../shared/baseUrl';

export const addPost=(post)=>({
    
        type: ActionTypes.ADD_POST,
        payload:post
    
});

export const postPost=(author,title,description)=>(dispatch)=>{
    var newPost={
        author: author,
        title: title,
        description: description
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl+'posts',{
        method:'POST',
        body: JSON.stringify(newPost),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials:'same-origin'
    })
    .then((response)=>{
        if(response.ok){
            return response;
        }
        else{
            var err=new Error('Error '+ response.status+ ' '+response.statusText);
            err.response=response;
            throw err;
        }
    },
    error=>{
        var err=new Error(error.message);
        throw err;
    })
    .then((response)=>response.json())
    .then(post=>dispatch(addPost(post)))
    .catch(error =>  { console.log('post Posts', error.message); alert('Your post could not be posted\nError: '+error.message); });
}

export const fetchAlums=()=>(dispatch)=>{
    dispatch(alumsLoading(true));

    return fetch(baseUrl+'alums')
            .then((response)=>{
                if(response.ok){
                    return response;
                }
                else{
                    var err=new Error('Error '+ response.status+ ' '+response.statusText);
                    err.response=response;
                    throw err;
                }
            },
            error=>{
                var err=new Error(error.message);
                throw err;
            })
            .then((response)=>response.json())
            .then(alums=>dispatch(addAlums(alums)))
            .catch(error=>{dispatch(alumsFailed(error.message))});
}

export const alumsLoading=()=>({
    type:ActionTypes.ALUMS_LOADING
});

export const alumsFailed=(errmess)=>({
    type: ActionTypes.ALUMS_FAILED,
    payload: errmess
});

export const addAlums=(alums)=>({
    type:ActionTypes.ADD_ALUMS,
    payload:alums
});

export const fetchPosts=()=>(dispatch)=>{
    dispatch(postsLoading(true));
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl+'posts',{
        headers:{
            'Authorization':bearer
        }
    })
    .then((response)=>{
        if(response.ok){
            return response;
        }
        else{
            var err=new Error('Error '+ response.status+ ' '+response.statusText);
            err.response=response;
            throw err;
        }
    },
    error=>{
        var err=new Error(error.message);
        throw err;
    })
    .then((response)=>response.json())
    .then(posts=>dispatch(addPosts(posts)))
    .catch(error=>{dispatch(postsFailed(error.message))});
}
export const postsLoading=()=>({
    type:ActionTypes.POSTS_LOADING
});
export const postsFailed=(errmess)=>({
    type: ActionTypes.POSTS_FAILED,
    payload: errmess
});

export const addPosts=(posts)=>({
    type:ActionTypes.ADD_POSTS,
    payload:posts
});

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds,history) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(fetchPosts());
            dispatch(receiveLogin(response));
            if(response.alumni)
            history.push('/alumni');
            else{
                history.push('/afterlogin');
            }
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(postsFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout());
}

export const postUser=(username,enrollment,password,alumni,specialization,description ,history)=>(dispatch)=>{
    dispatch(userLoading());
    var newUser={
        username:username,
        enrollment:enrollment,
        password:password,
        alumni:alumni,
        specialization:specialization,
        description:description
    }
    
    return fetch(baseUrl+'users/signup',{
        method:'POST',
        body: JSON.stringify(newUser),
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:'same-origin'
    })
    .then((response)=>{
        if(response.ok){
            return response;
        }
        else{
            var err=new Error('Error '+ response.status+ ' '+response.statusText);
            err.response=response;
            throw err;
        }
    },
    error=>{
        var err=new Error(error.message);
        throw err;
    })
    .then((response)=>response.json())
    .then((response)=>{
        if(response.success){
            console.log(response.user);
            dispatch(userRegistered(response.user));
            dispatch(fetchAlums());
            window.location.reload(false);
        }
    })
    .catch(error =>  { console.log('post User', error.message); alert('You could not be registered\nError: '+error.message); 
    dispatch(userFailed(error.message));
    });
}

export const userLoading=()=>{
    return {
        type:ActionTypes.SIGNUP_REQUEST
    }
}

export const userRegistered=(user)=>{
    return {
        type:ActionTypes.SIGNUP_SUCCESS,
        payload:user
    }
}

export const userFailed=(message)=>{
    return {
        type:ActionTypes.SIGNUP_FAILURE,
        payload:message
    }
}

