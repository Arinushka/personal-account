import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import appStore from './store/store';
import { createRoot } from 'react-dom/client';
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
);

reportWebVitals();
