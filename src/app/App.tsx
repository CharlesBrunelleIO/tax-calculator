import React from 'react';
import { Provider } from 'react-redux';

import '../i18n.js';
import Home from './routes/Home';
import { store } from '../stores/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
