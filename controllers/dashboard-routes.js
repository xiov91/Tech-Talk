const router = require('express').Router();
// in order to work with the database we need to require the models which in turn are connected to the database
// this is a named import, Also a constructor, 
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// http://localhost:3000/dashboard/
// withAuth middleware is used to check if the user is logged in
router.get('/', withAuth, (req, res) => {
	console.log(req.session);
	Post.findAll({
		where: {
			user_id: req.session.user_id
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
			const posts = postData.map(post => post.get({ plain: true }));
			res.render('dashboard', { posts, loggedIn: true });
		})
		.catch((err) => {
			console.log(err);
			res.redirect('login');
		});
});


// http://localhost:3000/dashboard/edit/:id
router.get('/edit/:id', withAuth, (req, res) => {
	Post.findByPk(req.params.id, {
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
			if (postData) {
				const post = postData.get({ plain: true });

				res.render('edit-post', {
					post,
					loggedIn: true
				});
			} else {
				res.status(404).end();
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;