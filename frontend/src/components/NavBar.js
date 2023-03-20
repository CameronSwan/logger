import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
	const location = useLocation();
	let className = location.pathname === '/login' ? 'navbar--hidden' : 'navbar';

	return (
		<nav className={className}>
			{location.pathname !== '/login' &&
				<div className='navbar__logo'>
					<Link to='/' className='navbar__logo-title logo'>
						Logger
					</Link>
				</div>}
		</nav>
	);
};

export default NavBar;
