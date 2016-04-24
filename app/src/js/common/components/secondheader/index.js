import React from 'react';
require('./index.scss');

class SecondHeader extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      extraVisible: {}
    };

    this.mounted = false;

  }

  componentDidMount() {

    document.addEventListener('click', this.closeExtra.bind(this));

    this.mounted = true;

  }

  componentWillUnmount() {

    document.removeEventListener('click', this.closeExtra.bind(this));

    this.mounted = false;

  }

  hasParent(element, parent) {

    if (!element) {

      return false;

    }

    if (element === parent || element.parentNode === parent) {

      return true;

    }

    return this.hasParent(element.parentNode, parent);

  }

  closeExtra(ev) {

    if (!this.hasParent(ev.target, this.refs.extra) && ev.target.className.indexOf('secondheader') == -1) {

      if (this.mounted) {

        this.setState({
          extraVisible: {}
        });

      }

    }

  }

  toggleExtra(name, ev) {

    let extraVisible = this.state.extraVisible;
    let aux = extraVisible[name];

    extraVisible = {};
    extraVisible[name] = !aux;

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
        icon = <i className={'secondheader-icon fa fa-' + item.icon}></i>;
      }

      let liProps = {
        className: `nav-item ${extraClass}`,
        key: `secondheader-item-${index}`
      };

      if (item.onClick) {
        liProps['onClick'] = item.onClick;
      }

      if (item.toggle) {
        liProps['data-toggle'] = item.toggle;
        liProps['data-target'] = item.target;
      }

      if (item.extra) {
        let extraProps = {
          className: 'extra '
        };

        if (!this.state.extraVisible[item.icon]) {
          extraProps.className += ' u-hidden';
        }

        extra = (
          <div {...extraProps} ref='extra'>
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
    const itemsRight = this.generateItems(this.props.itemsRight.sort((a, b) => a.index > b.index).reverse(), 'u-fr');

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
