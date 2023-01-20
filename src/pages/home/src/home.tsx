import styled from 'styled-components';
import Timeline from 'timelinejs-react';
import slides from '../../../data/slides.json';
import { DummyProps } from './types';

const Dummy = (props: DummyProps) => {
	const events: Slide[] = slides.slides;
	const title: TitleSlide = slides.title;
	const options: TimelineOptions = {
		language: 'it'
	};
	return (
		<div className={props.className}>
			<Timeline
				target={<div className='timeline' />}
				events={events}
				title={title}
				options={options}
			/>
		</div>
	);
};

export const Home = styled(Dummy)`
	width: 95%;
	height: 500px;
	border: 2px solid black;
	border-radius: 10px;
	overflow: hidden;
`;
