import { GlobalStyles } from './ui/globalStyles';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';

const App = () => {
	return (
		<div id='app'>
			<GlobalStyles />
			<RouterProvider router={router} />
		</div>
	);
};

export default App;
