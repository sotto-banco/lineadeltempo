import styled from 'styled-components';
import { Props } from './types';
import slides from '../../../data/slides.json';
import { useEffect } from 'react';
import { TL } from './js/timeline.js';

const Dummy = (props: Props) => {
	const events = slides.slides;
	const title = slides.title;
	const options = {
		initial_zoom: 1,
		height: 700,
		hash_bookmark: true,
		font: 'ubuntu',
		marker_height_min: 30,
		use_bc: true,
		duration: 500,
		track_events: ['nav_next', 'nav_previous']
	};

	useEffect(() => {
		new TL.Timeline('timeline-embed', { events }, options);
	}, [events, options]);
	return (
		<div className={props.className}>
			<div id='timeline-embed' />
		</div>
	);
};

export const Timeline = styled(Dummy)`
	width: 95%;
	height: 80%;
	border: 2px solid black;
	border-radius: 10px;
	overflow: hidden;
	display: flex;
	align-items: center;
	margin-top: 10px;

	#timeline-embed {
		width: 100%;
		height: 95%;
	}
`;
