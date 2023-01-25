import styled from 'styled-components';
import { Props } from './types';
import timelineData from '../../../data/timelineData.json';
import { useEffect } from 'react';
import { TL } from './js/timeline.js';

const Dummy = (props: Props) => {
	useEffect(() => {
		new TL.Timeline(
			'timeline-embed',
			{
				title: {
					...timelineData.title,
					media: {
						...timelineData.title.media,
						url: require('../../../data/media/'.concat(
							timelineData.title.media.url
						))
					}
				},
				events: timelineData.events.map(e => {
					let parsed: any = { ...e };

					if (e.media)
						parsed = {
							...parsed,
							media: {
								alt: e.media.alt,
								thumbnail: require('../../../data/media/'.concat(
									e.media.thumbnail
								)),
								url: require('../../../data/media/'.concat(e.media.url))
							}
						};

					return parsed;
				}),
				eras: timelineData.eras
			},
			{
				initial_zoom: 1,
				height: 700,
				hash_bookmark: true,
				font: 'ubuntu',
				marker_height_min: 30,
				use_bc: true,
				duration: 500,
				track_events: ['nav_next', 'nav_previous'],
				optimal_tick_width: 120
			}
		);
	}, []);
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
