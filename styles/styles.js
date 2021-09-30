import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	navbar: {
		backgroundColor: '#dbd7d7',
		'& a': {
			color: '#515252',
			marginLeft: 10,
		},
	},
	brand: {
		height: '70px',
	},
	grow: {
		flexGrow: 1,
	},
	main: {
		minHeight: '80vh',
	},
	footer: {
		textAlign: 'center',
		marginTop: 25,
		marginBottom: 25,
		fontSize: 15,
	},
	section: {
		marginTop: 10,
		marginBottom: 10,
	},
	form: {
		maxWidth: 800,
		margin: '0 auto',
	},
	carousel: {
		margin: '0 auto',
		marginTop: '65px',
		maxWidth: '1300px',
	},
});

export default useStyles;
