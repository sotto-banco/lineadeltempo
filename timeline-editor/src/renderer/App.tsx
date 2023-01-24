import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { GlobalStyles } from './ui/globalStyles';

export default function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
