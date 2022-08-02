const router = require("express").Router();
const { Comment } = require("../../models/");
// require the middleware
const withAuth = require("../../utils/auth");

router.post("/", withAuth, (req, res) => {
  Comment.create({
    body: req.body.comment_text
  })
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;
