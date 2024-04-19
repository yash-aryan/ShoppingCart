import useProducts from '../utils/use-products';

function Shop() {
	const { products, error, loading } = useProducts();
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Network error while loading data...</p>;

	return (
		<div>
			<h2>Shop</h2>
			<p>{products[0].title}</p>
		</div>
	);
}

export default Shop;
