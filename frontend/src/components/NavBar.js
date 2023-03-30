import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import navIcon from '../img/icons/nav-icon.svg';
import navIconClose from '../img/icons/nav-icon-close.svg';
import back from '../img/icons/back.svg';

const NavBar = () => {
	const [dropdownOpen, setDropDownOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const navbarClassName = location.pathname === '/login' ? 'navbar--hidden' : 'navbar';
	const dropdownClassName = dropdownOpen ? 'navbar__dropdown' : 'navbar__dropdown navbar__dropdown--hidden'

	const handleDropdown = () => {
		setDropDownOpen(!dropdownOpen)

	}

	const logOut = () => {
		authService.logout();
		navigate('/login');
	}

	return (
		<nav className={navbarClassName}>
			{location.pathname !== '/login' &&
				<div className='navbar__content'>
					<div>back</div>
					<div className='navbar__logo'>
						<Link to='/' className='navbar__logo-title logo'>
							Logger
						</Link>
					</div>

					<button className='button--link link' type='button' aria-label='dropdown menu' onClick={handleDropdown}><img src={dropdownOpen ? navIconClose : navIcon} className=' navbar__icon' alt='menu icon' /></button>
					<div className={dropdownClassName}>
						<div onClick={handleDropdown}>
							{
								!authService.isAuthenticated() && 
								<div className='navbar__item'>
									<Link to='/login' className='navbar__link button--link link' relative='path'>Log in</Link>
								</div>
							}
							{
								!authService.isAuthenticated() && 
								<div className='navbar__item'>
									<Link to='/register' className='navbar__link button--link link' relative='path'>Register</Link>
								</div>
							}
							<div className='navbar__item'>
								<Link to='/about' className='navbar__link button--link link' relative='path'>About</Link>
							</div>
							{
								authService.isAuthenticated() &&
								<div className='navbar__item'>
									<button className='navbar__link button--link link' onClick={logOut}>Sign Out</button>
								</div>
							}
						</div>
					</div>
				</div>}
		</nav>
	);
};

export default NavBar;
