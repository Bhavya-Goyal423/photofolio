import "./App.css";
import AlbumForm from "./components/AlbumForm/AlbumForm";
import { useState, useEffect } from "react";
import { db } from "./firebaseInit";
import { doc, setDoc } from "firebase/firestore";

function App() {
  return (
    <div className="wrapper">
      <AlbumForm db={db} doc={doc} setDoc={setDoc} />
    </div>
  );
}

export default App;
