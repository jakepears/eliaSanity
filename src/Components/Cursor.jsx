/** @format */

'use client';

import { useEffect, useRef } from 'react';
import MouseFollower from 'mouse-follower';
import gsap from 'gsap';
import 'mouse-follower/src/scss/index.scss';

const CursorFollower = () => {
	const cursorRef = useRef(null);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			MouseFollower.registerGSAP(gsap);

			cursorRef.current = new MouseFollower({
				container: document.body,
				speed: 0.5,
				dataAttr: 'cursor',
				iconSvgSrc: '/images/icons/arrow-right.svg',
				iconSvgClassName: 'arrow-right',
				iconSvgNamePrefix: '-',
			});

			// Expose the cursor instance globally
			window.mfCursor = cursorRef.current;
		}

		return () => {
			if (cursorRef.current) {
				cursorRef.current.destroy();
			}
		};
	}, []);

	return null;
};

export default CursorFollower;
