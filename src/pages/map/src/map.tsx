import styled from 'styled-components';
import { Header } from '../../../ui/header';
import { DummyProps } from './types';

import timelineData from '../../../data/timelineData.json';
import { useState } from 'react';
import uuid from 'react-uuid';

import parse from 'html-react-parser';

import {
	MapContainer,
	TileLayer,
	Marker,
	Tooltip,
	useMapEvents
} from 'react-leaflet';
import L from 'leaflet';
import markerIcon from '../../../data/media/marker.png';
const icon = L.icon({
	iconUrl: markerIcon,
	iconSize: [41, 41]
});

const DummyEvents = (props: { click: () => void }) => {
	useMapEvents({
		click: () => props.click()
	});
	return null;
};

const Dummy = (props: DummyProps) => {
	const [infoText, setInfoText] = useState<{
		coordsTitle: string;
		coordsDate: string;
		text: string;
	}>({ coordsTitle: '', text: '', coordsDate: '' });

	return (
		<div className={props.className}>
			<Header selected='/map' />

			<div className='mapContainer'>
				<div className='map'>
					<MapContainer
						center={[41.902782, 12.4963]}
						zoom={6}
						scrollWheelZoom={true}
						className='mapLeaflet'
					>
						<DummyEvents
							click={() => {
								setInfoText({ coordsTitle: '', text: '', coordsDate: '' });
							}}
						/>
						<TileLayer
							url='https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png'
							attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							subdomains='abcd'
						/>
						{timelineData.events.map(event => {
							if (event.coords) {
								return (
									<Marker
										key={uuid()}
										position={[event.coords.lat, event.coords.lon]}
										icon={icon}
										eventHandlers={{
											click: () => {
												setInfoText({
													coordsTitle: event.coords.title,
													text: event.text.text,
													coordsDate: event.display_date
												});
											}
										}}
									>
										<Tooltip>
											{event.coords.title}
											<br />
											{event.display_date}
										</Tooltip>
									</Marker>
								);
							} else return null;
						})}
					</MapContainer>
				</div>
				<div className='infoBox'>
					{infoText.coordsTitle === '' ? (
						<div className='infoText'>
							Clicca su un marker per visualizzare le info
						</div>
					) : (
						<>
							<div className='infoTitle'>{infoText.coordsTitle}</div>
							<div className='infoDate'>{infoText.coordsDate}</div>
							<div className='infoText'>{parse(infoText.text)}</div>
						</>
					)}
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

	.mapContainer {
		width: 100%;
		height: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 0 10px;
	}

	.map {
		width: 80%;
		height: 90%;
		border: 2px solid black;
		border-radius: 10px;
		overflow: hidden;
	}

	.mapLeaflet {
		width: 100%;
		height: 100%;
	}

	.infoBox {
		width: 20%;
		height: 90%;
		display: flex;
		flex-direction: column;
		padding: 20px;
		box-sizing: border-box;
	}

	.infoTitle {
		width: 100%;
		font-size: larger;
		font-weight: bold;
		border-bottom: 1px solid black;
		padding: 5px 0;
	}

	.infoDate {
		margin-bottom: 20px;
		padding: 5px 0;
	}

	.infoText {
		width: 100%;
		overflow: auto;
	}

	@media only screen and (max-width: 768px) {
		.mapContainer {
			flex-direction: column;
			height: 92%;
			width: 100%;
			padding-top: 5px;
		}

		.map {
			width: 100%;
			height: 60%;
		}

		.infoBox {
			width: 100%;
			height: 40%;
			font-size: small;
			padding: 5px;
		}

		.infoDate {
			margin-bottom: 5px;
			font-size: small;
		}

		.infoText {
			font-size: small;
		}
	}
`;
