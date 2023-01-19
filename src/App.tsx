import './App.css';
import Timeline from 'timelinejs-react';

function App() {
	const events: Slide[] = [
		{
			start_date: {
				year: 1950
			},
			text: {
				headline: 'TEST',
				text: 'this is some test text'
			},
			display_date: '1950',
			autolink: true
		}
	];
	const title: TitleSlide = {};
	const options: TimelineOptions = {};

	return (
		<div className='App'>
			<div style={{ width: 500, height: 400, border: '2px solid black' }}>
				<Timeline
					target={<div className='timeline' />}
					events={events}
					title={title}
					options={options}
				/>
			</div>
		</div>
	);
}

export default App;
