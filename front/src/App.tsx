import Home from './pages/home/home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    primary:{
      light: '#21130d',
      main: "#21130d",
    }
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
