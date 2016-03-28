import React from 'react';

class CircleImage extends React.Component {

  render() {

    const image = this.props.image;
    const circleImageProps = {
      className: 'c-circle-image pull-left',
      style: {
        backgroundImage: `url('${image}')`
      }
    };

    return (
      <div {...circleImageProps}></div>
    );

  }

}

export default CircleImage;
