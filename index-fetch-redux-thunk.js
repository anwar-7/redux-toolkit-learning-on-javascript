const { default: axios } = require('axios');
const { createStore, applyMiddleware } = require('redux');
const { default: thunk } = require('redux-thunk');

// constants
const GTE_TODOS_REQUEST = 'GTE_TODOS_REQUEST';
const GTE_TODOS_SUCCESS = 'GTE_TODOS_SUCCESS';
const GTE_TODOS_FAILED = 'GTE_TODOS_FAILED';
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// states
const initialTodosState = {
  todos: [],
  isLoading: false,
  error: null,
};

// actions
const getTodosRequest = () => {
  return {
    type: GTE_TODOS_REQUEST,
  };
};

const getTodosSuccess = (todos) => {
  return {
    type: GTE_TODOS_SUCCESS,
    payload: todos,
  };
};

const getTodosFailed = (error) => {
  return {
    type: GTE_TODOS_FAILED,
    payload: error,
  };
};

// reducers
const todosReducers = (state = initialTodosState, action) => {
  //
  switch (action.type) {
    case GTE_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GTE_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };

    case GTE_TODOS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// async action creator
const fetchData = () => {
  //
  return (dispatch) => {
    dispatch(getTodosRequest());
    axios
      .get(API_URL)
      .then((res) => {
        const todos = res.data;
        const title = todos.map((todo) => todo.title);
        dispatch(getTodosSuccess(title));
      })
      .catch((error) => {
        // console.log(error.message);
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

store.dispatch(fetchData());
