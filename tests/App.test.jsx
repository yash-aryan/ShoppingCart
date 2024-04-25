import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import useProducts from '../src/utils/use-products';
import mockProducts from './mock-products';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import routes from '../src/routes.jsx';

// Mock useProducts return value.
vi.mock('../src/utils/use-products');
const mockUseProducts = vi.mocked(useProducts);
mockUseProducts.mockImplementation(() => ({ products: mockProducts, error: null, loading: false }));

it('Loads shop page', async () => {
	const router = createMemoryRouter(routes, {
		initialEntries: ['/shop'],
		initialIndex: 0,
	});
	render(<RouterProvider router={router} />);
	await waitFor(() =>
		expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Shop')
	);

	expect(screen.getAllByRole('status')[0]).toHaveTextContent(0);
});

describe('Product Counter', () => {
	beforeEach(async () => {
		const router = createMemoryRouter(routes, {
			initialEntries: ['/shop'],
			initialIndex: 0,
		});
		render(<RouterProvider router={router} />);
		await waitFor(() =>
			expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Shop')
		);
	});

	it('increments on click', async () => {
		// Setup
		const user = userEvent.setup();
		const count = screen.getAllByRole('status')[0];
		const increment = screen.getAllByRole('button', { name: 'Add' })[0];

		// Test
		expect(count).toHaveTextContent(0);
		await user.click(increment);
		expect(count).toHaveTextContent(1);

		await user.click(screen.getByRole('link', { name: 'Cart' }));
		expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Cart');
		// await waitFor(() =>);
	});

	it('decrements on click', async () => {
		// Setup
		const user = userEvent.setup();
		const count = screen.getAllByRole('status')[1];
		const increment = screen.getAllByRole('button', { name: 'Add' })[1];
		const decrement = screen.getAllByRole('button', { name: 'Remove' })[1];

		// Test
		expect(count).toHaveTextContent(0);
		await user.click(decrement);
		expect(count).toHaveTextContent(0);

		await user.click(increment);
		expect(count).toHaveTextContent(1);
	});
});

describe('Cart', () => {
	beforeEach(async () => {
		const router = createMemoryRouter(routes, {
			initialEntries: ['/shop'],
			initialIndex: 0,
		});
		render(<RouterProvider router={router} />);
		await waitFor(() =>
			expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Shop')
		);
	});

	it('contains selected products', async () => {
		// Setup
		const user = userEvent.setup();
		const item1Increment = screen.getAllByRole('button', { name: 'Add' })[1];
		const item2Increment = screen.getAllByRole('button', { name: 'Add' })[2];

		// Test
		await user.click(item1Increment);
		await user.click(item1Increment);
		await user.click(item2Increment);
		await user.click(screen.getByRole('link', { name: 'Cart' }));

		expect(screen.getAllByRole('article').length).toBe(2);
		expect(screen.getAllByTestId('count').map(e => +e.textContent)).toMatchObject([2, 1]);
	});

	it('matches total price', async () => {
		const user = userEvent.setup();
		const item1Increment = screen.getAllByRole('button', { name: 'Add' })[0];
		const item1Price = +screen.getAllByTestId('price')[0].textContent;
		const item2Increment = screen.getAllByRole('button', { name: 'Add' })[1];
		const item2Price = +screen.getAllByTestId('price')[1].textContent;

		// Test
		await user.click(item1Increment);
		await user.click(item1Increment);
		await user.click(item2Increment);
		await user.click(screen.getByRole('link', { name: 'Cart' }));

		const expectedTotal = Math.round((item1Price + item1Price + item2Price) * 100) / 100;

		expect(screen.getAllByRole('article').length).toBe(2);
		expect(+screen.getByTestId('totalPrice').textContent).toBe(expectedTotal);
	});
});
