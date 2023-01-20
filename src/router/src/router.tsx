import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../../pages/home';
import { MapPage } from '../../pages/map';
import { ErrorElement } from './errorElement';

export const router = createBrowserRouter([
	{
		path: '/lineadeltempo',
		element: <Home />,
		errorElement: <ErrorElement />
	},
	{
		path: '/map',
		element: <MapPage />,
		errorElement: <ErrorElement />
	}
]);
