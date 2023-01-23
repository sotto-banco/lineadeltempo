import { useEffect } from 'react';
import styled from 'styled-components';
import slides from '../../../data/slides.json';
import { Header } from '../../../ui/header';
import { DummyProps } from './types';
const tl = require('../../../test/timeline3/js/timeline.js');

const Dummy = (props: DummyProps) => {
	const events = slides.slides;
	const title = slides.title;
	const options = {
		language: 'it',
		height: 20,
		menubar_height: 500,
		scale_factor: 100,
		duration: 5000
	};

	useEffect(() => {
		new tl.TL.Timeline(
			'timeline-embed',
			{ events },
			{
				initial_zoom: 1,
				height: 700,
				hash_bookmark: true,
				default_bg_color: { r: 150, g: 150, b: 0 },
				marker_height_min: 30,
				use_bc: true,
				duration: 2000,
				track_events: ['nav_next', 'nav_previous']
			}
		);
	}, []);

	return (
		<div className={props.className}>
			<Header
				label='sotto banco'
				selected='/lineadeltempo'
			/>
			<h2 className='pageTitle'>Linea del tempo</h2>
			<div className='timeline'>
				{/* <Timeline
					target={<div className='timeline' />}
					events={events}
					title={title}
					options={options}
				/> */}
				<div
					id='timeline-embed'
					style={{ width: '100%', height: '700px' }}
				></div>
			</div>
		</div>
	);
};

export const Home = styled(Dummy)`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	.timeline {
		width: 95%;
		height: 700px;
		border: 2px solid black;
		border-radius: 10px;
		overflow: hidden;
	}

	.pageTitle {
		width: 100%;
		text-align: center;
		cursor: default;
		user-select: none;
	}
`;
