let errorMsg = document.getElementById('errorMessage');

// Function to login user or return error, if needed
const userLogin = async (e) => {
  e.preventDefault();
  const username = document.getElementById('loginUser').value.trim();
  const password = document.getElementById('loginPass').value.trim();

  if (username && password) {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const res = await response.json();
      errorMsg.textContent = res.message;
      return;
    };

    document.location.replace('/');
  } else {
    errorMsg.textContent = 'Please enter both a username and a password';
  };
};

// Function to sign up user or display error, if needed
const userSignUp = async (e) => {
  e.preventDefault();
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
document.getElementById('loginBtn').addEventListener('click', userLogin);