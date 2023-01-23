import styled from 'styled-components';
import { Header } from '../../../ui/header';
import { Timeline } from '../../../ui/timeline';
import { DummyProps } from './types';

const Dummy = (props: DummyProps) => {
	return (
		<div className={props.className}>
			<Header
				label='sotto banco'
				selected='/lineadeltempo'
			/>
			<Timeline />
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

	.pageTitle {
		width: 100%;
		text-align: center;
		cursor: default;
		user-select: none;
		margin: 0;
	}
`;
