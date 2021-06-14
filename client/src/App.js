import React, { useState, useEffect } from "react";
import "./App.css";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Login from "./components/Authentication/Login";
// import Register from "./components/Authentication/Register";
// import useToken from "./Token/useToken";
import { Navigation } from "./components/Navigation/Navigation";
import { Header } from "./components/Header/Header";
import { Features } from "./components/Features/Features";
import { About } from "./components/About/About";
import { Services } from "./components/Services/Services";
import { Contact } from "./components/Contact/Contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

function App() {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
}

export default App;
