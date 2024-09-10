import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import Chat from "./components/Chat";
import Login from "./components/Login";

const App = () => {
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

  return <div>{user ? <Chat /> : <Login />}</div>;
};

export default App;
