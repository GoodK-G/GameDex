// Function to login user or return error, if needed
const userLogin = async (e) => {
  e.preventDefault();
  let errorMsg = document.getElementById('errorMessage');
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

document.getElementById('loginBtn').addEventListener('click', userLogin);