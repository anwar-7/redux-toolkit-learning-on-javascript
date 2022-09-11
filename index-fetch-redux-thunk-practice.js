const { default: axios } = require('axios');
const { createStore, applyMiddleware } = require('redux');
const { default: thunk } = require('redux-thunk');

// constants
const GET_TODOS_REQUEST = 'GET_TODOS_REQUEST';
const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
const GET_TODOS_FAILED = 'GET_TODOS_FAILED';
const API_URL = 'https://jsonplaceholder.typicode.com/todo';

// state
const initialTodosState = {
  todos: [],
  isLoading: false,
  error: null,
};

// action
const getTodosRequest = () => {
  return {
    type: GET_TODOS_REQUEST,
  };
};

const getTodosSuccess = (todos) => {
  return {
    type: GET_TODOS_SUCCESS,
    payload: todos,
  };
};

const getTodosFailed = (error) => {
  return {
    type: GET_TODOS_FAILED,
    payload: error,
  };
};

// reducer
const todosReducers = (state = initialTodosState, action) => {
  //
  switch (action.type) {
    case GET_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };

    case GET_TODOS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// fetchData function for dispatch api
const fetchData = () => {
  return (dispatch) => {
    dispatch(getTodosRequest());
    axios
      .get(API_URL)
      .then((res) => {
        // console.log(res.data);
        const todos = res.data;
        const title = todos.map((todo) => todo.title);
        dispatch(getTodosSuccess(title));
      })
      .catch((error) => {
        console.log(error.message);
        const errorMessage = error.message;
        dispatch(getTodosFailed(errorMessage));
      });
  };
};

// store
const store = createStore(todosReducers, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});

// dispatcher
store.dispatch(fetchData());
