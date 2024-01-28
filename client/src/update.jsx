import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import './style.css';

const UpdateProduct = () => {
  console.log = console.warn = console.error = function () { }

  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
  });

  const navigate = useNavigate();
  const { productNumber } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8800/products/${productNumber}`);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        setProduct({
          productName: data.productName,
          productDescription: data.productDescription,
          productPrice: data.productPrice,
        });
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
    fetchData();
  }, [productNumber]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const capitalizedValue = capitalizeFirstLetter(value);
    setProduct((prev) => ({ ...prev, [name]: capitalizedValue }));
  };


  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/products/${productNumber}`, product);
      navigate("/view");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form className="product-form">
      <Form.Group controlId="productName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" name="productName" value={product.productName} onChange={handleChange} required autoComplete="off" />
      </Form.Group>
      <Form.Group controlId="productDescription">
        <Form.Label>Product Description</Form.Label>
        <Form.Control as="textarea" name="productDescription" value={product.productDescription} onChange={handleChange} required autoComplete="off" />
      </Form.Group>
      <Form.Group controlId="productPrice">
        <Form.Label>Product Price</Form.Label>
        <Form.Control type="number" name="productPrice" value={product.productPrice} onChange={handleChange} required autoComplete="off" />
      </Form.Group>
      <Button variant="primary" id="updbtn" onClick={handleClick}>Update Product</Button>
      <Button variant="primary" id="viewbtn" onClick={() => navigate('/view')}>Back to Menu</Button>
    </Form>
  );
};

export default UpdateProduct;
