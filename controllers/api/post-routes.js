const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

//create a new post
// http://localhost:3000/api/post
router.post('/', withAuth, (req, res) => {

	Post.create({
		title: req.body.title,
		post_text: req.body.post_text,
		user_id: req.session.user_id
	})
		.then((postData) => res.json(postData))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

// update a post
// http://localhost:3000/api/post/:id
router.put('/:id', withAuth, (req, res) => {
	Post.update(
		{
			title: req.body.title,
			post_text: req.body.post_text
		},
		{
			where: {
				id: req.params.id
			}
		}
	)
		.then((postData) => {
			if (!postData) {
				res.status(404).json({ message: `This isn't the post you're looking for (bad ID)` });
				return;
			}
			res.json(postData);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

// delete a post
// http://localhost:3000/api/post/:id
router.delete('/:id', withAuth, (req, res) => {
	console.log('id', req.params.id);
	Post.destroy({
		where: {
			id: req.params.id
		}
	})
		.then(postData => {
			if (!postData) {
				res.status(404).json({ message: `This isn't the post you're looking for (bad ID)` });
				return;
			}
			res.json(postData);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});


module.exports = router;
