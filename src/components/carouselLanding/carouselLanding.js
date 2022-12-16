import React, { useEffect, useState ,useContext} from "react";
import "./carouselLanding.css";
import Carousel from "react-elastic-carousel";
import { Context } from "../../contexts/AppContext";
const CarouselLanding = ({ signIn }) => {
 const context = useContext(Context);
 const books=context.books;

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];


  return (
    <div className="carousel-container">
      <hr className="seperator" />
      <div className="carousel-wrapper">
        <Carousel
          autoPlaySpeed={2000}
          breakPoints={breakPoints}
        >
          {books?.slice(0, 10).map((item) => (
            <div
              className="item"
              key={item.id}
              onClick={() => {
                signIn();
              }}
            >
              <img
                className="images-books"
                src={item.volumeInfo.imageLinks.thumbnail}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
export default CarouselLanding;
