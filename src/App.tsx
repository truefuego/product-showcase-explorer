import { useEffect } from 'react';
import './App.css'
import Lenis from 'lenis';
import { HttpMethodContextProvider } from './context/httpContext';
import AppRoutes from './routes/AppRoutes';

const App:React.FC = () => {

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <HttpMethodContextProvider>
      <AppRoutes />
    </HttpMethodContextProvider>
  )
}

export default App;
