import React from 'react';
import './index.scss';

class Jumbotron extends React.Component {

  render() {

    const style = {
      'background': `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url('${this.props.image}')`
    };

    let more = null;

    if (this.props.more) {

      more = (
        <div className='arrow'>
          <p>{ this.props.more }</p>
          <i className='fa fa-chevron-down'></i>
        </div>
      );

    }

    const jumbotronProps = {
      className: `jumbotron ${this.props.className || ''}`,
      style: style
    };

    return (
      <div {...jumbotronProps}>
        <h1 className='f-bold display-4'>{ this.props.title }</h1>
        <h3 className='f-light'>{ this.props.description }</h3>

        { more }
      </div>
    );

  }

}

export default Jumbotron;
