import React from "react";
import "./App.css";
import "./components/Login/Login";
import useToken from "./Token/useToken";

function App() {
  const { token, setToken } = useToken();

  // display token if token is falsy
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return <div className="App"></div>;
}

export default App;
