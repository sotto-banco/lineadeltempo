import styled from 'styled-components';
import { Header } from '../../../ui/header';
import { DummyProps } from './types';

const Dummy = (props: DummyProps) => {
	return (
		<div className={props.className}>
			<Header
				label='sotto banco'
				selected='/map'
			/>
		</div>
	);
};

export const Map = styled(Dummy)`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`;
