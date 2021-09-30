import React, { useState } from 'react';
import {
	Button,
	List,
	ListItem,
	TextField,
	Typography,
	Link,
} from '@material-ui/core';
import NextLink from 'next/link';
import validator from 'validator';

import { useSnackbar } from 'notistack';
import { Layout } from '../components/Layout';
import useStyles from '../styles/styles';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/actions/user';

function Register() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	const onSubmitRegisterHandler = async e => {
		e.preventDefault();

		if (password !== password2) {
			enqueueSnackbar('Passwords do not match, try again', {
				variant: 'error',
			});

			return;
		}

		if (validator.isEmail(email) === false) {
			const errorEmail = 'Please enter a valid email';
			enqueueSnackbar(errorEmail, { variant: 'error' });
			return;
		}

		const isError = await dispatch(registerUser(name, email, password));
		if (isError) {
			enqueueSnackbar(isError, { variant: 'error' });
		} else {
			enqueueSnackbar('Succesfully registered', { variant: 'success' });
		}
	};
	return (
		<Layout title='Register'>
			<form onSubmit={onSubmitRegisterHandler} className={classes.form}>
				<Typography component='h1' variant='h1'>
					Register
				</Typography>
				<List>
					<ListItem>
						<TextField
							variant='outlined'
							fullWidth
							id='name'
							label='Name'
							inputProps={{ type: 'text' }}
							onChange={e => setName(e.target.value)}></TextField>
					</ListItem>
					<ListItem>
						<TextField
							variant='outlined'
							fullWidth
							id='email'
							label='Email'
							inputProps={{ type: 'email' }}
							onChange={e => setEmail(e.target.value)}></TextField>
					</ListItem>
					<ListItem>
						<TextField
							variant='outlined'
							fullWidth
							id='password'
							label='Password'
							inputProps={{ type: 'password' }}
							onChange={e => setPassword(e.target.value)}></TextField>
					</ListItem>
					<ListItem>
						<TextField
							variant='outlined'
							fullWidth
							id='password2'
							label='Confirm Password'
							inputProps={{ type: 'password' }}
							onChange={e => setPassword2(e.target.value)}></TextField>
					</ListItem>
					<ListItem>
						<Button variant='contained' type='submit' fullWidth color='primary'>
							Register
						</Button>
					</ListItem>
					<ListItem>
						Already have an account? &nbsp;
						<NextLink href='/login' passHref>
							<Link>Login</Link>
						</NextLink>
					</ListItem>
				</List>
			</form>
		</Layout>
	);
}

export default Register;
