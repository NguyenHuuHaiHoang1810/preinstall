import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import  Header  from './components/headers/Header';
import Products from './components/home/products/Products';
//import Filters from './components/home/products/Filters';
function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header/>
          <Products />
        </div>
      </Router>
    </DataProvider>
   
  );
}

export default App;
