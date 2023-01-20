import styled from 'styled-components';
import Timeline from 'timelinejs-react';
import slides from '../../../data/slides.json';
import { Header } from '../../../ui/header';
import { DummyProps } from './types';

const Dummy = (props: DummyProps) => {
	const events: Slide[] = slides.slides;
	const title: TitleSlide = slides.title;
	const options: TimelineOptions = {
		language: 'it',
		height: 20,
		menubar_height: 500,
		scale_factor: 100
	};
	return (
		<div className={props.className}>
			<Header
				label='sotto banco'
				selected='/lineadeltempo'
			/>
			<h2 className='pageTitle'>Linea del tempo</h2>
			<div className='timeline'>
				<Timeline
					target={<div className='timeline' />}
					events={events}
					title={title}
					options={options}
				/>
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
