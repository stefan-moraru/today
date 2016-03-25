import React from 'react';

class Header extends React.Component {

  render() {

    const routes = [
      {
        href: '/home',
        title: 'Acasă'
      },
      {
        href: '/today',
        title: 'Astăzi'
      },
      {
        href: '/today',
        title: 'Calendar'
      },
      {
        href: '/today',
        title: 'Goals'
      },
      {
        href: '/login',
        title: 'Login'
      },
      {
        href: '/logout',
        title: 'Logout'
      },
      {
        href: '/settings',
        title: 'Setări'
      }
    ];

    const routesRendered = routes.map((item, index) => {

      let extraClasses = '';

      if (window.location.pathname == item.href) {
        extraClasses = 'active';
      }

      return (
        <li className={`nav-item ${extraClasses}`} key={`c-header-item-${index}`}>
          <a className="nav-link" href={item.href}>{ item.title }</a>
        </li>
      );
    });

    return (
      <div className='container-fluid'>
        <nav className="navbar navbar-fixed-top navbar-dark">
          <a className="navbar-brand" href="/home">
          Rise
          </a>
          <ul className="nav navbar-nav pull-right">
            { routesRendered }
          </ul>
        </nav>

        <div className='pad-top'>
          { this.props.children }
        </div>
      </div>
    );

  }

}

export default Header;
