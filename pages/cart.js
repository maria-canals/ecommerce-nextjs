import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import Image from 'next/image';
import {
	Grid,
	TableContainer,
	Table,
	Typography,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Link,
	Select,
	MenuItem,
	Button,
	Card,
	List,
	ListItem,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { Layout } from '../components/Layout';
import { addToCart, removeFromCart } from '../store/actions/cart';

import React from 'react';

function CartScreen() {
	const selectInput = React.createRef();
	const dispatch = useDispatch();
	const router = useRouter();

	const {
		cart: { cartItems },
	} = useSelector(state => state);

	const removeItemHandler = itemId => {
		dispatch(removeFromCart(itemId));
	};

	const updateCartHandler = (productId, qty) => {
		dispatch(addToCart(productId, qty));
	};

	const checkoutHandler = () => {
		router.push('/shipping');
	};

	console.log(cartItems);
	return (
		<Layout title='Shopping Cart'>
			<Typography component='h1' variant='h1'>
				Shopping Cart
			</Typography>
			{cartItems.length === 0 ? (
				<div>
					Cart is empty.{' '}
					<NextLink href='/' passHref>
						<Link>Go shopping</Link>
					</NextLink>
				</div>
			) : (
				<Grid container spacing={1}>
					<Grid item md={9} xs={12}>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Image</TableCell>
										<TableCell>Name</TableCell>
										<TableCell align='right'>Quantity</TableCell>
										<TableCell align='right'>Price</TableCell>
										<TableCell align='right'>Action</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{cartItems.map(item => (
										<TableRow key={item._id}>
											<TableCell>
												<NextLink href={`/product/${item.slug}`} passHref>
													<Link>
														<Image
															src={item.image}
															alt={item.name}
															width={50}
															height={50}></Image>
													</Link>
												</NextLink>
											</TableCell>

											<TableCell>
												<NextLink href={`/product/${item.slug}`} passHref>
													<Link>
														<Typography>{item.name}</Typography>
													</Link>
												</NextLink>
											</TableCell>
											<TableCell align='right' ref={selectInput}>
												<Select
													transition='false'
													value={item.quantity}
													onChange={e =>
														updateCartHandler(item._id, e.target.value)
													}>
													{[...Array(item.countInStock).keys()].map(x => (
														<MenuItem key={x + 1} value={x + 1}>
															{x + 1}
														</MenuItem>
													))}
												</Select>
											</TableCell>
											<TableCell align='right'>${item.price}</TableCell>
											<TableCell align='right'>
												<Button
													variant='contained'
													color='secondary'
													onClick={() => removeItemHandler(item._id)}>
													x
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item md={3} xs={12}>
						<Card>
							<List>
								<ListItem>
									<Typography variant='h2'>
										Subtotal ({cartItems.reduce((a, b) => a + b.quantity, 0)}{' '}
										items) : $
										{cartItems.reduce((a, b) => a + b.quantity * b.price, 0)}
									</Typography>
								</ListItem>
								<ListItem>
									<Button
										onClick={checkoutHandler}
										variant='contained'
										color='primary'
										fullWidth>
										Check Out
									</Button>
								</ListItem>
							</List>
						</Card>
					</Grid>
				</Grid>
			)}
		</Layout>
	);
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
