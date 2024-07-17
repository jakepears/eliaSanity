/** @format */

import './MenuButton.css';
import PropTypes from 'prop-types';

// Add prop validation

const MenuButton = ({ onClick, isOpen }) => {
	return (
		<button
			className={`menu-button ${isOpen ? 'open' : ''}`}
			onClick={onClick}
			aria-label='Toggle menu'>
			<span className='menu-button-line'></span>
		</button>
	);
};
MenuButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
};
export default MenuButton;
