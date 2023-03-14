import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Datas = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClick, setIsClick] = useState();
  useEffect(() => {
    async function callApi() {
      setIsLoading(true);
      try {
        const apiResult = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(apiResult.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
        alert("something went wrong");
        setIsLoading(false);
      }
    }
    callApi();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loadingggggggggg....</p>
      ) : (
        <div>
          {posts.map((val) => {
            return (
              <div key={val.id}>
                {" "}
                <Link to={`/:id`}> {val.title}</Link>{" "}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Datas;
