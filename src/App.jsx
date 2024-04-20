import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
	const [cart, setCart] = useState([]);

	return (
		<div className=''>
			<Header />
			<Outlet context={{ cart, addProduct, removeProduct }} />
		</div>
	);

	function addProduct(id) {
		const cartCopy = [...cart];
		const productIndex = cartCopy.findIndex(product => product.id === id);

		if (productIndex < 0) {
			const product = { id, count: 1 };
			cartCopy.push(product);
		} else {
			const product = cartCopy[productIndex];
			cartCopy[productIndex] = { ...cartCopy[productIndex], count: product.count + 1 };
		}

		setCart(cartCopy);
	}

	function removeProduct(id) {
		const cartCopy = [...cart];
		const productIndex = cartCopy.findIndex(product => product.id === id);
		const product = cartCopy[productIndex];

		if (product.count === 1) cartCopy.splice(productIndex, 1);
		else cartCopy[productIndex] = { ...product, count: product.count - 1 };

		setCart(cartCopy);
	}
}

export default App;
