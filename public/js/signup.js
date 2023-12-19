// Function to sign up user or display error, if needed
const userSignUp = async (e) => {
  e.preventDefault();
  let errorMsg = document.getElementById('errorMessage');
  const username = document.getElementById('signupUser').value.trim();
  const password = document.getElementById('signupPass').value.trim();

  if (username && password.length >= 8) {
    const response = await fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const res = await response.json();
      if (res.errors[0].message === "username must be unique") {
        errorMsg.textContent = 'Username already taken. Please try again.';
      } else {
        errorMsg.textContent = res.errors[0].message;
      };
    } else {
      document.location.replace('/')
    };
  } else if (username && password.length < 8) {
    errorMsg.textContent = 'Password must be at least 8 characters';
  } else {
    errorMsg.textContent = 'Please enter a username';
  };
};

document.getElementById('signupBtn').addEventListener('click', userSignUp);