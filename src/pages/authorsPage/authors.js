import React, { useContext, useEffect } from "react";
import { Context } from "../../contexts/AppContext";
import CarouselAuthor from "../../components/carouselAuthors/carouselAuthor";
import { IconContext } from "react-icons/lib";
import { AiOutlineSearch } from "react-icons/ai";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./authors.css";

const Authors = () => {
  const navigate = useNavigate();
  const context = useContext(Context);
  const search = context.search;
  const books = context.books;
  // const getToken = localStorage.getItem("Token")
  // useEffect(() => {}, [getToken]);

  return (
    <div className="authorpage-container">
      <CarouselAuthor />
      <div className="search-box">
        <input
          defaultValue={search}
          onChange={(e) => context.setSearch(e.target.value)}
          // onKeyDown={(e) => {
          //   if (e.key === 'Enter') {
          //     context.setSearch(e.target.value)
          //   }
          // }}
          className="search-input"
          type="text"
          placeholder="Search for an Author"
        />
        <a  className="search-btn">
          <IconContext.Provider value={{ size: "50px" }}>
            <AiOutlineSearch />
          </IconContext.Provider>
        </a>
      </div>
      <ImageList cols={5} gap={5} className="ImageList">
        {books
          ?.filter((value) => {
            if (search === "") {
              return value;
            } else if (
              value.volumeInfo.authors &&
              value.volumeInfo.authors
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase())
            ) {
              return value;
            }
            return "";
          })
          .map((book, index) => {
            return book.volumeInfo.authors &&
              book.saleInfo.saleability === "FREE" &&
              book.saleInfo.isEbook === true ? (
              <ImageListItem
                onClick={() =>
                  navigate(`/bookpreview/id=${book.id}`, {
                    state: { data: book },
                  })
                }
                className="ImageListItem"
                key={index}
              >
                <img
                  style={{ height: "300px" }}
                  className="book-image"
                  src={`${book.volumeInfo.imageLinks.smallThumbnail}?w=248&fit=crop&auto=format`}
                  alt={book.title}
                  loading="lazy"
                />

                <ImageListItemBar
                  sx={{ color: "white" }}
                  subtitle={
                    <span>
                      {book.volumeInfo.authors?.map((author, index) => (
                        <h3 key={index}>Author: {author}</h3>
                      ))}
                      <h4 className="card-text">
                        Publisher :
                        {book.volumeInfo.industryIdentifiers[0].identifier
                          .split(":")
                          .shift()}
                      </h4>
                      <h4 className="card-text">
                        PublishDate :{book.volumeInfo.publishedDate}
                      </h4>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Rating
                          name="custom-no-value"
                          value={3.5}
                          precision={0.1}
                          sx={{
                            fontSize: "1.5rem",
                          }}
                        />
                        <h4>3.5</h4>
                      </span>
                    </span>
                  }
                  position="below"
                />
              </ImageListItem>
            ) : (
              ""
            );
          })}
      </ImageList>
    </div>
  );
};

export default Authors;
