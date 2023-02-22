import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue } from "firebase/database";

export default function Welcome() {
  const [todo, setTodo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) navigate("/");
    });
  });

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
    });
    setTodo("");
  };

  return (
    <div>
      <h1>Homepage</h1>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={writeToDatabase}>Add Item</button>
      <button onClick={handleSignout}>Sign Out</button>
    </div>
  );
}
