import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import {
	AppBar,
	Container,
	Toolbar,
	Link,
	ThemeProvider,
	CssBaseline,
	Badge,
	Button,
	Menu,
	MenuItem,
	Typography,
} from '@material-ui/core';
import Image from 'next/image';
import Head from 'next/head';
import NextLink from 'next/link';
import useStyles from '../styles/styles';

import { createTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser } from '../store/actions/user';
import { useRouter } from 'next/dist/client/router';

export function Layout({ title, description, children }) {
	const classes = useStyles();
	const router = useRouter();
	const dispatch = useDispatch();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const { user } = useSelector(state => state.user);
	const [anchorEl, setAnchorEl] = useState(null);

	const loginClickHandler = e => {
		setAnchorEl(e.currentTarget);
	};

	const loginMenuCloseHandler = () => {
		setAnchorEl(null);
	};

	const logoutHandler = async () => {
		setAnchorEl(null);
		const isLogoutOut = dispatch(LogoutUser());

		if (isLogoutOut) {
			enqueueSnackbar(isLogoutOut, { variant: 'success' });
		}

		router.push('/');
	};

	const theme = createTheme({
		typography: {
			h1: {
				fontSize: '1.5rem',
				fontWeight: 400,
				margin: '1rem 0',
			},
			h2: {
				fontSize: '1rem',
				fontWeight: 400,
				margin: '1rem 0',
			},
		},
		palette: {
			primary: {
				main: '#60ADDC',
			},
			secondary: {
				main: '#6073DC',
			},
		},
	});
	const { cart } = useSelector(state => state);

	return (
		<div>
			<Head>
				<title>{title ? `${title} - Trendy` : 'Trendy'}</title>
				{description && <meta name='description' content={description}></meta>}
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar position='static' className={classes.navbar}>
					<Toolbar>
						<NextLink href='/' passHref>
							<Link>
								<Image
									className={classes.brand}
									src='/images/logo.png'
									alt='logo'
									width='50px'
									height='50px'
								/>
							</Link>
						</NextLink>
						<div className={classes.grow}></div>
						<NextLink href='/cart' passHref>
							<Link>
								<Typography component='span'>
									{cart.cartItems.length > 0 ? (
										<Badge
											color='secondary'
											badgeContent={cart.cartItems.length}>
											Cart
										</Badge>
									) : (
										'Cart'
									)}
								</Typography>
							</Link>
						</NextLink>
						{user ? (
							<>
								<Button
									className={classes.navbarButton}
									aria-controls='simple-menu'
									aria-haspopup='true'
									onClick={loginClickHandler}>
									Welcome {user.name}
								</Button>
								<Menu
									id='simple-menu'
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={loginMenuCloseHandler}>
									<MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
									<MenuItem onClick={loginMenuCloseHandler}>
										My account
									</MenuItem>
									<MenuItem onClick={logoutHandler}>Logout</MenuItem>
								</Menu>
							</>
						) : (
							<NextLink href='/login' passHref>
								<Link>Login </Link>
							</NextLink>
						)}
					</Toolbar>
				</AppBar>
			</ThemeProvider>

			<Container className={classes.main}>{children}</Container>
			<footer className={classes.footer}>
				Maria Canals © All rights reserved {new Date().getFullYear()}
			</footer>
		</div>
	);
}
