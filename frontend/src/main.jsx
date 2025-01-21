import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ToastContainer } from "react-toastify";

const ThemedToastContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1000}
      limit={3}
      closeButton={false}
      newestOnTop={true}
      closeOnClick
      toastClassName="toastBody"
      className="toastCloseButton"
    />
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemedToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
