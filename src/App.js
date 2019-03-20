import React, { Component } from 'react';
import { applyMiddleware, createStore } from 'redux';
import './App.css';

const reducer = (initialState=0, action) => {
  if(action.type === 'INC'){
    return initialState + 1;
  } else if (action.type === 'DEC'){
    return initialState - 1;
  } else if (action.type === 'WTF'){
    throw new Error("Error Cuy!!");
  }

  return initialState;
}

/*All action will be logged by this function*/
const logger = (store) => (next) => (action) =>{
  console.log("action fired", action);
  //action.type = "DEC";
  next(action);
  //console.log("store changed", store.getState());
}

const error = (store) => (next) => (action) => {
  try{
    next(action);
  }catch(e) {
    console.log("Error!!!", e);
  }
}

/*All action will be intercepted by middleware before send to reducer*/
const middleware =  applyMiddleware(logger, error);

const store = createStore(reducer, 1, middleware);

store.subscribe(() => {
  console.log("store changed", store.getState());
});

store.dispatch({type: "INC"});
store.dispatch({type: "INC"});
store.dispatch({type: "INC"});
store.dispatch({type: "DEC"});
store.dispatch({type: "DEC"});
store.dispatch({type: "DEC"});
store.dispatch({type: "WTF"});


class App extends Component {
  render() {
    return (
      <div className="App">
        <p>Learning redux middleware</p>
      </div>
    );
  }
}

export default App;
