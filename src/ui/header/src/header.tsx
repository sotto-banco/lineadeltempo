import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Props } from './types';

const StyledHeader = (props: Props) => {
	const navigate = useNavigate();

	return (
		<div className={props.className}>
			<h2 className='title'>{props.label}</h2>
			<div className='titleMobile'>{props.label}</div>
			<div className='nav'>
				<div
					className={
						props.selected?.startsWith('/lineadeltempo')
							? 'navbutton selected'
							: 'navbutton'
					}
					onClick={() => navigate('/lineadeltempo/')}
				>
					timeline
				</div>
				<div
					className={
						props.selected === '/map' ? 'navbutton selected' : 'navbutton'
					}
					onClick={() => navigate('/lineadeltempo/map')}
				>
					mappa
				</div>
				<div
					className={
						props.selected === '/info' ? 'navbutton selected' : 'navbutton'
					}
					onClick={() => navigate('/lineadeltempo/info')}
				>
					info
				</div>
			</div>
		</div>
	);
};

export const Header = styled(StyledHeader)`
	width: 100%;
	height: 8%;
	border-bottom: 2px solid black;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	overflow: hidden;
	padding: 5px;
	box-sizing: border-box;
	cursor: default;
	user-select: none;
	background-color: rgb(255, 136, 0);

	.title {
		font-size: 2em;
		font-weight: bold;
		text-shadow: 2px 2px 6px rgb(255, 241, 199);
	}

	.titleMobile {
		display: none;
	}

	.nav {
		display: flex;
		flex-direction: row;
	}

	.navbutton {
		font-weight: bold;
		cursor: pointer;
		border-right: 2px solid black;
		margin-right: 20px;
		padding-right: 15px;
	}

	.navbutton:hover {
		color: white;
		text-shadow: 2px 2px 8px black;
	}

	.selected {
		color: rgb(255, 241, 199);
		text-shadow: 2px 2px 5px black;
	}

	@media only screen and (max-width: 768px) {
		.title {
			display: none;
		}

		.titleMobile {
			display: block;
			font-size: 1em;
			font-weight: bold;
			margin-right: 5px;
			text-align: center;
			padding: 10px;
			text-shadow: 2px 2px 6px rgb(255, 241, 199);
		}

		.navbutton {
			border-left: 0.5px solid gray;
			border-right: 0;
			margin-right: 10px;
			padding-right: 0;
			padding-left: 10px;
		}
	}
`;
