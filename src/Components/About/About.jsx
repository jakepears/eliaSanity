/** @format */

import React, { useState, useEffect, useRef } from 'react';
import { client } from '../../sanityClient';
import transition from '../transition';
import './About.css';

const About = () => {
	const containerRef = useRef(null);
	const [time, setTime] = useState(getCurrentTime());
	const [aboutData, setAboutData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const query = '*[_type == "aboutPage"][0]';
			const result = await client.fetch(query);
			setAboutData(result);
		};

		fetchData();

		const intervalId = setInterval(() => {
			setTime(getCurrentTime());
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	function getCurrentTime() {
		const now = new Date();
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		const seconds = String(now.getSeconds()).padStart(2, '0');
		return `${hours} : ${minutes} : ${seconds}`;
	}

	if (!aboutData) return <div>Loading...</div>;

	return (
		<div
			className='about smooth-scroll'
			data-scroll-container
			ref={containerRef}
			id='scroll-container'>
			<section className='hero-img' data-scroll-section>
				<div className='hero-img-container'>
					<img src={aboutData.heroImage} alt='About Hero' />
				</div>
			</section>

			<section className='about-us' data-scroll-section>
				<div className='about-us-copy'>
					<div className='about-us-copy-p'>
						<span>{aboutData.aboutUsTitle}</span>
						<br />
						{aboutData.aboutUsDescription.map((paragraph, index) => (
							<React.Fragment key={index}>
								<p>{paragraph}</p>
								<br />
							</React.Fragment>
						))}
					</div>
					<div className='about-us-copy-p'>
						{aboutData.contactInfo.map((line, index) => (
							<span key={index}>{line}</span>
						))}
						<br />
						<span>
							<a href={`mailto:${aboutData.email}`}>{aboutData.email}</a>
						</span>
					</div>
				</div>
			</section>

			<section id='about-sticky-wrap' data-scroll-section>
				{aboutData.services.map((service, index) => (
					<div
						key={index}
						className={`about-sticky about-sticky-${index + 1}`}
						data-scroll
						data-scroll-sticky
						data-scroll-target='#about-sticky-wrap'>
						<div className='sticky-content'>
							<div className='sitcky-content-h1'>
								<h1 className='num'>{index + 1}</h1>
							</div>
							<div className='sitcky-content-h1'>
								<h1>{service.title}:</h1>
								<h1>{service.description}</h1>
							</div>
						</div>
					</div>
				))}
			</section>

			<section className='hero-img' data-scroll-section>
				<div className='hero-img-container'>
					<img src={aboutData.featureImage} alt='About Feature' />
				</div>
			</section>

			<section className='more-clients' data-scroll-section>
				<div className='more-clients-h1'>
					<h1>{aboutData.clientsTitle}</h1>
				</div>
				<div className='more-clients-logos'>
					{aboutData.clientLogos.map((logo, index) => (
						<div key={index} className='more-clients-logo'>
							<img src={logo} alt={`Client Logo ${index + 1}`} />
						</div>
					))}
				</div>
			</section>

			<section className='about-us office' data-scroll-section>
				<div className='hero-img-container'>
					<img src={aboutData.officeImage} alt='Office' />
				</div>
				<div className='about-us-copy'>
					<div className='about-us-copy-p'>
						{aboutData.contactInfo.map((line, index) => (
							<span key={index}>{line}</span>
						))}
						<br />
						<span>
							<a href={`mailto:${aboutData.email}`}>{aboutData.email}</a>
						</span>
					</div>
					<div className='about-us-copy-h1'>
						<h1 id='office'>{aboutData.workplaceTitle}</h1>
					</div>
				</div>
			</section>

			<section className='footer' data-scroll-section>
				<div className='footer-copy'>
					<div className='footer-copy-h1'>
						<a href='#'>
							<h1>{aboutData.footerTitle}</h1>
						</a>
					</div>
					<div className='footer-copy-text'>
						<p>{aboutData.footerDescription}</p>
						<br />
						<p>
							{aboutData.socialLinks.map((link, index) => (
								<React.Fragment key={index}>
									<a href={link.url}>{link.name}</a>
									{index < aboutData.socialLinks.length - 1 && ' • '}
								</React.Fragment>
							))}
						</p>
						<br />
						<p>
							{aboutData.location} {time}
						</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default transition(About);
