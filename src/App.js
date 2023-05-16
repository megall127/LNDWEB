import './App.css';
import Router from './navigation/router';
import 'primeicons/primeicons.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import GlobalState from './Pages/Context/GlobalState';






function App() {
  return (
    <div className="App">
      <GlobalState>
      <Router/>
      </GlobalState>
    </div>
  );
}

export default App;
