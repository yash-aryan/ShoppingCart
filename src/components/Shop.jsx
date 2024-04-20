import useProducts from '../utils/use-products';
import ProductCard from './ProductCard';

function Shop() {
	const { products, error, loading } = useProducts();

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Network error while loading data...</p>;

	return (
		<div>
			<h2>Shop</h2>
			<article>
				{products.map(product => {
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
