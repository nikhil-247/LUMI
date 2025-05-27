import { Toaster } from 'react-hot-toast';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#8B5CF6',
            color: '#fff',
          },
        }}
      />
      <Dashboard />
    </>
  );
}

export default App;