// state - count:0
// action -> (Object -> type, payload) -> increment, decrement, reset
// reducer
// store -> getState(), subscribe(), dispatch()

const { createStore } = require('redux');

// CONSTANTS
const INCREMENT = 'INCREMENT';
const INCREMENT_COUNT_BY_VALUE = 'INCREMENT_COUNT_BY_VALUE';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

// STATE
const initialState = {
  count: 0,
};

// ACTION
const incrementCounterAction = () => {
  return {
    type: INCREMENT,
  };
};

const decrementCounterAction = () => {
  return {
    type: DECREMENT,
  };
};

const resetCounterAction = () => {
  return {
    type: RESET,
  };
};

const incrementCountByValue = (value) => {
  return {
    type: INCREMENT_COUNT_BY_VALUE,
    payload: value,
  };
};

// REDUCER
const counterReducer = (state = initialState, action) => {
  //
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    //
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    //
    case RESET:
      return {
        ...state,
        count: 0,
      };
    //
    case INCREMENT_COUNT_BY_VALUE:
      return {
        ...state,
        count: state.count + action.payload,
      };
    default:
      state;
  }
};

// STORE
const store = createStore(counterReducer);

store.subscribe(() => {
  console.log(store.getState());
});

// DISPATCH ACTION
store.dispatch(incrementCounterAction());
store.dispatch(incrementCounterAction());
store.dispatch(resetCounterAction());
store.dispatch(incrementCounterAction());
store.dispatch(incrementCounterAction());
store.dispatch(decrementCounterAction());
store.dispatch(decrementCounterAction());
store.dispatch(incrementCounterAction());
store.dispatch(incrementCountByValue(10));
