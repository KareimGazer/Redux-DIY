// App code
// this function is called a reducer becaus it's taking
// the state and the action and reducing them into a new state
// it's must be a pure function

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";

const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.todo]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.todos, action),
  };
}

// Library code
function createStore(reducer) {
  // the store should have four parts
  // 1. The state
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state
  let state;
  let listeners = [];
  const getState = () => state;
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener()); // invoking all listeners which are waiting for a state change
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

// Example code
const store = createStore(app);

store.subscribe(() => {
  console.log("the new state is: ", store.getState());
});
const unsubscribed = store.subscribe(console.log("the store changed"));
unsubscribed();

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: "Learn Redux",
    complete: false,
  },
});
