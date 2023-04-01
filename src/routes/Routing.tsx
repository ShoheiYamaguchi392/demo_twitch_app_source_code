import { Routes, Route, Navigate } from 'react-router-dom';

const Routing: React.FC<object> = () => {
	return (
		<Routes>
			<Route path="/" element={<>test</>} />
			<Route path="/channel" element={<>channel</>} />
			<Route path="/404" element={<>404</>} />
			<Route path="*" element={<Navigate to="/404" replace={true} />} />
		</Routes>
	);
};

export default Routing;
