import { useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { GlobalStyles } from './ui/globalStyles';

export default function App() {
  useEffect(() => {
    window.electron.ipcRenderer.on('error', (message: string) =>
      alert(message)
    );
    return () => window.electron.ipcRenderer.removeListener('error');
  });
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
