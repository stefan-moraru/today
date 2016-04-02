import React from 'react';
import UserService from 'common/services/userservice';
import introJs from 'intro.js';
require('./index.scss');

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {}
    };
  }

  componentDidMount() {
    UserService.profile().then(this.saveProfile.bind(this));
  }

  saveProfile(profile) {
    this.setState({
      profile: profile
    });
  }

  setPadTopHeight() {

    const navbar = document.querySelector('.navbar-fixed-top');
    const padTop = document.querySelector('.pad-top');

    if (navbar) {

      padTop.style.paddingTop = navbar.offsetHeight;

    }

  }

  render() {

    window.onresize = this.setPadTopHeight;
    window.onload = this.setPadTopHeight;

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
        href: '/calendar',
        title: 'Calendar'
      },
      {
        href: '/goals',
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
      },
      {
        title: 'Help',
        onClick: () => {

          introJs.introJs().setOption('showProgress', true).setOption('showStepNumbers', false).start();

        }
      },
      {
        href: '/profile',
        title: (
          <div className='image' style={{ backgroundImage: `url(${this.state.profile.image})` }}></div>
        )
      }
    ];

    const routesRendered = routes.map((item, index) => {

      let extraClasses = '';

      if (window.location.pathname == item.href) {
        extraClasses = 'active';
      }

      const containerProps = {
        className: `nav-item ${extraClasses}`,
        key: `c-header-item-${index}`,
        onClick: item.onClick
      };

      return (
        <li {...containerProps}>
          <a className="nav-link" href={item.href}>{ item.title }</a>
        </li>
      );
    });

    return (
      <div className='container-fluid'>
        <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
          <a className="navbar-brand" href="/home">
          Today
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
