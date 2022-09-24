import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from 'axios';

function App() {
  // const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesUrls, setimagesUrls] = useState([]);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post(
        "http://localhost:3000/upload",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getDetails = async (e) => {
    const res = await axios('/getdata');
    console.log(res.json());
  }


  function onImageChange(e) { 
    setImages([...e.target.files]);
  }

  React.useEffect(() => {

    if(images.length < 1)  return;
    const newImageUrls = [];
    images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
    setimagesUrls(newImageUrls);

  }, [images]);

  return (
    <div className="App">
      <header className="App-header">
        <h3>Upload your images</h3>
       
        
        <input type="file" multiple accept="image/*" onChange={onImageChange} onBlur={saveFile}  />
        


          <ul className="list-group list-group-flush">
            {imagesUrls &&
              imagesUrls.map((imageSrc, index) => (
                <li className="list-group-item" key={index}>
                  <img src={imageSrc} width="450" />
                   {/* { imagesUrls.map(imageSrc => <img src={imageSrc} />) }  */}
                  
                </li>
              ))}
          </ul>

          <button onClick={uploadFile}>Upload</button>
          
          <div className="card-header">Uploaded Images</div>
          <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  {getDetails}
                </li>
          </ul>
         
        </header> 
        
       
      
      
    </div>
  );
}

export default App;
