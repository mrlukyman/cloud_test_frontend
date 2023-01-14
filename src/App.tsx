import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SongDashboard } from './pages/SongDashboard';
import { ResponsiveAppBar } from './components/ResponsiveAppBar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <SongDashboard />
    </ThemeProvider>
  );
}

export default App;
