const router = require("express").Router();
const sequelize = require('../config/config');
// Comments and User models are needed because the post data includes that info
// you must retrieve that info in your db query 
const { Post, Comment, User } = require('../models/');

// http://localhost:3001/
// get all posts for homepage
router.get("/", (req, res) => {
	console.log(req.session);

	Post.findAll({
		attributes: [
			'id',
			'post_text',
			'title',
			'created_at'
		],
		include: [
			{
				model: Comment,
				attributes: ['id', 'comment_text'],
				include: {
					model: User,
					attributes: ['username']
				}
			},
			{
				model: User,
				attributes: ['username']
			}
		]
	})
		.then((data) => {
			const posts = data.map(post => post.get({ plain: true }));
			res.render('homepage', { posts });
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// http://localhost:3001/post/:id
// get single post
router.get("/post/:id", (req, res) => {
	Post.findByPk(req.params.id, {
		//code here
	})
		.then((data) => {
			// code here
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// http://localhost:3001/login
// login user route
router.get("/login", (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}

	res.render('login');
});

// http://localhost:3001/signup
// signup user route
router.get("/signup", (req, res) => {
	// code here
});

module.exports = router;
