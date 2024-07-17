/** @format */

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../sanityClient';
import transition from '../transition';

const Projects = () => {
	const [projects, setProjects] = useState([]);
	const [intro, setIntro] = useState('');
	const [contactInfo, setContactInfo] = useState({});
	const containerRef = useRef(null);
	const [time, setTime] = useState(getCurrentTime());

	useEffect(() => {
		const fetchData = async () => {
			// Fetch projects
			const projectsQuery = '*[_type == "project"] | order(_createdAt desc)';
			const projectsData = await client.fetch(projectsQuery);
			setProjects(projectsData);

			// Fetch intro text
			const introQuery = '*[_type == "projectsPage"][0].introText';
			const introData = await client.fetch(introQuery);
			setIntro(introData);

			// Fetch contact info
			const contactQuery = '*[_type == "contactInfo"][0]';
			const contactData = await client.fetch(contactQuery);
			setContactInfo(contactData);
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

	return (
		<div
			className='projects-container'
			data-scroll-container
			ref={containerRef}
			id='scroll-container'>
			<section className='projects' data-scroll-section>
				<div className='projects-copy'>
					<div className='projects-copy-ws'></div>
					<div className='projects-copy-h1'>
						<h1>{intro}</h1>
					</div>
				</div>

				<div className='projects-list'>
					{projects.map((project, index) => (
						<Link to={`/project/${project.slug.current}`} key={project._id}>
							<div className='project'>
								<div
									className={`project-img project-img-${
										(index % 4) + 1
									}`}></div>
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
			<section className='footer' data-scroll-section>
				<div className='footer-copy'>
					<div className='footer-copy-h1'>
						<a href='#'>
							<h1>Contact</h1>
						</a>
					</div>
					<div className='footer-copy-text'>
						<p>{contactInfo.studioDescription}</p>
						<br />
						<p>
							<a href={contactInfo.twitterUrl}>Twitter</a> •{' '}
							<a href={contactInfo.instagramUrl}>Instagram</a> •{' '}
							<a href={contactInfo.linkedinUrl}>LinkedIn</a>
						</p>
						<br />
						<p>
							{contactInfo.location} {time}
						</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default transition(Projects);
