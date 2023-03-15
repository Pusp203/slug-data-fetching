import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./dataFetching.scss";
// import PostDetails from "./PostDetails";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const DataFetching = () => {
  let history = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isClick, setIsClick] = useState();

  const handlesClick = (val) => {
    console.log(val, "val");
    history(`/?q=${val}`);
  };

  let query = useQuery();
  const slug = query.get("q");
  console.log("slug", slug);

  // will run after slug value is there in query i.e http://localhost:5173/?q=2 which means q will be equivalent to slug
  useEffect(() => {
    if (slug) {
      setLoading(true);
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${slug}`)
        .then((res) => {
          setIsClick(res.data);
          setLoading(false);
        });
    }
  }, [slug]);

  // mount hune bitikai chalxa
  useEffect(() => {
    setIsLoading(true);

    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log(res, "res");
        setPosts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="post-list">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <select onChange={(e) => handlesClick(e.target.value)}>
              <option value="">Select a post...</option>

              {posts?.map((val) => {
                return (
                  <option key={val.id} value={val.id}>
                    {val.title}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>

      {/* <div className="post-details">
        <div>
          {loading ? (
            <p>LOADING...</p>
          ) : (
            <div>
              {isClick && (
                <div>
                  <h2>{isClick.title}</h2>
                  <h2>{isClick.body}</h2>
                  <h2>{isClick.id}</h2>
                </div>
              )}
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default DataFetching;
// const bool = (val) => {
//   return val;
// };
// const val1 = bool("hello");
// console.log("val1", val1);
