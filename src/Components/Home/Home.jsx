/** @format */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { client } from '../../sanityClient';
import transition from '../transition';
import './Home.css';

const Home = () => {
	const containerRef = useRef(null);
	const [time, setTime] = useState(getCurrentTime());
	const [homeData, setHomeData] = useState(null);
	const [projects, setProjects] = useState([]);
	const [clients, setClients] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				// Fetch home page data
				const homeQuery = '*[_type == "homePage"][0]';
				const homeResult = await client.fetch(homeQuery);
				setHomeData(homeResult);

				// Fetch featured projects
				const projectsQuery =
					'*[_type == "project"][0...4] | order(_createdAt desc)';
				const projectsResult = await client.fetch(projectsQuery);
				setProjects(projectsResult);

				// Fetch clients
				const clientsQuery = '*[_type == "client"] | order(_createdAt desc)';
				const clientsResult = await client.fetch(clientsQuery);
				setClients(clientsResult);
			} catch (err) {
				console.error('Error fetching data:', err);
				setError('Failed to load content. Please try again later.');
			} finally {
				setIsLoading(false);
			}
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

	if (isLoading) {
		return <div className='loading'>Loading...</div>;
	}

	if (error) {
		return <div className='error'>{error}</div>;
	}

	if (!homeData) {
		return (
			<div className='error'>No content available. Please try again later.</div>
		);
	}

	return (
		<div
			className='home'
			data-scroll-container
			ref={containerRef}
			id='scroll-container'>
			<section className='hero-img' data-scroll-section>
				<div className='hero-img-container'>
					<img src={homeData.bannerImage} alt='Banner' />
				</div>
				<div className='hero-img-copy'>
					<div className='hero-img-copy-h1'>
						<h1>{homeData.heroTitle}</h1>
					</div>
				</div>
			</section>
			<section className='projects' data-scroll-section>
				<div className='projects-copy'>
					<div className='projects-copy-ws'></div>
					<div className='projects-copy-h1'>
						<h1>{homeData.projectsIntro}</h1>
					</div>
				</div>
				<div className='projects-list'>
					{projects.map((project, index) => (
						<Link to={`/project/${project.slug.current}`} key={project._id}>
							<div className='project'>
								<div
									className={`project-img project-img-${index + 1}`}
									style={{
										backgroundImage: `url(${project.mainImage})`,
									}}></div>
								<div className='project-name'>
									<p>{project.title} &#8599;</p>
								</div>
								<div className='project-category'>
									<p>{project.category}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>
			<section className='article' data-scroll-section>
				<div className='article-container'>
					<div className='article-container-copy'>
						<h1>{homeData.articleTitle}</h1>
						<a href={homeData.ctaLink}>{homeData.ctaText} &#8599;</a>
					</div>
				</div>
			</section>
			<section className='services' data-scroll-section>
				<div className='services-copy-p'>
					<span>{homeData.servicesSubtitle}</span>
				</div>
				<div className='services-copy-h1'>
					<h1>{homeData.servicesTitle}</h1>
				</div>
			</section>
			<section className='feature-img' data-scroll-section>
				<div className='feature-img-container'>
					<img src={homeData.featureImage} alt='Feature' />
				</div>
			</section>
			<section className='logos' data-scroll-section>
				<Marquee>
					<div className='client-logos'>
						{clients.map((client) => (
							<div className='client-logo' key={client._id}>
								<img src={client.logo} alt={client.name} />
							</div>
						))}
					</div>
				</Marquee>
			</section>
			<section className='clients' data-scroll-section>
				<div className='client-copy'>
					<div className='client-copy-p'>
						<p>{homeData.clientsTitle}</p>
						<br />
						{homeData.clientsDescription.map((paragraph, index) => (
							<React.Fragment key={index}>
								<p>{paragraph}</p>
								<br />
							</React.Fragment>
						))}
					</div>
					<div className='client-copy-p'>
						{homeData.clientsAdditionalInfo.map((paragraph, index) => (
							<React.Fragment key={index}>
								<p>{paragraph}</p>
								<br />
							</React.Fragment>
						))}
					</div>
				</div>
			</section>
			<section className='footer' data-scroll-section>
				<div className='footer-copy'>
					<div className='footer-copy-h1'>
						<a href='#'>
							<h1>{homeData.footerTitle}</h1>
						</a>
					</div>
					<div className='footer-copy-text'>
						<p>{homeData.footerDescription}</p>
						<br />
						<p>
							<a href={homeData.twitterLink}>Twitter</a> •
							<a href={homeData.instagramLink}>Instagram</a> •
							<a href={homeData.linkedinLink}>LinkedIn</a>
						</p>
						<br />
						<p>
							{homeData.location} {time}
						</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default transition(Home);
