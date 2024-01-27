const handleSignin = (db, bcrypt) => (req, res) => {
	const loginEmail = req.body.email;
	const loginPwd = req.body.password;

	if(!loginEmail || !loginPwd) {
		return res.status(400).json('Incorrect form submission.');
	}

	db.select('email','hash')
	.from('login')
	.where('email','=',loginEmail)
	.then(user => {
		const isValid = bcrypt.compareSync(loginPwd, user[0].hash);

		if(isValid) {
			return db.select('*').from('users')
			.where('email', '=', loginEmail)
			.then(user => {
				res.json(user[0]);
			})
			.catch(err => res.status(400).json('login failure'))
		} else {
			res.status(400).json('incorrect user or password')
		}
	})
	.catch(err => {
		console.log(err)
		res.status(400).json('error occured')
	})
}

module.exports = {
	handleSignin: handleSignin
}