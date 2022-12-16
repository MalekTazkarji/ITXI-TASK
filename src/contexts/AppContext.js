import { useEffect, useState } from "react";
import { createContext } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
    const [books, setbooks] = useState([]);
    // fetching get request from the web api (google books api)
    const Request = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=AIzaSyCuuaqLB7lfZmhgt5h2QJU8jbwj9zHQ5ms&maxResults=40"
        );
        const res = await response.json();
        //Sort Books to the latest books first
        const sortedResult = res.items.slice().sort(function (a, b) {
          if (a.volumeInfo.publishedDate < b.volumeInfo.publishedDate) return 1;
          if (a.volumeInfo.publishedDate > b.volumeInfo.publishedDate) return -1;
          return 0;
        });
        setbooks(sortedResult);
        console.log(sortedResult);
      } catch (err) {
        console.log(err);
      }
    };
useEffect(()=>{
Request();
},[])
    
  return (
    <Context.Provider
      value={{
        books
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
