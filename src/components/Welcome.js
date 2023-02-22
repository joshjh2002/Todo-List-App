import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState("");
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    password: "",
    confirmEmail: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      }
    });
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  const handleRegister = () => {
    if (
      registerInformation.email !== registerInformation.confirmEmail ||
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert("Please confirm credentials are the same!");
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div>
        {isRegistering ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={registerInformation.email}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={registerInformation.password}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value,
                })
              }
            />
            <input
              type="email"
              placeholder="Confirm Email"
              value={registerInformation.confirmEmail}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmEmail: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerInformation.confirmPassword}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button onClick={handleRegister}>Sign Up</button>
            <button
              onClick={() => {
                setIsRegistering(false);
              }}
            >
              Back to Log In
            </button>
          </>
        ) : (
          <>
            <input type="email" onChange={handleEmailChange} value={email} />
            <input
              type="password"
              onChange={handlePasswordChange}
              value={password}
            />
            <button onClick={handleSignin}>Sign In</button>
            <button
              onClick={() => {
                setIsRegistering(true);
              }}
            >
              Create Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}
