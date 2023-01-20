import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../../pages/home';
import { Info } from '../../pages/info';
import { MapPage } from '../../pages/map';
import { ErrorElement } from './errorElement';

export const router = createBrowserRouter([
	{
		path: 'lineadeltempo/',
		element: <Home />,
		errorElement: <ErrorElement />
	},
	{
		path: '/lineadeltempo/map',
		element: <MapPage />,
		errorElement: <ErrorElement />
	},
	{
		path: 'lineadeltempo/info',
		element: <Info />,
		errorElement: <ErrorElement />
	},
	{
		path: '*',
		element: <ErrorElement />,
		errorElement: <ErrorElement />
	}
]);
