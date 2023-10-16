import "./AlbumList.css";
import { useState } from "react";

export default function AlbumsList({ allAlbums }) {
  const [options, setOptions] = useState(null);

  const handleOptions = (idx) => {
    setOptions(idx);
  };

  return (
    <div className="margin-top-90px grid grid--col-5">
      {allAlbums.map((data, idx) => (
        <Album
          data={data}
          options={options}
          key={data.id}
          index={idx}
          handleOptions={handleOptions}
        />
      ))}
    </div>
  );
}

function Album({ data, options, index, handleOptions }) {
  const [isOptionsClicked, setIsOptionsClicked] = useState(false);
  return (
    <div className="album">
      <div className="helper">
        <div className="stack stack-1"></div>
        <div className="stack stack-2"></div>
        <div
          className="album-img-box"
          onClick={() => console.log("CLicked")}
          onMouseOver={() => handleOptions(index)}
          onMouseOut={() => handleOptions(null)}
        >
          <img
            className="album-img"
            src={data.count < 1 ? "/default.jpg" : data.images.at(0)}
            alt={`${data.id}`}
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="options"
        >
          <path
            fill="currentColor"
            d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0-6a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0z"
          ></path>
        </svg>
      </div>

      <div className="album-label">
        <p className="album-name">{data.id}</p>
        <p className="photos-count">{data.count}</p>
      </div>
    </div>
  );
}
