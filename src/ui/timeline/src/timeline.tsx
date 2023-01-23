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
		default_bg_color: { r: 150, g: 150, b: 0 },
		marker_height_min: 30,
		use_bc: true,
		duration: 2000,
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
	height: 600px;
	border: 2px solid black;
	border-radius: 10px;
	overflow: hidden;

	#timeline-embed {
		width: 100%;
		height: 600px;
	}
`;
