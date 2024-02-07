// signup.js

// Get the signup form element
const signupForm = document.getElementById('signup-form');

// Add event listener for form submission
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  // Get the form inputs
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Perform client-side validation
  if (!name || !email || !password || !confirmPassword) {
    // Display an error message if any field is empty
    alert('Please fill in all fields');
    return;
  }

  if (password !== confirmPassword) {
    // Display an error message if passwords do not match
    alert('Passwords do not match');
    return;
  }

  try {
    // Send a POST request to the server to create a new user
    const response = await fetch('public/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      // Signup successful, redirect to the success page
      window.location.href = 'public/success.html';
    } else {
      // Signup failed, display an error message
      alert('An error occurred. Please try again later.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }
});

