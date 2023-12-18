const addGame = async (e) => {
  e.preventDefault();
  const game_id = document.getElementById('gameTitle').dataset.gameId;

  const response = await fetch('/api/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ game_id })
  })

  if (response.ok) {
    document.location.reload();
  };
};

document.getElementById('addBtn').addEventListener('click', addGame);