import "./App.css";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen";
import Signin from "./screens/Signin";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";

function App() {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isSignedIn) {
      navigate("/home");
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<RegisterScreen />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/home" element={<HomeScreen />} />
    </Routes>
  );
}

export default App;
