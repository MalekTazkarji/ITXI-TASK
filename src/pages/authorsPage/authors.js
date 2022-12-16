import React, { useContext, useState } from "react";
import { Context } from "../../contexts/AppContext";
import { FcLeave } from "react-icons/fc";
import CarouselAuthor from "../../components/carouselAuthors/carouselAuthor";
import "./authors.css";
import { IconContext } from "react-icons/lib";
import { AiOutlineSearch } from "react-icons/ai";
import { Alert, Button, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";

const Authors = () => {
  const context = useContext(Context);
  const [search, setsearch] = useState("");
  const [temp, setTemp] = useState([]);
  const books = context.books;
  return (
    <div
      style={{ marginTop: "100px", display: "flex", flexDirection: "column" }}
    >
      <CarouselAuthor />
      <div className="search-box">
        <input
          onChange={(e) => setsearch(e.target.value)}
          className="search-input"
          type="text"
          name=""
          placeholder="Search for an Author"
        />
        <a href="#" className="search-btn">
          <IconContext.Provider value={{ size: "50px" }}>
            <AiOutlineSearch />
          </IconContext.Provider>
        </a>
      </div>
      <ImageList className="parent-stickers" cols={5} gap={{ xl: 10, md: 5 }} sx={{
        gridTemplateColumns: 'repeat(auto-fill , minmax(240px,1fr)) !important',
        borderRadius: "10px",
        margin: "10vh 7vw 5vh 7vw",
        backgroundColor: "rgb(251, 199, 88)",
      }}>
        {books
          .filter((value) => {
            if (search === "") {
              return value;
            } else if (
              value.volumeInfo.authors &&
              value.volumeInfo.authors.join(' ').toLowerCase().includes(search.toLowerCase())) {
              return value;
            }
              return ''
            
           
          })
          .map((book, index) => {
            return (

              book.volumeInfo.authors &&
              <ImageListItem               
              className="card-image"
              key={index}
              style={{ margin: '15px 15px 15px 15px', 
             }}>
                <img
                  style={{height:'300px',backgroundColor: "rgb(251, 199, 88)"}}

                  src={`${book.volumeInfo.imageLinks.smallThumbnail}?w=248&fit=crop&auto=format`}
                  // srcSet={`${book.volumeInfo.imageLinks.smallThumbnail}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={book.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  sx={{ color: "white" }}
                  title={book.title}
                  subtitle={<span >{book.volumeInfo.authors?.map((author,index) => (<h3 key={index}>{author}</h3>))}</span>}
                  position="below"
                />
              </ImageListItem>

            )
          })}
      </ImageList>

    </div>
  );
};

export default Authors;
