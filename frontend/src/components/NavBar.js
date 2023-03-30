import React, { useState, useEffect, useRef } from 'react';
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

	// Toggle Dropdown Menu
	const handleDropdown = () => {
		setDropDownOpen(!dropdownOpen)
	}

	// Navigate to last page on click of Back button
	const handleBack = () => {
		navigate(-1);
	}

	// Log user out on click
	const logOut = () => {
		authService.logout();
		navigate('/login');
	}

	// Close dropdown on click event outside dropdown menu
	// Source: https://www.robinwieruch.de/react-hook-detect-click-outside-component/
	const handleClickOutside = () => {
		setDropDownOpen(false)
	};

	const useOutsideClick = (callback) => {
		const ref = useRef();

		useEffect(() => {
			const handleClick = (event) => {
				if (ref.current && !ref.current.contains(event.target)) {
					callback();
				}
			};

			document.addEventListener('click', handleClick, true);

			return () => {
				document.removeEventListener('click', handleClick, true);
			};
		}, [ref]);


		return ref;
	};


	const ref = useOutsideClick(handleClickOutside);

	return (
		<nav className={navbarClassName}>
			{location.pathname !== '/login' &&
				<div className='navbar__content'>
					<button className='button--link navbar__icon-wrapper' type='button' aria-label='Back' onClick={handleBack}>
						<img src={back} className='navbar__icon' alt='Back Button' />
					</button>
					<div className='navbar__logo'>
						<Link to='/' className='navbar__logo-title logo'>
							Logger
						</Link>
					</div>

					<button className='button--link navbar__icon-wrapper' type='button' aria-label='dropdown menu' onClick={handleDropdown} value='toggle-dropdown'>
						<img src={dropdownOpen ? navIconClose : navIcon} className='navbar__icon' alt='menu icon' id='toggle-dropdown' />
					</button>
					<div className={dropdownClassName}>
						<div ref={ref} onClick={handleDropdown}>
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
							{
								authService.isAuthenticated() &&
								<div className='navbar__item'>
									<Link to='/' className='navbar__link button--link link' relative='path'>Dashboard</Link>
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
