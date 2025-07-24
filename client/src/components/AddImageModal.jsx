import axios from "axios";
import { useState } from "react";

const AddImageModal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);

  const searchImages = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/unsplash-search", {
        params: { query: searchTerm },
      });
      setImages(res.data.results);
    } catch (err) {
      console.error("Image Search Error:", err);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search Unsplash..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded px-2 py-1"
      />
      <button onClick={searchImages} className="bg-blue-500 text-white px-3 py-1 rounded ml-2">
        Search
      </button>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.urls.small}
            alt={img.alt_description}
            className="w-full h-40 object-cover cursor-pointer rounded"
            onClick={() => {
              // do something when user clicks on image (upload to canvas or store URL)
              console.log("Selected Image:", img.urls.regular);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AddImageModal;
