import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import getStore from "./src/store";
import App from "./src";
import { changeDirectionHandler, moveSnake } from "./src/actions";

const store = getStore();

(function looper() {
  const { shouldAnimate } = store.getState();
  if (shouldAnimate) {
    store.dispatch(moveSnake());
  }
  setTimeout(function() {
    looper();
  }, 100);
})();

window.addEventListener("keydown", e => {
  store.dispatch(changeDirectionHandler(e));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#content")
);
