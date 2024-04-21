import { useOutletContext } from 'react-router-dom';
import ProductCard from './ProductCard';

function Shop() {
	const { fetched } = useOutletContext();

	if (fetched.loading) return <p>Loading...</p>;
	if (fetched.error) return <p>Network error while loading data...</p>;

	return (
		<div>
			<h2>Shop</h2>
			<article>
				{fetched.products.map(product => {
					return (
						<ProductCard
							key={product.id}
							id={product.id}
							title={product.title}
							price={product.price}
						/>
					);
				})}
			</article>
		</div>
	);
}

export default Shop;
