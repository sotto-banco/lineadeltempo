import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ErrorElement = () => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate('/lineadeltempo');
	}, []);
	return <div>Something went wrong...</div>;
};
