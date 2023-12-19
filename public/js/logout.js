// Function to log out user
const userLogout = async () => {
  const response = await fetch('/api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/');
  };
};

document.getElementById('logout').addEventListener('click', userLogout);