
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import { SocketProvider } from './context/SocketContext';

import Home from './pages/Home';
import Signup from './pages/signup';
import Login from './pages/Login';
import Layout from './components/Layout';
import NotificationHandler from './components/NotificationHandler';
import LandingPage from './pages/LandingPage';
import ProtectRoute from './route/ProtectRoute';
import PublicRoute from './route/PublicRoute';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider>
          <NotificationHandler />
          <Router>
            <Toaster />
            <Layout />
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<LandingPage />} />
              </Route>

              <Route element={<ProtectRoute />}>
                <Route path='/home' element={<Home />} />
              </Route>
            </Routes>
          </Router>
        </SocketProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
