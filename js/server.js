const express = require('express');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'rhemsis',
  host: 'localhost',
  database: 'elearningdb',
  password: 'miggy120113',
  port: 5432,
});

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Signup page
app.get('js/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

// Signup form submission
app.post('js/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.json({ success: false, error: 'Passwords do not match' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
    await pool.query(query, [name, email, hashedPassword]);

    return res.json({ success: true });
  } catch (error) {
    console.error('Error occurred during signup:', error);
    return res.json({ success: false, error: 'An error occurred during signup' });
  }
});

// Login page
app.get('js/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Login form submission
app.post('js/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve user from the database
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    const user = result.rows[0];

    // Check if user exists
    if (!user) {
      return res.json({ success: false, error: 'Invalid credentials' });
    }

    // Compare the password with the hashed password
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false, error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error occurred during login:', error);
    return res.json({ success: false, error: 'An error occurred during login' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

