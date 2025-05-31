import { useEffect } from 'react';
import './App.css'
import Lenis from 'lenis';

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
    <div className='bg-amber-400'>
      <p className='text-3xl text-blue-700 font-medium'>こんにちは ! Welcome to my site.</p>
    </div>
  )
}

export default App;
