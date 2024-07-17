/** @format */

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Cursor from './Cursor';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ClientWrapper = ({ children }) => {
	// Change this line
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		const lenis = new Lenis();

		lenis.on('scroll', (e) => {
			console.log(e);
		});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<>
			{children}
			<Cursor />
		</>
	);
};

export default ClientWrapper;
