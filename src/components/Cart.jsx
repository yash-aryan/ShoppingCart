import { useOutletContext } from 'react-router-dom';

function Cart() {
	return (
		<div>
			<h2>Cart</h2>
			<CartChild />
		</div>
	);
}

function CartChild() {
	const { fetched, cart } = useOutletContext();

	if (cart.length === 0) return <p>Empty Cart!</p>;
	if (fetched.loading) return <p>Loading...</p>;
	if (fetched.error) return <p>Network error while loading data...</p>;

	const cartProducts = [];
	fetched.products.forEach(product => {
		const cartItemIndex = cart.findIndex(item => product.id === item.id);
		if (cartItemIndex < 0) return;

		cartProducts.push({
			id: cart[cartItemIndex].id,
			count: cart[cartItemIndex].count,
			price: product.price,
		});
	});

	const totalPrice = cartProducts
		.map(product => product.price)
		.reduce((acc, curr) => (acc += curr));

	return (
		<div>
			<p>{'Unique Items:' + cart.length}</p>
			<p>{'Total Price:' + totalPrice}</p>
		</div>
	);
}

export default Cart;
