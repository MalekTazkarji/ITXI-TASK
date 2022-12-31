import { useEffect, useState } from "react";
import { createContext } from "react";
import Request from "../helpers/bookfetch";
export const Context = createContext();

const ContextProvider = (props) => {
  const [Token, setToken] = useState(localStorage.getItem("Token"));
  const [books, setbooks] = useState([]);
  const [search, setSearch] = useState("");
  const [moreBooks, setMoreBooks] = useState(0);
  const [wholeObjBook,setWholeObjBook]=useState([]);
  const[canlogin,setCanLogin]= useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const fetchApi = async () => {
    try {
      const res = await Request(`https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:${search}&filter=free-ebooks&key=AIzaSyCuuaqLB7lfZmhgt5h2QJU8jbwj9zHQ5ms&startIndex=${moreBooks}&maxResults=35`);
      if (res.totalItems !== 0) {
        const sortedResult = res.items.sort(function (a, b) {
          if (a.volumeInfo.publishedDate < b.volumeInfo.publishedDate) return 1;
          if (a.volumeInfo.publishedDate > b.volumeInfo.publishedDate)
            return -1;
          return 0;
        });
        setbooks(sortedResult);
          if(res.items){
          if(res.totalItems){
          setWholeObjBook(res);
          }
        }
      } else {
        setNotify({
          isOpen: true,
          message: `The Author ${search} is not found in google books`,
          type: "error",
        });
      }
    } catch (err) {
      console.log(err);
      setNotify({
        isOpen: true,
        message: `server error`,
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchApi();
  }, [search, moreBooks ,Token ,canlogin]);

  return (
    <Context.Provider
      value={{
        canlogin,
        setCanLogin,
        wholeObjBook,
        notify,
        setNotify,
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
