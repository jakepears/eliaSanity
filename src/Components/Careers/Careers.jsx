/** @format */

import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import { client } from '../../sanityClient';
import transition from '../transition';
import animationData from '../careers-lottie.json';
import './Careers.css';

const Careers = () => {
	const containerRef = useRef(null);
	const lottieContainerRef = useRef(null);
	const [careerData, setCareerData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const query = '*[_type == "careersPage"][0]';
			const result = await client.fetch(query);
			setCareerData(result);
		};

		fetchData();

		lottie.loadAnimation({
			container: lottieContainerRef.current,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: animationData,
		});
	}, []);

	if (!careerData) return <div>Loading...</div>;

	return (
		<section
			className='careers'
			data-scroll-container
			ref={containerRef}
			id='scroll-container'>
			<div className='careers-copy' data-scroll-section>
				<div className='careers-copy-p'>
					<span>{careerData.subtitle}</span>
				</div>
				<div className='careers-copy-h1'>
					<h1>{careerData.title}</h1>
				</div>
			</div>
			<div className='careers-lottie'>
				<div className='container' ref={lottieContainerRef}></div>
			</div>
			{careerData.openPositions && careerData.openPositions.length > 0 && (
				<div className='open-positions' data-scroll-section>
					<h2>{careerData.openPositionsTitle}</h2>
					{careerData.openPositions.map((position, index) => (
						<div key={index} className='position'>
							<h3>{position.title}</h3>
							<p>{position.description}</p>
							<a href={position.applyLink}>Apply Now</a>
						</div>
					))}
				</div>
			)}
		</section>
	);
};

export default transition(Careers);
