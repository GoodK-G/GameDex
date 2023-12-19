const addReview = async (e) => {
  e.preventDefault();
  const params = window.location.pathname.split("/");
  const game_id = params[params.length - 1];
  console.log("game_id", game_id);
  const rating = document.querySelector("#rating").value;
  const content = document.querySelector("#content").value;
  const review = { rating: rating, content: content };

  const response = await fetch(`/api/reviews/${game_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (response.ok) {
    window.location.href = `${window.location.origin}/games/${game_id}`;
  }
};

document.getElementById("reviewForm").addEventListener("submit", addReview);
