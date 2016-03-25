import React from 'react';

class Header extends React.Component {

  render() {

    return (
      <nav className="navbar navbar-light bg-faded">
        <a className="navbar-brand" href="#">Rise</a>
        <ul className="nav navbar-nav pull-right">
          <li className="nav-item active">
            <a className="nav-link" href="#">Astazi <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/settings">Setari</a>
          </li>
        </ul>
      </nav>
    );

  }

}

export default Header;
