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

    this.mounted = true;

  }

  componentWillUnmount() {

    this.mounted = false;

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
        href: '/communities',
        title: 'Communities',
        icon: 'fa fa-users'
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
