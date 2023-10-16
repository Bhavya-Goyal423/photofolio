import "./App.css";
import AlbumForm from "./components/AlbumForm/AlbumForm";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { db } from "./config/firebaseInit";
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";

function App() {
  const [allAlbums, setAllAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const myPromise = new Promise((resolve, reject) => {
      try {
        setLoading(true);
        const albumNames = [];

        onSnapshot(collection(db, "albums"), (snapshot) => {
          snapshot.forEach((al) => {
            albumNames.push(al.id);
          });
          resolve(albumNames);
        });
      } catch (error) {
        reject(error);
      }
    });
    myPromise
      .then((result) => {
        setLoading(false);
        setAllAlbums(result);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="wrapper">
      <AlbumForm db={db} doc={doc} setDoc={setDoc} />
      {loading && (
        <Box sx={{ display: "flex", alignSelf: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {allAlbums.map((al, idx) => (
        <p key={idx}>{al}</p>
      ))}
    </div>
  );
}

export default App;
