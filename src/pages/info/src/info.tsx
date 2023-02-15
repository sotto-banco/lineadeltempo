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
			<div className='credits'>
				<div className='credits__author'>
					<div className='credits__author__role'>ideato e realizzato da</div>
					<div className='credits__author__name'>Francesco Grassi</div>/
					<div className='credits__author__name'>Claudio Santancini</div>
				</div>
				<div className='credits__heading'>Sottobanco Scuola Digitale</div>
				<div className='email'>
					<strong>email</strong>:{' '}
					<span className='email__address'>f.grassi@cine-tv.edu.it</span>
				</div>
				<div className='credits__year'>2023</div>
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

	.credits {
		display: flex;
		flex-direction: column;
		align-items: center;
		user-select: none;
		padding: 30px;
		border-radius: 25px;
		background-color: rgba(255, 136, 0, 0.2);
		box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.credits__heading {
		font-size: large;
		font-weight: bold;
		padding: 5px;
		text-decoration: none;
		color: black;
		margin-bottom: 20px;
		transition: 0.5s;
		margin-top: 10px;
	}

	.credits__heading:hover {
		background-color: rgb(255, 136, 0);
		border-radius: 10px;
		border: 0;
		transform: translateY(-5px) scale(1.2);
	}

	.email {
		margin-bottom: 15px;
		border-top: 1px solid gray;
		padding-top: 15px;
	}

	.email__address {
		text-decoration: underline;
		user-select: text;
	}

	.credits__author {
		text-align: center;
	}

	.credits__author__role {
		margin-bottom: 20px;
	}

	.credits__author__name {
		display: inline-block;
		font-weight: bold;
		transition: 0.2s linear;
		padding: 5px 10px;
	}

	.credits__author__name:hover {
		background-color: #149ffc;
		border-radius: 5px;
		color: white;
		margin: 0 20px;
	}

	.credits__year {
		font-weight: bold;
	}
`;
