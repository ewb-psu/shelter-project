import React from 'react';
import logo from './logo.svg';
import './App.css';
import FieldSelector from "./components/FieldSelector";
import NavBar from "./components/NavigationBlock";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App">
        {/*<NavBar />*/}
      <FieldSelector />
        {/*<Footer />*/}
    </div>
  );
}

export default App;
