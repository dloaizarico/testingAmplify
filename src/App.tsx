import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GeneralStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import { HelmetProvider } from 'react-helmet-async'

function App() {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        <HelmetProvider>
          {routing}
        </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
