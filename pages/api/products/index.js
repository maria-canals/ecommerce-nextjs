import nc from 'next-connect';
import Product from '../../../models/Product';
import { dbConnection } from '../../../utils/db/config';

const handler = nc().get(async (req, res) => {
	await dbConnection();
	const products = await Product.find({});

	res.send(products);
});

export default handler;
