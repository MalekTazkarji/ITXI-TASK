import React from "react";
import Carousel from "react-elastic-carousel";
import "./carouselAuthor.css";
const CarouselAuthor = () => {
  return (
    <div className="carouselAuthor" style={{ width: "100%", height: "100%" }}>
      <Carousel
        disableArrowsOnEnd={true}
        autoPlaySpeed={4000}
        enableAutoPlay={true}
      >
        <img
          alt="carousel"
          className="images-carousel"
          src={require("../../assests/author1.jpeg")}
        />
        <img
          alt="carousel"
          className="images-carousel"
          src={require("../../assests/author2.jpeg")}
        />
        <img
          alt="carousel"
          className="images-carousel"
          src={require("../../assests/author3.jpeg")}
        />
      </Carousel>
      <p className="carousel-text">
        Welcome to E-BOOKS.You can easily search for any author you love to see
        their latest books
      </p>
    </div>
  );
};
export default CarouselAuthor;
