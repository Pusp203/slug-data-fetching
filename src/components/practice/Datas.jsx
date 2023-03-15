import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Datas = () => {
  let history = useNavigate();
  const [inputs, setInputs] = useState("");
  // console.log(value);
  const [data, setData] = useState([]);
  // const [isClick, setIsClick] = useState();

  // const handlesClick = (val) => {
  //   console.log(val, "val");
  //   // history(`/?q=${val}`);
  // };

  let query = useQuery();
  const slug = query.get("q");
  // console.log(slug, "slug");
  useEffect(() => {
    if (slug) {
      // console.log("first", slug);
      axios
        .get(
          `https://phpstack-919742-3192643.cloudwaysapps.com/api/categories?q=${slug}`
        )
        .then((res) => {
          // console.log("first", res.data.data);

          setData(res.data.data);
        });
    }
  }, [slug]);
  console.log(data);

  // useEffect(() => {
  //   if (slug) {
  //     axios
  //       .get(
  //         `https://phpstack-919742-3192643.cloudwaysapps.com/api/search/${slug}`
  //       )
  //       .then((res) => {
  //         // setInputs(res.data);
  //       });
  //   }
  // }, [slug]);

  // useEffect(() => {
  //   async function callApi() {
  //     try {
  //       const apiResult = await axios.get(
  //         "https://phpstack-919742-3192643.cloudwaysapps.com/api/search"
  //       );
  //       console.log(apiResult, "apiresult");
  //       setData(apiResult.data);
  //     } catch (error) {
  //       console.log(error);
  //       alert("something went wrong");
  //     }
  //   }
  //   callApi();
  // }, []);
  // const handleChange = (e) => {
  //   setValue(e.target.value);
  //   // console.log(e.target.value);
  // };
  const handleClick = (e) => {
    e.preventDefault();
    history(`?q=${inputs}`);
  };

  return (
    <div>
      {data.map((vals) => {
        return (
          <div key={vals.id}>
            {vals.name}
            <img src={vals.image.image} />{" "}
          </div>
        );
      })}
      <form action="" onSubmit={handleClick}>
        <input
          type="text"
          value={inputs}
          onChange={(e) => setInputs(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Datas;
