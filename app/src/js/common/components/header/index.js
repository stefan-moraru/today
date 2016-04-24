import React from 'react';
import { Link } from 'react-router';
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

    this.mounted = false;

  }

  componentDidMount() {

    UserService.profile().then(this.saveProfile.bind(this));

    document.addEventListener('keydown', this.keyDown.bind(this), false);

    this.mounted = true;

  }

  componentWillUnmount() {

    document.removeEventListener('keydown', this.keyDown.bind(this), false);

    this.mounted = false;

  }

  getActiveRouteIndex() {

    let index = 0;

    this.getRoutes()
    .forEach((item, ind) => {

      if (window.location.pathname == item.href) {
        index = ind;
      }

    });

    return index;

  }

  getRoutes() {

    return [
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
        href: '/activities',
        title: 'Activities',
        icon: 'fa fa-th'
      },
      {
        href: '/settings',
        title: 'Settings',
        icon: 'fa fa-cog'
      },
      {
        href: `/profile/${(this.state.profile.email || '').replace(/\./g, ',')}`,
        icon: 'fa fa-user',
        title: 'Profile'
      },
      {
        href: '/logout',
        title: 'Log out',
        icon: 'fa fa-sign-out'
      }
    ];

  }

  switchToPrevRoute() {

    const index = this.getActiveRouteIndex();

    const prev = this.getRoutes()[index - 1];

    if (prev && prev.href) {

      window.location = prev.href;

    }

  }

  switchToNextRoute() {

    const index = this.getActiveRouteIndex();

    const next = this.getRoutes()[index + 1];

    if (next && next.href) {

      window.location = next.href;

    }

  }

  keyDown(e) {

    if (this.mounted) {

      if (e.keyCode === 38) {

        this.switchToPrevRoute();

      } else if (e.keyCode === 40) {

        this.switchToNextRoute();

      }

    }

  }

  saveProfile(profile) {

    this.setState({
      profile: profile
    });

  }

  render() {

    const routes = this.getRoutes();

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
        className: `u-c-pointer u-ctr-flex u-ctr-flex-v u-w-full item ${extraClasses}`,
        onClick: item.onClick
      };

      return (
        <Link to={item.href || ''} key={`c-header-item-${index}`}>
          <div {...containerProps}>
            { icon } { item.title }
          </div>
        </Link>
      );
    });

    const helpRendered = (
      <div className='u-c-pointer u-ctr-flex u-ctr-flex-v u-w-full item'
      onClick={ () => {
        introJs.introJs().setOption('showProgress', true).setOption('showStepNumbers', false).start()
      }}>
          <i className='fa fa-question-circle'></i> Help
      </div>
    );

    return (
      <div className='container-fluid'>
        <div className='menu-container'>
          <div className='menu u-hz-ctr'>
            <h3 className='title u-pb-quarter'>Today</h3>

            { routesRendered }
            { helpRendered }
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
