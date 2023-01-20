import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Props } from './types';

const StyledHeader = (props: Props) => {
	const navigate = useNavigate();
	return (
		<div className={props.className}>
			<h2 className='title'>{props.label}</h2>
			<div className='nav'>
				<div
					className={
						props.selected === '/lineadeltempo/'
							? 'navbutton selected'
							: 'navbutton'
					}
					onClick={() => navigate('/lineadeltempo/')}
				>
					linea del tempo
				</div>
				<div
					className={
						props.selected === '/lineadeltempo/map'
							? 'navbutton selected'
							: 'navbutton'
					}
					onClick={() => navigate('/lineadeltempo/map')}
				>
					mappa
				</div>
				<div
					className={
						props.selected === '/lineadeltempo/info'
							? 'navbutton selected'
							: 'navbutton'
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
	background-color: orange;

	.title {
		font-size: 2em;
		font-weight: bold;
	}

	@media only screen and (max-width: 768px) {
		.title {
			display: none;
		}
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
	}

	.selected {
		color: #ff0000;
	}
`;
