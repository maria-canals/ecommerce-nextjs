import nc from 'next-connect';
import User from '../../../models/User';
import { dbConnection } from '../../../utils/db/config';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../utils/auth';

const handler = nc().post(async (req, res) => {
	await dbConnection();
	const userExists = await User.findOne({ email: req.body.email });

	if (!userExists) {
		const newUser = await new User({
			name: req.body.name,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password),
			isAdmin: false,
		});

		const user = await newUser.save();

		const token = signToken(user);
		res.send({
			token,
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(401).send({ message: 'This user already exists' });
	}
});

export default handler;
