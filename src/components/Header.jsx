import { Link } from 'react-router-dom';

function Header() {
	return (
		<header>
			<h1>App</h1>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='shop'>Shop</Link>
				</li>
				<li>
					<Link to='cart'>Cart</Link>
				</li>
			</ul>
		</header>
	);
}

export default Header;
