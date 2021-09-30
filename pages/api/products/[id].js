import nc from 'next-connect';
import Product from '../../../models/Product';
import { dbConnection } from '../../../utils/db/config';

const handler = nc().get(async (req, res) => {
	await dbConnection();
	const product = await Product.findById(req.query.id);

	res.send(product);
});

export default handler;
