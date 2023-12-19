const router = require("express").Router();
const { Review } = require("../../models");
require("dotenv").config();

//create new review
router.post("/:gameID", async (req, res) => {
  try {
    const newReview = await Review.create({
      rating: req.body.rating,
      content: req.body.content,
      user_id: req.session.user_id,
      game_id: req.params.gameID,
    });
    res.json(newReview);
  } catch (error) {
    res.status(400).json(error);
  }
});

//delete review
router.delete("/:reviewID", async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.reviewID,
        user_id: req.session.user_id,
      },
    });

    res.json(reviewData);
  } catch (error) {
    res.status(500).json(error);
  }
});
