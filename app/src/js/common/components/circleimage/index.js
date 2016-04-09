import React from 'react';
require('./index.scss');

class CircleImage extends React.Component {

  render() {

    const image = this.props.image;
    const size = this.props.size;

    const circleImageProps = {
      className: `c-circle-image c-circle-image--${size}`,
      style: {
        backgroundImage: `url('${image}')`
      }
    };

    return (
      <div {...circleImageProps}></div>
    );

  }

}

CircleImage.defaultProps = {
  image: '',
  size: 'small'
};

export default CircleImage;
