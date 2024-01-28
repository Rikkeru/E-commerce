const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const upload = multer({ dest: 'uploads/' });

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'wacky040402',
  database: 'products_db'
});

app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const q = "SELECT * FROM users WHERE username = ? AND password = ?";
  const values = [username, password];
  try {
    const rows = await new Promise((resolve, reject) => {
      db.query(q, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    if (rows.length > 0) {
      res.json({ message: "Login successful!", userid: rows[0].id });
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Login failed");
  }
});

app.post("/signup", async (req, res) => {
  const { fullname, username, password } = req.body;
  const checkUserExistsQuery = "SELECT * FROM users WHERE username = ?";
  const insertUserQuery = "INSERT INTO users (fullname, username, password) VALUES (?, ?, ?)";
  const values = [fullname, username, password];
  try {
    const existingUsers = await new Promise((resolve, reject) => {
      db.query(checkUserExistsQuery, [username], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    if (existingUsers.length > 0) {
      return res.status(400).json("Username already exists");
    }
    await new Promise((resolve, reject) => {
      db.query(insertUserQuery, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    res.json("Signup successful!");
  } catch (error) {
    console.error("Signup failed:", error);
    res.status(500).json("Signup failed");
  }
});

app.get('/products', (req, res) => {
  const { username } = req.query;
  let sql = 'SELECT * FROM products WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/add', upload.single('productImage'), (req, res) => {
  let sql = 'SELECT * FROM products WHERE productNumber = ?';
  db.query(sql, [req.body.productNumber], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send('Product number already exists...');
    } else {
      sql = 'INSERT INTO products SET ?';
      let product = {
        productNumber: req.body.productNumber,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        productImage: req.file.filename,
        username: req.body.username,
        dateAdded: req.body.dateAdded
      };
      db.query(sql, product, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Product added...');
      });
    }
  });
});

app.put("/products/:productNumber", async (req, res) => {
  const number = req.params.productNumber;
  const q = "UPDATE products SET `productName`=?, `productDescription`=?, `productPrice`=? WHERE productNumber =?";
  const values = [
    req.body.productName,
    req.body.productDescription,
    req.body.productPrice,
  ];
  try {
    db.query(q, [...values, number]);
    return res.json("Successfully updated");
  } catch (err) {
    return res.json(err);
  }
});

app.delete("/products/:productNumber", async (req, res) => {
  const productNumber = req.params.productNumber;
  const q = "DELETE FROM products WHERE productNumber = ?";
  try {
    db.query(q, [productNumber]);
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred on the server.' });
  }
});

app.listen(8800, () => {
  console.log('Connected to backend');
});