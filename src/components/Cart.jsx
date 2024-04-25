import PropTypes from 'prop-types';
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

	const cartItems = [];

	// Get price of each products in cart.
	fetched.products.forEach(product => {
		const cartItemIndex = cart.findIndex(item => product.id === item.id);
		if (cartItemIndex < 0) return;

		cartItems.push({
			id: cart[cartItemIndex].id,
			title: product.title,
			count: cart[cartItemIndex].count,
			price: product.price,
		});
	});

	const totalPrice = cartItems.reduce((total, product) => {
		if (product.count === 1) return (total += product.price);
		return (total += product.price * product.count);
	}, 0);

	return (
		<div>
			<section>
				{cartItems.map(data => {
					return (
						<CartItemCard
							key={data.id}
							title={data.title}
							count={data.count}
							price={data.price}
						/>
					);
				})}
			</section>
			<section>
				<h3>Total Price</h3>
				<span data-testid='totalPrice'>{Math.round(totalPrice * 100) / 100}</span>
			</section>
		</div>
	);
}

function CartItemCard({ title, count, price }) {
	return (
		<article>
			<h3>{title}</h3>
			<div>
				<span>Quantity</span>
				<span data-testid='count'>{count}</span>
			</div>
			<div>
				<span>Price</span>
				<span>{price}</span>
			</div>
		</article>
	);
}
CartItemCard.propTypes = {
	title: PropTypes.string,
	count: PropTypes.number,
	price: PropTypes.number,
};

export default Cart;
