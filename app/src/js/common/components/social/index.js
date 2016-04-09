import React from 'react';
import './index.scss';

class Social extends React.Component {

  render() {

    const networks = [
      { title: 'Facebook', icon: 'fa fa-facebook', href: '#' },
      { title: 'Instagram', icon: 'fa fa-instagram', href: '#' },
      { title: 'Twitter', icon: 'fa fa-twitter', href: '#' }
    ];

    const networksRendered = networks.map((item, key) => (
      <a href={ item.href } target='_new' key={`Social-item-${key}`}>
        <div className='circle'>
          <i className={ item.icon }></i>
        </div>
      </a>
    ));

    return (
      <div className='c-social'>
        <div className='row'>
          <div className='col-xs-12'>
           { networksRendered }
          </div>
        </div>
      </div>
    );

  }

}

export default Social;
