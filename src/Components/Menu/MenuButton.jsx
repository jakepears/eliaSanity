/** @format */

import PropTypes from 'prop-types';
import './MenuButton.css';

const MenuButton = ({ onClick, isOpen }) => {
	return (
		<button
			className={`menu-button ${isOpen ? 'open' : ''}`}
			onClick={onClick}
			aria-label='Toggle menu'>
			<div className='menu-button-line'></div>
		</button>
	);
};

MenuButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
};

export default MenuButton;
