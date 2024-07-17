/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../sanityClient';
import './Nav.css';

const Nav = () => {
	const [navData, setNavData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const query = '*[_type == "navigation"][0]';
			const result = await client.fetch(query);
			setNavData(result);
		};

		fetchData();
	}, []);

	if (!navData) return null; // Or a loading spinner

	return (
		<div className='nav'>
			<div className='logo'>
				<Link to='/'>{navData.logoText}</Link>
			</div>
			<div className='nav-items'>
				{navData.menuItems.map((item, index) => (
					<div className='nav-item' key={index}>
						<Link to={item.link}>• {item.label}</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default Nav;
