import mongoose from 'mongoose';

export const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('DB connected');
	} catch (error) {
		throw new Error('Error connecting to DB');
	}
};

export const convertDocToObj = doc => {
	doc._id = doc._id.toString();
	doc.createdAt = doc.createdAt.toString();
	doc.updatedAt = doc.createdAt.toString();
	return doc;
};
