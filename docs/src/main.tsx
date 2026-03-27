import { createRoot } from 'react-dom/client';
import { AcstaneThemeProvider } from '../../src';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <AcstaneThemeProvider>
    <App />
  </AcstaneThemeProvider>,
);
