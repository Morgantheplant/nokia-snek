import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import getStore from "./src/store";
import { keyDownHandler, nextTick, changeBoardSize } from "./src/actions";
import { snakeReducer } from "./src/selectors";

import Phone from './src/components/Phone';

const store = getStore();

(function looper() {
  const { shouldAnimate } = snakeReducer(store.getState());
  if (shouldAnimate) {
    store.dispatch(nextTick());
  }
  setTimeout(function() {
    looper();
  }, 100);
})();

window.addEventListener("keydown", e => {
  store.dispatch(keyDownHandler(e));
});

window.addEventListener("resize", e => {
  store.dispatch(changeBoardSize(e));
});

ReactDOM.render(
  <Provider store={store}>
    <Phone />
  </Provider>,
  document.querySelector("#content")
);
