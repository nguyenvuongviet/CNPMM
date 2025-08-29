import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3069/api")
      .then((res) => {
        console.log("API response:", res.data); // Log dữ liệu ra console
        setData(res.data); // Lưu dữ liệu vào state
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {Array.isArray(data) ? (
          data.map((item, index) => <li key={index}>{JSON.stringify(item)}</li>)
        ) : (
          <li>{JSON.stringify(data)}</li>
        )}
      </ul>
    </div>
  );
};

export default Home;
