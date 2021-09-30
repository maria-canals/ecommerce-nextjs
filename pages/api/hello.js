// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { dbConnection } from '../../utils/db/config';

export default async function handler(req, res) {
	res.status(200).json({ name: 'John Doe' });
}
