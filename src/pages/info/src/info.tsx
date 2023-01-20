import styled from 'styled-components';
import { Header } from '../../../ui/header';
import { DummyProps } from './types';

const Dummy = (props: DummyProps) => {
	return (
		<div className={props.className}>
			<Header
				label='sotto banco'
				selected='/info'
			/>
			<h2 className='pageTitle'>Info</h2>
			<div>
				<p>sotto-banco 2023</p>
			</div>
		</div>
	);
};

export const Info = styled(Dummy)`
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
	}
`;
