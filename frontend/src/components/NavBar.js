import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import navIcon from '../img/icons/nav-icon.svg';

const NavBar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const logOut = () => {
		authService.signout();
		navigate('/login');
	}

	let className = location.pathname === '/login' ? 'navbar--hidden' : 'navbar';

	return (
		<nav className={className}>
			{location.pathname !== '/login' &&
				<div className='navbar__content'>
					<div>back</div>
					<div className='navbar__logo'>
						<Link to='/' className='navbar__logo-title logo'>
							Logger
						</Link>
					</div>

					<button className='button--link link' tyoe='button' aria-label='menu'><img src={navIcon} /></button>
					{/* <div className='navbar__dropdown'></div> */}
				</div>}
		</nav>
	);
};

export default NavBar;
