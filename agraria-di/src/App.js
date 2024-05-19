import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes/index';

import AuthProvider from './contexts/auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Provider from './contexts/Provider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Provider>
        <ToastContainer autoClose={3000} />
        <RoutesApp/>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;