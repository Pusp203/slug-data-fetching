import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function useQuery() {
  const { search } = useLocation();
  console.log(search, "search");
  // search="?q=acer"
  // console.log(useLocation(), "uselocation");
  // {pathname: '/fetch', search: '?q=acer', hash: '', state: null, key: 'kxolz64u'} 'uselocation'
  // The useLocation() hook is used to get the current location object from the React Router, which contains information about the current URL, including the search query parameters.

  return React.useMemo(() => new URLSearchParams(search), [search]);
  //  The new URLSearchParams(search) constructor takes the search string from the current location object and returns a new URLSearchParams object that we can use to extract the query parameters.
}
{
  /*
The URLSearchParams object is a built-in JavaScript object that allows us to work with the search query parameters of a URL.
The React.useMemo() hook is used to memoize the URLSearchParams object so that it is only re-created when the search string changes. This can help improve performance by avoiding unnecessary re-renders of the component.
The useQuery() hook returns the memoized URLSearchParams object, which we can use to access the query parameters of the current URL.*/
}

const Fetch = () => {
  let history = useNavigate();
  const [values, setValues] = useState("");
  const [data, setData] = useState([]);

  let query = useQuery();
  const slug = query.get("q");
  console.log(slug, "slug");

  useState(() => {
    if (slug) {
      console.log(slug, "first");
      axios
        .get(
          `https://phpstack-919742-3192643.cloudwaysapps.com/api/search?q=${slug}`
        )
        .then((res) => {
          // console.log("res", res.data.data);
          setData(res.data.data);
        });
    }
  }, [slug]);
  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    //  console.log(values);
    history(`?q=${values}`);
  };

  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item.id}>
            {item.name}
            <img src={item.image.image} />{" "}
          </div>
        );
      })}
      <form action="" onSubmit={handleSubmit}>
        <input
          type="search"
          value={values}
          onChange={(e) => setValues(e.target.value)}
        />
        <button>Search</button>
      </form>
    </div>
  );
};

export default Fetch;
