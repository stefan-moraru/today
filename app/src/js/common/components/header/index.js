import React from 'react';

class Header extends React.Component {

  render() {

    return (
      <div>
        <nav className="navbar navbar-fixed-top navbar-light">
          <a className="navbar-brand" href="#">
          Rise
          </a>
          <ul className="nav navbar-nav pull-right">
            <li className="nav-item active">
              <a className="nav-link" href="/today">Astazi <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/settings">Setari</a>
            </li>
          </ul>
        </nav>

        { this.props.children }
      </div>
    );

  }

}

export default Header;
