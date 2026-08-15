import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/Header";
import ProductLayout from "../../Components/SingleProductLayout/ProductLayout";
import axios from "axios";
import { API_BASE_URL } from "../../lib/apiBase";

const SingleProductPage = () => {
  const [images, setImages] = React.useState([]);
  const [data, setData] = React.useState([]);
  const location = useLocation();
  let productId = location.pathname.split("/")[2];
  if (productId === "Products") {
    productId = location.pathname.split("/")[3];
  }
  if (location.pathname.split("/")[3] === "Products") {
    productId = location.pathname.split("/")[4];
  }
  React.useEffect(() => {
    const fetching = async () => {
      const res = await axios.get(
        `${API_BASE_URL}/products/${productId}`
      );
      setData(res.data);
      setImages(res.data.photos);
    };

    fetching();
  }, [productId]);
  return (
    <div>
      <Header />
      <ProductLayout data={data} image={images} />
    </div>
  );
};

export default SingleProductPage;
