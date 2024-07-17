/** @format */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { client } from '../../sanityClient';
import transition from '../transition';
import './Project.css';

const Project = () => {
	const { slug } = useParams();
	const [project, setProject] = useState(null);
	const [relatedProjects, setRelatedProjects] = useState([]);
	const [contactInfo, setContactInfo] = useState({});
	const containerRef = useRef(null);
	const [time, setTime] = useState(getCurrentTime());

	useEffect(() => {
		const fetchData = async () => {
			// Fetch project data
			const projectQuery = `*[_type == "project" && slug.current == "${slug}"][0]`;
			const projectData = await client.fetch(projectQuery);
			setProject(projectData);

			// Fetch related projects
			const relatedProjectsQuery = `*[_type == "project" && slug.current != "${slug}"][0...2]`;
			const relatedProjectsData = await client.fetch(relatedProjectsQuery);
			setRelatedProjects(relatedProjectsData);

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
	}, [slug]);

	function getCurrentTime() {
		const now = new Date();
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		const seconds = String(now.getSeconds()).padStart(2, '0');
		return `${hours} : ${minutes} : ${seconds}`;
	}

	if (!project) return <div>Loading...</div>;

	return (
		<div
			className='project-wrapper'
			data-scroll-container
			ref={containerRef}
			id='scroll-container'>
			<section className='project-type' data-scroll-section>
				<div className='project-type-copy'>
					<span>{project.title}</span>
					<span>{project.category}</span>
					<span>{project.company}</span>
					<span>{project.year}</span>
				</div>
			</section>

			<section className='project-hero' data-scroll-section>
				<div className='project-hero-img'>
					<img src={project.mainImage} alt={project.title} />
				</div>
			</section>

			<section className='project-overview' data-scroll-section>
				<div className='project-overview-copy'>
					<div className='project-overview-copy-p'>
						{project.overview.map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</div>
					<div className='project-overview-ws'></div>
					<div className='project-overview-copy-h1'>
						<h1>{project.overviewTitle}</h1>
					</div>
				</div>
			</section>

			{project.images.map((image, index) => (
				<section key={index} className='project-img-full' data-scroll-section>
					<div className='project-img-full-wrapper'>
						<img src={image} alt={`Project image ${index + 1}`} />
					</div>
				</section>
			))}

			<section className='project-info' data-scroll-section>
				<div className='project-info-copy'>
					{project.details.map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
				</div>
				<div className='project-info-img'>
					<img src={project.detailImage} alt='Project detail' />
				</div>
			</section>

			<section className='project-overview' data-scroll-section>
				<div className='project-overview-copy'>
					<div className='project-overview-copy-p'>
						<p>{project.conclusion}</p>
					</div>
					<div className='project-overview-ws'></div>
					<div className='project-overview-copy-h1'>
						<h1>
							<a href={project.projectUrl}>
								<u>{project.projectUrl}</u>
							</a>
						</h1>
					</div>
				</div>
			</section>

			<section className='projects discover' data-scroll-section>
				<div className='projects-copy'>
					<div className='projects-copy-h1'>
						<h1>Find more projects</h1>
					</div>
					<div className='projects-copy-ws'></div>
				</div>
				<div className='projects-list'>
					{relatedProjects.map((relatedProject, index) => (
						<Link
							to={`/project/${relatedProject.slug.current}`}
							key={relatedProject._id}>
							<div className='project'>
								<div className={`project-img project-img-${index + 3}`}></div>
								<div className='project-name'>
									<p>{relatedProject.title} &#8599;</p>
								</div>
								<div className='project-category'>
									<p>{relatedProject.category}</p>
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

export default transition(Project);
