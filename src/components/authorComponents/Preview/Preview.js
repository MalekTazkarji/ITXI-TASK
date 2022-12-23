import React, { useState } from "react";
import { Rating } from "@mui/material";
import { useLocation } from "react-router-dom";
import Loading from "../../loading/loading";
import "./Preview.css";
const Preview = () => {
  const[IframeLoad,setIframeLoad]=useState(true);
  const Location = useLocation();
  const data = Location.state?.data;
  const id = data.id;

  return (
    <>
      <div className="card-preview">
        <div className="info-btn-container">
        <div className="child-card-preview">
          <div className="image-container">
            <img className="image-preview"alt="Book_Image" src={data.volumeInfo.imageLinks.smallThumbnail} />
          </div>

          <div className="info-container">
            <h3>Title:{data.volumeInfo.title}</h3>
            <h3>PageCount:{data.volumeInfo.pageCount}</h3>
            <h3>Language:{data.volumeInfo.language === "en" ? "English" : data.volumeInfo.language}</h3>
            <h3>Authors:{data.volumeInfo.authors.length > 0 ? data.volumeInfo.authors.map((author) => (author)) : 'unknown'}</h3>
            <h3>Publisher:{data.volumeInfo.industryIdentifiers[0].identifier.split(':').shift()}</h3>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Rating
                          name='custom-no-value'
                          value={3.5}
                          precision={0.1}
                          sx={{
                            fontSize: '1.5rem',
                          }}
                        />
                        <h4>3.5</h4></span>
          </div>
        </div>
        <div className="btn-container">
        <a href={`${data.accessInfo.pdf.downloadLink}`} download="true" >
          <button className="btn-preview">
            download pdf</button>
            </a>

        </div>
        </div>
        
         {IframeLoad && <Loading name="Embbedde Viewer"/>}
        <iframe
        title="Embedded-viewer"
        className="iframe"
        onLoad={e => {
          setIframeLoad(false);
        }}
        srcDoc={`
          <script type="text/javascript" src="//books.google.com/books/previewlib.js"></script>
          <script type="text/javascript">
            GBS_insertEmbeddedViewer('${id}',400,600)
          </script>
          `}
      />

      </div>

    </>

  )
}

export default Preview;