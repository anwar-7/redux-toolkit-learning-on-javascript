/* example of payload */
const { createStore } = require('redux');

// constance
const ADD_USER = 'ADD_USER';

// state
const usersStats = {
  users: ['Anwar'],
  count: 1,
};

// action
const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

// reducer
const addUserReducer = (state = usersStats, action) => {
  //
  switch (action.type) {
    case ADD_USER:
      return {
        users: [...state.users, action.payload],
        count: state.count + 1,
      };

    default:
      state;
  }
};

// store
const store = createStore(addUserReducer);

store.subscribe(() => {
  console.log(store.getState());
});

// dispatcher
store.dispatch(addUser('Korim'));
store.dispatch(addUser('Dipu'));
store.dispatch(addUser('Maraj'));
