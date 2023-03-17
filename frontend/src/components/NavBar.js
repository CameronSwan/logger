import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
	const navigate = useNavigate();

	return (
		<nav className='navbar'>
			<div className='navbar__logo'>
				<Link to='/' className='navbar__logo-title logo'>
					<strong>Logger</strong>
				</Link>
			</div>
		</nav>
	);
};

export default NavBar;
