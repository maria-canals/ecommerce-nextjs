import { useEffect } from 'react';

import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';

import store from '../store/store';
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);
	return (
		<SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</SnackbarProvider>
	);
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
