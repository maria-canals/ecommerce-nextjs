import React, { useEffect, useState } from 'react';
import {
	Button,
	List,
	ListItem,
	TextField,
	Typography,
	Link,
} from '@material-ui/core';
import NextLink from 'next/link';
import { useSnackbar } from 'notistack';

import { Layout } from '../components/Layout';
import useStyles from '../styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser } from '../store/actions/user';
import { useRouter } from 'next/dist/client/router';

function Login() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const router = useRouter();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const { redirect } = router.query;
	const { user } = useSelector(state => state.user);

	useEffect(() => {
		if (user) {
			router.push('/');
		}
	});

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const submitHandler = async e => {
		e.preventDefault();
		const isError = await dispatch(LoginUser(email, password));

		if (isError) {
			enqueueSnackbar(isError, { variant: 'error' });
		}
		router.push(redirect || '/');
	};
	return (
		<Layout title='Login'>
			<form onSubmit={submitHandler} className={classes.form}>
				<Typography component='h1' variant='h1'>
					Login
				</Typography>
				<List>
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
							label='password'
							inputProps={{ type: 'password' }}
							onChange={e => setPassword(e.target.value)}></TextField>
					</ListItem>
					<ListItem>
						<Button variant='contained' type='submit' fullWidth color='primary'>
							Login
						</Button>
					</ListItem>
					<ListItem>
						Don&apos;t have an account? &nbsp;
						<NextLink href='/register' passHref>
							<Link>Register</Link>
						</NextLink>
					</ListItem>
				</List>
			</form>
		</Layout>
	);
}

export default Login;
