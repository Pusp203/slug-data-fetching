import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Details = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  //   console.log(id, "id");
  console.log("params", useParams());
  useEffect(() => {
    async function callApi() {
      try {
        const apiResult = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        setPost(apiResult.data);
      } catch (error) {
        console.log(error);
        //   alert("something went wrong");
      }
    }
    callApi();
  }, [id]);
  return (
    <div>
      {post.id}
      {post.userId}
      {post.body}
    </div>
  );
};

export default Details;
