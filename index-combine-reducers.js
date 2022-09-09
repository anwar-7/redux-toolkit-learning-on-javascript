const { createStore, combineReducers } = require('redux');

// product constant
const GET_PRODUCT = 'GET_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';

// cart constant
const GET_CART_ITEM = 'GET_CART_ITEM';
const ADD_CART_ITEM = 'ADD_CART_ITEM';

// product state
const initialProductState = {
  product: ['cake', 'coffee'],
  numberOfProduct: 2,
};

// product state
const initialCartState = {
  cart: ['coffee'],
  numberOfProduct: 1,
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

// product action
const getCart = () => {
  return {
    type: GET_CART_ITEM,
  };
};

const addCart = (product) => {
  return {
    type: ADD_CART_ITEM,
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

// cartReducer
const cartReducer = (state = initialCartState, action) => {
  //
  switch (action.type) {
    case GET_CART_ITEM:
      return {
        ...state,
      };

    case ADD_CART_ITEM:
      return {
        cart: [...state.cart, action.payload],
        numberOfProduct: state.numberOfProduct + 1,
      };

    default:
      return state;
  }
};

// combine reducer
const rootReducer = combineReducers({
  productR: productReducer,
  cartR: cartReducer,
});

// store
const store = createStore(rootReducer);

store.subscribe(() => {
  console.log(store.getState());
});

// dispatch
store.dispatch(getProduct());
store.dispatch(addProduct('Tea'));

store.dispatch(getCart());
store.dispatch(addCart('Tea'));
