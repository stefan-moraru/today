import React from 'react';

class SecondHeader extends React.Component {

  generateItems(items) {

    return items.map((item, index) => {

      return (
        <li className="nav-item" onClick={item.onClick} key={'secondheader-item-' + index}>
          <a className="nav-link" href="#"><i className={'fa fa-' + item.icon}></i></a>
        </li>
      );

    });

  }

  render() {

    const items = this.generateItems(this.props.items);

    return (
      <nav className="navbar navbar-light bg-faded">
        <ul className="nav navbar-nav">
          { items }
        </ul>
      </nav>
    );

  }

}

export default SecondHeader;
