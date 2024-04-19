import { it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useProducts from '../src/utils/use-products';

const { result } = renderHook(() => useProducts());
const { products, error, loading } = result.current;
it('Happy Path', () => {
	waitFor(() => {
		expect(products === null).toBe(false);
		expect(Array.isArray(products)).toBe(true);
		products.forEach(product => {
			expect(product).toMatchObject({
				id: expect.any(Number),
				title: expect.any(String),
				price: expect.any(Number),
				image: expect.any(String),
				rating: expect.objectContaining({
					rate: expect.any(Number),
					count: expect.any(Number),
				}),
			});
		});
		expect(loading).toBe(false);
		expect(error === null).toBe(true);
	});
});
