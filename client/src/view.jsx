import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, FormControl, Button } from 'react-bootstrap';
import axios from "axios";
import './style.css';

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    fetch(`http://localhost:8800/products?username=${username}`)
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const handleDelete = async (productNumber) => {
    try {
      await axios.delete(`http://localhost:8800/products/${productNumber}`);
      setProducts(prevProducts => prevProducts.filter(product => product.productNumber !== productNumber));
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate("/login");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="container">
      <nav className="navbar">
        <div className="left">
          <div className="title">
            <h2>Browsify</h2>
          </div>
          <div className="search-form">
            <Form onSubmit={e => e.preventDefault()}>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchTerm} onChange={handleSearch} />
            </Form>
          </div>
        </div>
        <div className="right">
          <div className="nav-buttons">
            <Link to="/add" className="btn btn-link nav-link">Add new product</Link>
            <Button onClick={handleLogout} className="btn btn-link logout-btn">
              Log out
            </Button>
          </div>
        </div>
      </nav>
      <div className="products-row">
        {products.length === 0 ? (
          <p id="emptyprod">No more products left!</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(product => {
            const date = new Date(product.dateAdded);
            const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
            return (
              <Card key={product.productNumber} className="product-card">
                <Card.Img variant="top" src={`/uploads/${product.productImage}`} alt={product.productName} />
                <Card.Body>
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Text>{product.productDescription}</Card.Text>
                  <Card.Text>₱{product.productPrice}</Card.Text>
                  <Card.Text>Date Added: {formattedDate}</Card.Text>
                  <div className="card-buttons">
                    <Link to={`/update/${product.productNumber}`} className="btn btn-danger btn-sm">Edit</Link>
                    <button variant="primary" onClick={() => handleDelete(product.productNumber)} className="btn btn-danger btn-sm">Delete</button>
                  </div>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <p>No such product found!</p>
        )}
      </div>
    </div>
  );
}

export default ViewProducts;
