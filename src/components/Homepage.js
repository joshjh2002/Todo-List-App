import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove } from "firebase/database";

export default function Welcome() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) navigate("/");
      else if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();

          if (data !== null) {
            Object.values(data).map((item) => {
              setTodos((oldArray) => [...oldArray, item]);
            });
          }
        });
      }
    });
  }, []);

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

  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  return (
    <div>
      <h1>Homepage</h1>
      <input
        type="text"
        placeholder="Add To-Do"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={writeToDatabase}>Add Item</button>
      <button onClick={handleSignout}>Sign Out</button>

      {todos.map((item) => (
        <div>
          <h1>{item.todo}</h1>
          <button onClick={() => handleDelete(item.uidd)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
