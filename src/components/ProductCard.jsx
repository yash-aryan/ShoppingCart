import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';

function ProductCard({ id, title, price }) {
	const { cart, addProduct, removeProduct } = useOutletContext();
	const product = cart.find(e => e.id === id) ?? { id, count: 0 };

	return (
		<article>
			<h3 aria-label='Product Name'>{title}</h3>
			<span data-testid='price'>{price}</span>
			<Counter count={product.count} onClickAdd={onClickAdd} onClickRemove={onClickRemove} />
		</article>
	);

	function onClickAdd() {
		addProduct(id);
	}

	function onClickRemove() {
		removeProduct(id);
	}
}
ProductCard.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	price: PropTypes.number,
};

function Counter({ count, onClickAdd, onClickRemove }) {
	return (
		<div>
			<button type='button' onClick={onClickAdd}>
				Add
			</button>
			<span role='status' aria-live='polite'>
				{count}
			</span>
			<button type='button' onClick={onClickRemove} disabled={count ? '' : 'disabled'}>
				Remove
			</button>
		</div>
	);
}
Counter.propTypes = {
	count: PropTypes.number,
	onClickAdd: PropTypes.func,
	onClickRemove: PropTypes.func,
};

export default ProductCard;
