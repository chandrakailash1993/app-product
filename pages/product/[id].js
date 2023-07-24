import React from "react";
import { http } from "shell/utils";

const Product = ({ details }) => {
  return <h1>{details.name}</h1>;
};

Product.getInitialProps = async (ctx) => {
  const { data } = await http.get(`/api/v2/pokemon/${ctx.query.id}`);

  return {
    details: data,
  };
};

export default Product;
