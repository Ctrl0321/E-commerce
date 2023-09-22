
import './App.css';
import {Route,Routes} from 'react-router-dom'
import Login from './components/Login';
import Panel from './components/Panel';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/adminPanel' element={<Panel/>}/>

      </Routes>
    </div>
  );
}

export default App;
