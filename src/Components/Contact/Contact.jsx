/** @format */

import React, { useRef, useState, useEffect } from 'react';
import { client } from '../../sanityClient';
import transition from '../transition';
import './Contact.css';

const Contact = () => {
	const containerRef = useRef(null);
	const [contactData, setContactData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const query = '*[_type == "contactPage"][0]';
			const result = await client.fetch(query);
			setContactData(result);
		};

		fetchData();
	}, []);

	if (!contactData) return <div>Loading...</div>;

	return (
		<section
			className='contact'
			data-scroll-container
			ref={containerRef}
			id='scroll-container'>
			<div className='contact-copy' data-scroll-section>
				<span>{contactData.inquiriesTitle}</span>
				<br />
				<br />
				<p>{contactData.inquiriesDescription}</p>
				<br />
				<a href={`mailto:${contactData.email}`}>{contactData.email}</a>
				<br />
				<br />
				<br />
				<p>{contactData.openingTimes}</p>
				<br />
				<br />
				<span>{contactData.networksTitle}</span>
				<br />
				<br />
				{contactData.socialNetworks.map((network, index) => (
					<React.Fragment key={index}>
						<a href={network.url}>{network.name}</a>
						<br />
					</React.Fragment>
				))}
				<br />
				<br />
				<span>{contactData.workplaceTitle}</span>
				<br />
				<br />
				{contactData.address.map((line, index) => (
					<p key={index}>{line}</p>
				))}
				<br />
				<span id='copyright'>{contactData.copyrightText}</span>
			</div>
		</section>
	);
};

export default transition(Contact);
