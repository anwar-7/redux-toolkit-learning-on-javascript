const { createStore, applyMiddleware } = require('redux');
const { default: logger } = require('redux-logger');

// product constant
const GET_PRODUCT = 'GET_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';

// product state
const initialProductState = {
  product: ['cake', 'coffee'],
  numberOfProduct: 2,
};

// product action
const getProduct = () => {
  return {
    type: GET_PRODUCT,
  };
};

const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

// productReducer
const productReducer = (state = initialProductState, action) => {
  //
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
      };

    case ADD_PRODUCT:
      return {
        product: [...state.product, action.payload],
        numberOfProduct: state.numberOfProduct + 1,
      };

    default:
      return state;
  }
};

// store
const store = createStore(productReducer, applyMiddleware(logger));

store.subscribe(() => {
  console.log(store.getState());
});

// dispatch
store.dispatch(getProduct());
store.dispatch(addProduct('Tea'));
