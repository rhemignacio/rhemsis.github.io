// login.js

// Get the login form element
const loginForm = document.getElementById('login-form');

// Add event listener for form submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  // Get the form inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Perform client-side validation
  if (!email || !password) {
    // Display an error message if any field is empty
    alert('Please fill in all fields');
    return;
  }

  try {
    // Send a POST request to the server to authenticate the user
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Login successful, redirect to the success page
      window.location.href = '/success.html';
    } else {
      // Login failed, display an error message
      alert('Invalid email or password');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }
});

