import nc from 'next-connect';
import { dbConnection } from '../../utils/db/config';
import data from '../../utils/data';
import Product from '../../models/Product';
import User from '../../models/User';

const handler = nc().get(async (req, res) => {
	await dbConnection();
	await Product.deleteMany();
	await Product.insertMany(data.products);

	await User.insertMany(data.users);

	res.send({ message: 'seeded successfully' });
});

export default handler;
