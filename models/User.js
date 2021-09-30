import { Schema, model, models } from 'mongoose';

const userSchema = Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, required: true },
	},
	{
		timestamps: true,
	}
);

const User = models.User || model('User', userSchema);

export default User;
