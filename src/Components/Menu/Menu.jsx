/** @format */

import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { client, urlFor } from '../../sanityClient';
import PropTypes from 'prop-types';

import './Menu.css';

const Menu = ({ isOpen, onToggle }) => {
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const [menuData, setMenuData] = useState(null);
	const containerRef = useRef(null);
	const previewContainerRef = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await client.fetch('*[_type == "menu"][0]');
				setMenuData(result);
			} catch (error) {
				console.error('Error fetching menu data:', error);
			}
		};

		fetchData();
	}, []);

	useGSAP(
		() => {
			if (menuData) {
				gsap.set('.menu-link-item-holder', { y: 325 });

				const menuAnimation = gsap.timeline({ paused: true }).fromTo(
					'.menu',
					{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
					{
						clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
						duration: 1.25,
						ease: 'power4.inOut',
					}
				);

				const menuLinksAnimation = gsap
					.timeline({ paused: true })
					.to('.menu-link-item-holder', {
						y: 0,
						duration: 1.25,
						stagger: 0.325,
						ease: 'power4.inOut',
						delay: 0.525,
					});

				if (isOpen) {
					menuAnimation.play();
					menuLinksAnimation.play();
				} else {
					menuAnimation.reverse();
					menuLinksAnimation.reverse();
				}
			}
		},
		{ scope: containerRef, dependencies: [isOpen, menuData] }
	);

	const handleMouseOver = (index) => {
		setHoveredIndex(index);

		gsap.to(`.menu-link-item:nth-child(${index + 1}) .link-text`, {
			duration: 0.5,
			y: -10,
			scale: 1.1,
			ease: 'power2.out',
		});

		if (previewContainerRef.current && menuData) {
			const imgContainer = document.createElement('div');
			imgContainer.className = 'bind-new-img';
			const img = document.createElement('img');
			img.src = urlFor(menuData.menuLinks[index].previewImage).url();
			img.alt = '';
			imgContainer.appendChild(img);
			previewContainerRef.current.appendChild(imgContainer);

			gsap.fromTo(
				imgContainer,
				{
					top: '100%',
					left: '50%',
					rotation: -45,
				},
				{
					top: '0%',
					left: '0%',
					rotation: 0,
					duration: 1.25,
					ease: 'power4.out',
					onComplete: () => {
						gsap.delayedCall(2, () => {
							const allImgContainers =
								previewContainerRef.current?.querySelectorAll('.bind-new-img');
							if (allImgContainers && allImgContainers.length > 1) {
								Array.from(allImgContainers)
									.slice(0, -1)
									.forEach((container) => {
										gsap.to(container, {
											opacity: 0,
											duration: 0.5,
											onComplete: () => container.remove(),
										});
									});
							}
						});
					},
				}
			);
		}
	};

	const handleMouseOut = (index) => {
		setHoveredIndex(null);

		gsap.to(`.menu-link-item:nth-child(${index + 1}) .link-text`, {
			duration: 0.5,
			y: 0,
			scale: 1,
			ease: 'power2.out',
		});
	};

	if (!menuData) return null; // Or a loading spinner

	return (
		<div ref={containerRef} className='menu-container'>
			<div className='menu'>
				<div ref={previewContainerRef} className='preview-container'>
					<img
						src={urlFor(menuData.defaultPreviewImage).url()}
						alt=''
						className='default-preview'
					/>
					<div className='preview-text'>
						{hoveredIndex !== null && (
							<p>{menuData.menuLinks[hoveredIndex].text}</p>
						)}
					</div>
				</div>
				<div className='menu-content'>
					<div className='menu-links'>
						{menuData.menuLinks.map((link, index) => (
							<div
								key={index}
								className='menu-link-item'
								onClick={onToggle}
								onMouseEnter={() => handleMouseOver(index)}
								onMouseLeave={() => handleMouseOut(index)}>
								<div className='menu-link-item-holder'>
									<Link to={link.path} className='menu-link'>
										<span className='link-text'>{link.label}</span>
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

Menu.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onToggle: PropTypes.func.isRequired,
};
export default Menu;
