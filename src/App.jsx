/** @format */

import { useLayoutEffect, useState, lazy, Suspense } from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import ClientWrapper from './Components/ClientWrapper';
import Menu from './Components/Menu/Menu';
import MenuButton from './Components/Menu/MenuButton';

const Home = lazy(() => import('./Components/Home/Home'));
const About = lazy(() => import('./Components/About/About'));
const Projects = lazy(() => import('./Components/Projects/Projects'));
const Project = lazy(() => import('./Components/Project/Project'));
const Careers = lazy(() => import('./Components/Careers/Careers'));
const Contact = lazy(() => import('./Components/Contact/Contact'));

function App() {
	const location = useLocation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useLayoutEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
			setIsLoading(false);
		}, 1000);
	}, [location.pathname]);

	if (isLoading) {
		return <div className='loading-screen'>Loading...</div>;
	}

	return (
		<ClientWrapper>
			<MenuButton onClick={toggleMenu} isOpen={isMenuOpen} />
			<Menu isOpen={isMenuOpen} onToggle={toggleMenu} />
			<AnimatePresence mode='wait'>
				<Suspense fallback={<div>Loading...</div>}>
					<Routes location={location} key={location.pathname}>
						<Route index element={<Home />} />
						<Route path='/projects' element={<Projects />} />
						<Route path='/about' element={<About />} />
						<Route path='/careers' element={<Careers />} />
						<Route path='/contact' element={<Contact />} />
						<Route path='/sample-project-page' element={<Project />} />
					</Routes>
				</Suspense>
			</AnimatePresence>
		</ClientWrapper>
	);
}

export default App;
