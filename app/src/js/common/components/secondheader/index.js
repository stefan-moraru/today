import React from 'react';
require('./index.scss');

class SecondHeader extends React.Component {

  generateItems(items, extraClass = '') {

    return items.map((item, index) => {

      let icon = null;
      let text = null;
      let extra = null;

      if (item.icon) {
        icon = <i className={'fa fa-' + item.icon}></i>;
      }

      let liProps = {
        className: `nav-item ${extraClass}`,
        key: `secondheader-item-${index}`
      };

      if (item.onClick) {
        liProps['onClick'] = item.onClick;
      }

      if (item.extra) {
        extra = (
          <div className='extra'>
            { item.extra }
          </div>
        );
      }

      return (
        <li {...liProps}>
          <a className="nav-link" href="#">
            { icon }
          </a>

          { extra }
        </li>
      );

    });

  }

  render() {

    const items = this.generateItems(this.props.items);
    const itemsRight = this.generateItems(this.props.itemsRight.reverse(), 'u-fr');

    return (
      <nav className="navbar navbar-light bg-faded navbar-second">
        <ul className="nav navbar-nav">
          { items }
          { itemsRight }
        </ul>
      </nav>
    );

  }

}

SecondHeader.defaultProps = {
  items: [],
  itemsRight: []
};

export default SecondHeader;
