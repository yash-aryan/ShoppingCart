import { useEffect, useState } from 'react';

function useProducts() {
	const [products, setProducts] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchProducts()
			.then(resolve => setProducts(resolve))
			.catch(error => setError(error))
			.finally(() => setLoading(false));

		async function fetchProducts() {
			const response = await fetch('https://fakestoreapi.com/products', { mode: 'cors' });
			if (response.status >= 400) throw new Error('server error');
			return await response.json();
		}
	}, []);

	return { products, error, loading };
}

export default useProducts;
