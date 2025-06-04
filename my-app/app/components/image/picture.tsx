"use client";

import React, { useEffect, useState } from "react";
import { Dispatcher } from "flux";

const dispatcher = new Dispatcher();
const ADD_IMAGE = "ADD_IMAGE";
const REMOVE_IMAGE = "REMOVE_IMAGE";

const addImageAction = (url: string) => ({ type: ADD_IMAGE, url });
const removeImageAction = (index: number) => ({ type: REMOVE_IMAGE, index });

let images: string[] = [];
const listeners: React.Dispatch<React.SetStateAction<string[]>>[] = [];

const registerListener = (listener: React.Dispatch<React.SetStateAction<string[]>>) => {
  listeners.push(listener);
};
const notifyListeners = () => listeners.forEach((listener) => listener([...images]));

dispatcher.register((action: any) => {
  switch (action.type) {
    case ADD_IMAGE:
      images.push(action.url);
      break;
    case REMOVE_IMAGE:
      images = images.filter((_, i) => i !== action.index);
      break;
    default:
      return;
  }
  notifyListeners();
});

const FluxImage = () => {
  const [imageList, setImageList] = useState<string[]>(images);
  const [input, setInput] = useState("");

  useEffect(() => {
    registerListener(setImageList);
  }, []);

  const addFn = () => {
    const url = input.trim() || "https://via.placeholder.com/150";
    dispatcher.dispatch(addImageAction(url));
    setInput("");
  };
  const removeFn = (index: number) => {
    dispatcher.dispatch(removeImageAction(index));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "green" }}>Image Flux Example</h1>
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />
      <button onClick={addFn} style={{ padding: "10px", cursor: "pointer" }}>
        Add Image
      </button>
      <ul style={{ listStyleType: "none", padding: 0, marginTop: "20px" }}>
        {imageList.map((url, index) => (
          <li
            key={index}
            style={{
              padding: "10px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "300px",
              margin: "0 auto",
            }}
          >
            <img src={url} alt={`img-${index}`} style={{ maxWidth: "100%", marginBottom: "10px" }} />
            <button
              onClick={() => removeFn(index)}
              style={{ cursor: "pointer", padding: "5px 10px" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FluxImage;