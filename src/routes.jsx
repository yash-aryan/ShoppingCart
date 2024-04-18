import App from './App';
import Cart from './components/Cart';
import Home from './components/Home';
import Shop from './components/Shop';

const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'shop',
				element: <Shop />,
			},
			{
				path: 'cart',
				element: <Cart />,
			},
		],
	},
];

export default routes;
