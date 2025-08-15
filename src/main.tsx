import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './app/store';
import './styles/global.scss';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
const container = document.getElementById('root');
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';

if (container) {
   const root = createRoot(container);

   root.render(
      <ApolloProvider client={client}>
         <Provider store={store}>
            <BrowserRouter>
               <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <App />
               </ThemeProvider>
            </BrowserRouter>
         </Provider>
      </ApolloProvider>
   );
} else {
   throw new Error(
      "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
   );
}
