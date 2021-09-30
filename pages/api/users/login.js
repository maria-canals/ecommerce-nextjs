import nc from 'next-connect';
import User from '../../../models/User';
import { dbConnection } from '../../../utils/db/config';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../utils/auth';

const handler = nc().post(async (req, res) => {
	await dbConnection();
	const user = await User.findOne({ email: req.body.email });

	if (user && bcrypt.compareSync(req.body.password, user.password)) {
		const token = signToken(user);
		res.send({
			token,
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(401).send({ message: 'Invalid user or password' });
	}
});

export default handler;
