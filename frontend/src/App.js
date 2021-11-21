import "./App.css";
import "antd/dist/antd.css";

import { Provider } from "react-redux";

import Layout from "./layout/Layout";
import store from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Layout />
      </Provider>
    </>
  );
}

export default App;
