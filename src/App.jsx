import { ThemeProvider } from '@mui/material/styles';
import Router from './components/common/Router';
import theme from './configs/theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
