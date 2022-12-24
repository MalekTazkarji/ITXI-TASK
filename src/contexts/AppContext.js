import { useEffect, useState } from "react";
import { createContext } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [Token,setToken]=useState('');
  const [books, setbooks] = useState([]);
  const [search, setSearch] = useState("");
  const [moreBooks,setMoreBooks]=useState(0);
  // fetching get request from the web api (google books api)
  const Request = async () => {
    // I had a problem that in fetching link of filtering free-ebooks i am not retreiving these keys in my json : "publisher,rating";
    //But they are showing in the non free ebooks filter so i'll make them static when mapping on the array.
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:${search}&filter=free-ebooks&key=AIzaSyCuuaqLB7lfZmhgt5h2QJU8jbwj9zHQ5ms&startIndex=${moreBooks}&maxResults=40`,
         {'Content-Length': 50}
      );
      const res = await response.json();
           //Sort Books to the latest books first
      const sortedResult = res.items.sort(function (a, b) {
        if (a.volumeInfo.publishedDate < b.volumeInfo.publishedDate) return 1;
        if (a.volumeInfo.publishedDate > b.volumeInfo.publishedDate) return -1;
        return 0;
      });
      setbooks(sortedResult);
    } catch (err) {
      alert(`${search} is not found ; i will ask you politly to search for a correct author name :)`)
      console.log(err);
    }
  };
  useEffect(() => {
    Request();
  }, [search,moreBooks]);

  return (
    <Context.Provider
      value={{
        moreBooks,
        setMoreBooks,
        Token,
        setToken,
        books,
        setbooks,
        search,
        setSearch,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
