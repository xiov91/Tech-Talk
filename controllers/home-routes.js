const router = require('express').Router();
const sequelize = require('../config/config');
// Comments and User models are needed because the post data includes that info
// you must retrieve that info in your db query 
const { Post, Comment, User } = require('../models/');

// http://localhost:3001/
// get all posts for homepage
router.get('/', (req, res) => {
	console.log(req.session);

	Post.findAll({
		attributes: [
			'id',
			'post_text',
			'title'
		],
		include: [
			{
				model: Comment,
				attributes: ['id', 'comment_text', 'post_id', 'user_id'],
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
		.then((postData) => {
			const posts = postData.map(post => post.get({ plain: true }));

			res.render('layouts/main', {
				posts,
				loggedIn: req.session.loggedIn
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// http://localhost:3001/post/:id
// get single post
router.get('/post/:id', (req, res) => {
	Post.findOne(req.params.id, {
		where: {
			id: req.params.id
		},
		attributes: [
			'id',
			'post_text',
			'title'
		],
		include: [
			{
				model: Comment,
				attributes: ['id', 'comment_text', 'post_id', 'user_id'],
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
		.then((postData) => {
			if (!postData) {
				res.status(404).json({ message: `This isn't the post you're looking for (not with this ID anyway...)`});
				return;
			}

			const post = postData.get({ plain: true });

			res.render('single-post', {
				post,
				loggedIn: req.session.loggedIn
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// http://localhost:3001/login
// login user route
router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('');
		return;
	}

	res.render('login');
});

// http://localhost:3001/signup
// signup user route
router.get('/signup', (req, res) => {
	//come back to this
});

module.exports = router;
