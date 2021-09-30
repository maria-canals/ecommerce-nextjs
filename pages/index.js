import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	CardActions,
	Grid,
	Typography,
	Button,
} from '@material-ui/core';
import { Layout } from '../components/Layout';
import NextLink from 'next/link';
import { dbConnection } from '../utils/db/config';
import Product from '../models/Product';
import { convertDocToObj } from '../utils/db/config';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/actions/cart';
import { useRouter } from 'next/dist/client/router';

import useStyles from '../styles/styles';
import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Home({ products }) {
	const router = useRouter();
	const dispatch = useDispatch();

	const classes = useStyles();

	const carouselImages = [
		{ img: '/images/banner1.jpg', key: 'banner1' },
		{ img: '/images/banner2.jpg', key: 'banner2' },
	];

	const addToCartHandler = async product => {
		dispatch(addToCart(product._id, 1));
		router.push('/cart');
	};

	return (
		<Layout>
			<Carousel
				className={classes.carousel}
				animation='slide'
				slide={false}
				fade={false}>
				{carouselImages.map(image => (
					<Image
						key={image.key}
						src={image.img}
						alt='carousel'
						layout='responsive'
						height='120px'
						width='400px'
					/>
				))}
			</Carousel>

			<h1>Products</h1>
			<Grid container spacing={3}>
				{products.map(product => (
					<Grid item md={4} key={product.name}>
						<Card>
							<NextLink href={`/product/${product.slug}`} passHref>
								<CardActionArea>
									<CardMedia
										component='img'
										image={product.image}
										title={product.name}></CardMedia>
								</CardActionArea>
							</NextLink>
							<CardContent>
								<Typography>{product.name}</Typography>
							</CardContent>

							<CardActions>
								<Typography>${product.price}</Typography>
								<Button
									size='small'
									color='primary'
									onClick={() => addToCartHandler(product)}>
									Add to cart
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	await dbConnection();
	const products = await Product.find({}).lean();
	return {
		props: {
			products: products.map(convertDocToObj),
		},
	};
}
