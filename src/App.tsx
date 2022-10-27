import React from "react";
import Auth from "./Routes/Auth";
import Login from "./Routes/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
