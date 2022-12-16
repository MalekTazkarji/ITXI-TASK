import React from "react";
import Carousel from "react-elastic-carousel";
import "./carouselAuthor.css";
const CarouselAuthor = () => {
    return (
        <div className="carouselAuthor" style={{width:"100%",height:"100%"}}>
<Carousel 
enableAutoPlay={true}>
    <img className="images-carousel"  src={require("../../assests/author1.jpeg")}/>
    <img className="images-carousel" src={require("../../assests/author2.jpeg")}/>
    <img className="images-carousel" src={require("../../assests/author3.jpeg")}/>
</Carousel>
<p className="carousel-text">Welcome to E-BOOKS.You can easily search for any author you love to see their latest books</p>

        </div>
    )
}
export default CarouselAuthor;