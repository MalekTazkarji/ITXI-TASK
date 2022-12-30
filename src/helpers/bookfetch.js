// fetching get request from the web api (google books api)
const Request = async (url) => {
    try {
      const response = await fetch(url);
      const res = await response.json();
      return res;
    
    } catch (err) {
       console.log(err)
    }
  };

  export default Request;