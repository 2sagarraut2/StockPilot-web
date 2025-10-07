import enviroments from "../enviroment";

import axios from "axios";

// get all stock
export const stockData = async (page, limit) => {
  let url = `${enviroments.dataURL}/stock?page=${page}&limit=${limit}`;

  return await axios.get(url, { withCredentials: true });
};

// search stocks
export const searchProductData = async (query) => {
  let url = `${enviroments.dataURL}/stock/search?query=${query}`;

  return await axios.get(url, { withCredentials: true });
};

// get all categories
export const categoryData = async (page, limit) => {
  let url = `${enviroments.dataURL}/category?page=${page}&limit=${limit}`;

  return await axios.get(url, { withCredentials: true });
};

// add Product
export const addProduct = async (data) => {
  let url = `${enviroments.dataURL}/product/add`;

  return await axios.post(url, data, { withCredentials: true });
};

// update product
export const updateProduct = async (productId, data) => {
  let url = `${enviroments.dataURL}/product/update/${productId}`;

  return await axios.post(url, data, { withCredentials });
};

// delete product
export const deleteProduct = async (productId) => {
  let url = `${enviroments.dataURL}/product/delete/${productId}`;

  return await axios.delete(url, { withCredentials: true });
};

// add category
export const addCategory = async (data) => {
  let url = `${enviroments.dataURL}/category/add`;

  return await axios.post(url, data, { withCredentials: true });
};

// update category
export const updateCategory = async (categoryId, data) => {
  let url = `${enviroments.dataURL}/category/update/${categoryId}}`;

  return await axios.patch(url, data, { withCredentials: true });
};

// delete category
export const deleteCategory = async (categoryId) => {
  let url = `${enviroments.dataURL}/category/delete/${categoryId}`;

  return await axios.delete(url, withCredentials);
};
