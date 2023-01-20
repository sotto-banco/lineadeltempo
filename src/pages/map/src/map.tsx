import styled from 'styled-components';
import { Header } from '../../../ui/header';
import { DummyProps } from './types';

import { Map, Marker } from 'pigeon-maps';
import { stamenTerrain } from 'pigeon-maps/providers';

import slides from '../../../data/slides.json';
import { useState } from 'react';
import uuid from 'react-uuid';

import parse from 'html-react-parser';

const Dummy = (props: DummyProps) => {
	const [markerTitle, setMarkerTitle] = useState<string>('');
	const [infoText, setInfoText] = useState<{
		coordsTitle: string;
		text: string;
	}>({ coordsTitle: '', text: '' });

	return (
		<div className={props.className}>
			<Header
				label='sotto banco'
				selected='/map'
			/>
			<div className='pageTitleContainer'>
				<h2 className='pageTitle'>Mappa</h2>
				<div className='markerTitle'>{markerTitle}</div>
			</div>

			<div className='mapContainer'>
				<div className='map'>
					<Map
						provider={stamenTerrain}
						height={700}
						defaultCenter={[41.902782, 12.496366]}
						defaultZoom={4.5}
						attribution={
							<div>
								Map tiles by Stamen Design, under CC BY 3.0. Data by
								OpenStreetMap, under ODbL.
							</div>
						}
						onClick={() => {
							setInfoText({ coordsTitle: '', text: '' });
							setMarkerTitle('');
						}}
					>
						{slides.slides.map(s => {
							if (s.coords) {
								return (
									<Marker
										key={uuid()}
										width={50}
										anchor={[s.coords.lat, s.coords.lon]}
										payload={s.coords.title}
										onMouseOver={({ payload }) => {
											setMarkerTitle(payload);
										}}
										onMouseOut={() => {
											setMarkerTitle('');
										}}
										onClick={() => {
											setInfoText({
												coordsTitle: s.coords.title,
												text: s.text.text
											});
										}}
									/>
								);
							}
						})}
					</Map>
				</div>
				<div className='infoBox'>
					<div className='infoTitle'>{infoText.coordsTitle}</div>
					<div className='infoText'>{parse(infoText.text)}</div>
				</div>
			</div>
		</div>
	);
};

export const MapPage = styled(Dummy)`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	.pageTitleContainer {
		width: 100%;
		text-align: center;
	}

	.pageTitle {
		width: 100%;
		cursor: default;
		user-select: none;
	}

	.mapContainer {
		width: 100%;
		height: 70%;
		display: flex;
		flex-direction: row;
		padding: 10px 40px;
		box-sizing: border-box;
	}

	.map {
		width: 80%;
		height: 700px;
		border: 2px solid black;
		border-radius: 10px;
		overflow: hidden;
	}

	.infoBox {
		width: 20%;
		height: 700px;
		display: flex;
		flex-direction: column;
		padding: 20px;
		box-sizing: border-box;
	}

	.markerTitle {
		width: 100%;
		height: 10px;
		font-size: larger;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.infoTitle {
		width: 100%;
		height: 50px;
		font-size: larger;
		font-weight: bold;
		margin-bottom: 20px;
	}

	.infoText {
		width: 100%;
		overflow: auto;
	}

	@media only screen and (max-width: 768px) {
		.mapContainer {
			flex-direction: column;
			padding: 10px;
			height: 80%;
		}

		.map {
			width: 100%;
			height: 800px;
		}

		.infoBox {
			width: 100%;
			height: 200px;
		}

		.pageTitle {
			display: none;
		}

		.markerTitle {
			display: none;
		}
	}
`;
