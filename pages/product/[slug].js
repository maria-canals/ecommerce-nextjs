import {
	Grid,
	Link,
	List,
	ListItem,
	Typography,
	Card,
	Button,
} from '@material-ui/core';
import NextLink from 'next/link';
import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { Layout } from '../../components/Layout';
import useStyles from '../../styles/styles';
import { convertDocToObj, dbConnection } from '../../utils/db/config';
import Product from '../../models/Product';
import { addToCart } from '../../store/actions/cart';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';

function ProductScreen({ product }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const router = useRouter();

	const {
		cart: { cartItems },
	} = useSelector(state => state);

	const existItem = cartItems.find(item => item._id === product._id);
	const quantity = existItem ? existItem.quantity + 1 : 1;

	const addToCartHandler = async () => {
		const { data } = await axios.get(`/api/products/${product._id}`);

		if (data.countInStock <= 0) {
			alert('Sorry, product is out of stock');
		}
		dispatch(addToCart(product._id, 1));
		router.push('/cart');
	};

	if (!product) {
		return <div>Product Not Found</div>;
	}

	return (
		<Layout title={product.name} description={product.description}>
			<div className={classes.section}>
				<NextLink href='/'>
					<Typography>
						<Link>Back to products</Link>
					</Typography>
				</NextLink>
			</div>

			<Grid container spacing={1}>
				<Grid item md={6} xs={12}>
					<Image
						src={product.image}
						alt={product.name}
						width={640}
						height={640}
						layout='responsive'></Image>
				</Grid>

				<Grid item md={3} xs={12}>
					<List>
						<ListItem>
							<Typography component='h1' variant='h1'>
								{product.name}
							</Typography>
						</ListItem>
						<ListItem>
							<Typography>Category: {product.category}</Typography>
						</ListItem>
						<ListItem>
							<Typography>Brand: {product.brand}</Typography>
						</ListItem>
						<ListItem>
							<Typography>
								Rating: {product.rating} starts ({product.numReviews})
							</Typography>
						</ListItem>
						<ListItem>
							<Typography>Description: {product.description}</Typography>
						</ListItem>
					</List>
				</Grid>

				<Grid item md={3} xs={12}>
					<Card>
						<List>
							<ListItem>
								<Grid container>
									<Grid item xs={6}>
										<Typography>Price</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography>${product.price}</Typography>
									</Grid>
								</Grid>
							</ListItem>
							<ListItem>
								<Grid container>
									<Grid item xs={6}>
										<Typography>Status</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography>
											{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}
										</Typography>
									</Grid>
								</Grid>
							</ListItem>
							<ListItem>
								<Button
									fullWidth
									variant='contained'
									color='primary'
									onClick={() => addToCartHandler(product)}>
									Add to Cart
								</Button>
							</ListItem>
						</List>
					</Card>
				</Grid>
			</Grid>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { params } = context;
	const { slug } = params;
	await dbConnection();
	const product = await Product.findOne({ slug }).lean();
	return {
		props: {
			product: convertDocToObj(product),
		},
	};
}

export default dynamic(() => Promise.resolve(ProductScreen), { ssr: false });
