const router = require('express').Router();
const { User } = require('../../models');

// post a new user
// http://localhost:3000/api/users
router.post('/', (req, res) => {
	User.create({
		username: req.body.username,
		password: req.body.password
	})
		.then((userData) => {
			req.session.save(() => {
				req.session.id = userData.id;
				req.session.username = userData.username;
				req.session.loggedIn = true;

				res.json(userData);
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

// login a user
// http://localhost:3000/api/users/login
router.post('/login', (req, res) => {
	User.findOne({
		where: {
			username: req.body.username
		},
	}).then((userData) => {
		if (!userData) {
			res.status(400).json({ message: 'No user account found!' });
			return;
		}

		const validPassword = userData.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({ message: 'Incorrect password!' });
			return;
		}

		req.session.save(() => {
			req.session.id = userData.id;
				req.session.username = userData.username;
				req.session.loggedIn = true;
			
			res.json({ user: userData, message: 'You are now logged in!' });
		});
	});
});

// logout user
// http://localhost:3000/api/users/logout
router.post('/logout', (req, res) => {
	if (req.session.loggedIn) {
    req.session.destroy(() => {
			res.status(204).json({ message: 'You are now logged out!' }).end();
		});
  } else {
		res.status(400).end();
	}
});

// delete a user
// http://localhost:3000/api/users/user/:id
router.delete('/user/:id', (req, res) => {
	User.destroy({
		where: {
			id: req.params.id
		},
	})
		.then((userData) => {
			if (!userData) {
				res.status(404).json({ message: 'No user found with this id' });
				return;
			}
			res.json(userData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
