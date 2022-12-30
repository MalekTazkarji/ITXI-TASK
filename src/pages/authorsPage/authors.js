import React, { useContext ,useState,useEffect} from "react";
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
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import "./authors.css";
import NotificationBar from "../../components/notificationBar";

const Authors = () => {
  const navigate = useNavigate();
  const context = useContext(Context);
  const search = context.search;
  const books = context.books;
  const [pageSize, setPageSize] = useState(40);
  const [page, setPage] = useState(1);

  useEffect(() => {
    
  }, [pageSize]);
 //HandleChange Pagination with error handling
  const handleChange = (event, value) => {
       setPage(value);
       if(page === value){
        context.setNotify({
          isOpen:true,
          message:"you are on the same page,try clicking the next number",
          type:"error"
        })
       }else{
      if (context.wholeObjBook.items) {
      if (context.wholeObjBook.totalItems > context.moreBooks - 40) {
        context.setMoreBooks(context.moreBooks + 20);
        window.scrollTo({ top: 600, left: 0, behavior: "smooth" });
      }
    } else {
      context.setNotify({
        isOpen: true,
        message: "no books more available",
        type: "error",
      });
    
  }
       }
  };

  return (
    <>
      <div className="authorpage-container">
        <NotificationBar
          notify={context.notify}
          setNotify={context.setNotify}
        />

        <CarouselAuthor />
        <div className="search-box">
          <input
            defaultValue={search}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                context.setSearch(e.target.value);
              }
            }}
            className="search-input"
            type="text"
            placeholder="Search for an Author"
          />
          <a className="search-btn">
            <IconContext.Provider value={{ size: "50px" }}>
              <AiOutlineSearch />
            </IconContext.Provider>
          </a>
        </div>

        <ImageList cols={5} gap={5} className="ImageList">
          {books?.map((book, index) => {
            return context.wholeObjBook.totalItems &&
              book.volumeInfo.authors &&
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
                  className="ImageListItem"
                  sx={{ color: "white" }}
                  subtitle={
                    <span className="card-text">
                      {book.volumeInfo.authors?.map((author, index) => (
                        <h3 key={index}>Author: {author}</h3>
                      ))}
                      <h4 className="card-text">
                        Publisher :
                        {book.volumeInfo?.industryIdentifiers[0]?.identifier
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
      <div className="pagination">
        <Typography>Page: {page}</Typography>
        <Pagination
          count={Math.ceil(context.wholeObjBook.totalItems / pageSize)}
          page={page}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Authors;
