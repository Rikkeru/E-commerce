import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import './style.css';

function AddProduct() {
  const [productNumber, setProductNumber] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const navigate = useNavigate();

  const username = localStorage.getItem('username');

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const submitForm = () => {
    if (!username) {
      console.error('Username is null');
      return;
    }
    const currentDate = new Date().toISOString().slice(0,10);
    const formData = new FormData();
    formData.append('productNumber', productNumber);
    formData.append('productName', capitalizeFirstLetter(productName));
    formData.append('productDescription', capitalizeFirstLetter(productDescription));
    formData.append('productPrice', productPrice);
    formData.append('productImage', productImage);
    formData.append("username", username);
    formData.append('dateAdded', currentDate);

    fetch('http://localhost:8800/add', {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        navigate('/view');
      });
  };
  return (
    <Form className="product-form">
      <div className="title">
        <h2>Browsify</h2>
      </div>
      <Form.Group controlId="productNumber">
        <Form.Label>Product Number</Form.Label>
        <Form.Control type="text" onChange={e => setProductNumber(e.target.value)} required autoComplete="off" />
      </Form.Group>
      <Form.Group controlId="productName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" onChange={e => setProductName(e.target.value)} required autoComplete="off" />
      </Form.Group>
      <Form.Group controlId="productDescription">
        <Form.Label>Product Description</Form.Label>
        <Form.Control as="textarea" onChange={e => setProductDescription(e.target.value)} required autoComplete="off" />
      </Form.Group>
      <Form.Group controlId="productPrice">
        <Form.Label>Product Price</Form.Label>
        <Form.Control type="number" placeholder="₱" onChange={e => setProductPrice(e.target.value)} required autoComplete="off" />
      </Form.Group>
      <Form.Group controlId="productImage">
        <Form.Label>Product Image</Form.Label>
        <Form.Control type="file" onChange={e => setProductImage(e.target.files[0])} required />
      </Form.Group>
      <div className='formbtn'>
        <Button variant="primary" id="addbtn" onClick={submitForm}>Add Product</Button>
        <Button variant="primary" id="viewbtn" onClick={() => navigate('/view')}>Back to Menu</Button>
      </div>
    </Form>
  );
}

export default AddProduct;
