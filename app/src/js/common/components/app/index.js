import React from 'react';
import { Link } from 'react-router';
import './index.scss';

class App extends React.Component {

  render() {

    return (
      <div>
        { this.props.children }
      </div>
    );

  }

}

export default App;
