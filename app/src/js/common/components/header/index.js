import React from 'react';
import UserService from 'common/services/userservice';
import introJs from 'intro.js';
import CircleImage from 'common/components/circleimage';
import './index.scss';

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

    /* const navbar = document.querySelector('.navbar-fixed-top');
    const padTop = document.querySelector('.pad-top');

    if (navbar) {

      padTop.style.paddingTop = navbar.offsetHeight;

    } */

  }

  render() {

    //window.onresize = this.setPadTopHeight;
    //window.onload = this.setPadTopHeight;
    //window.onScr

    const routes = [
      {
        href: '/home',
        icon: 'fa fa-home',
        title: 'Home'
      },
      {
        href: '/today',
        title: 'Today',
        icon: 'fa fa-home'
      },
      {
        href: '/calendar',
        title: 'Calendar',
        icon: 'fa fa-calendar'
      },
      {
        href: '/goals',
        title: 'Goals',
        icon: 'fa fa-calendar-check-o'
      },
      {
        href: '/hikes',
        title: 'Hikes',
        icon: 'fa fa-road'
      },
      {
        href: '/login',
        title: 'Log in',
        icon: 'fa fa-sign-in'
      },
      {
        href: '/logout',
        title: 'Log out',
        icon: 'fa fa-sign-out'
      },
      {
        href: '/settings',
        title: 'Settings',
        icon: 'fa fa-cog'
      },
      {
        title: 'Help',
        icon: 'fa fa-question-circle',
        onClick: () => {

          introJs.introJs().setOption('showProgress', true).setOption('showStepNumbers', false).start();

        }
      },
      {
        href: '/profile',
        /* icon: (
          <CircleImage image={this.state.profile.image} />
        ), */
        icon: 'fa fa-user',
        title: 'Profile'
      }
    ];

    const routesRendered = routes.map((item, index) => {

      let extraClasses = '';
      let icon = null;

      if (window.location.pathname == item.href) {
        extraClasses = 'active';
      }

      if (item.icon) {
        icon = <i className={`${item.icon} u-fl`}></i>;
      }

      const containerProps = {
        className: `u-c-pointer item ${extraClasses}`,
        key: `c-header-item-${index}`,
        onClick: item.onClick
      };

      return (
        <div {...containerProps}>
          { icon }
          <a href={item.href}>{ item.title }</a>
        </div>
      );
    });

        /* <nav className="navbar navbar-dark bg-inverse navbar-fixed-top">
          <a className="navbar-brand" href="/home">
            Today
          </a>
          <ul className="nav navbar-nav pull-right">
            { routesRendered }
          </ul>
        </nav>*/

    return (
      <div className='container-fluid'>
        <div className='menu-container'>
          <div className='menu'>
            <h3 className='title'>Today</h3>

            { routesRendered }
          </div>
        </div>

        <div className='content-container'>
          { this.props.children }
        </div>
      </div>
    );

  }

}

export default Header;
