import React from 'react';
require('./index.scss');

class SecondHeader extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      extraVisible: {}
    };

  }

  toggleExtra(name) {

    let extraVisible = this.state.extraVisible;

    extraVisible[name] = !extraVisible[name];

    this.setState({
      extraVisible: extraVisible
    });

  }

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
        let extraProps = {
          className: 'extra '
        };

        if (!this.state.extraVisible[item.icon]) {
          extraProps.className += 'u-hidden';
        }

        extra = (
          <div {...extraProps}>
            { item.extra }
          </div>
        );
      }

      return (
        <li {...liProps}>
          <a className="nav-link" href="#" onClick={this.toggleExtra.bind(this, item.icon)}>
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
