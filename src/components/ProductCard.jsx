import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';

function ProductCard({ id, title, price }) {
	const { cart, addProduct, removeProduct } = useOutletContext();
	const product = cart.find(e => e.id === id) ?? { id, count: 0};

	return (
		<article>
			<h3>{title}</h3>
			<span>{price}</span>
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
			<span>{count}</span>
			<button type='button' onClick={onClickRemove}>
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
