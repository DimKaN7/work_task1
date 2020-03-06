import React from 'react';
import './App.css';
import Menu from './components/Menu';

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return(
      <Menu></Menu>
    ); 
  }
}

export default App;
