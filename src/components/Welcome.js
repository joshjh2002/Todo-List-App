import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";

export default function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignin = () => {
    signInWithEmailAndPassword(auth, email, password).catch((err) =>
      alert(err.message)
    );
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div>
        <input type="email" onChange={handleEmailChange} value={email} />
        <input
          type="password"
          onChange={handlePasswordChange}
          value={password}
        />
        <button onClick={handleSignin}>Sign In</button>
      </div>
    </div>
  );
}
