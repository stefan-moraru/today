import React from 'react';
import Card from 'common/components/card';
import Utils from 'common/utils';

class EventCard extends Card {

  getType() {

    return 'event';

  }

  backgroundImageFromCategories(event) {

    const path = '/src/assets/images/';
    const prefix = `category_`;
    const imagePath = name => `${path}${prefix}${name}`;
    const imagePaths = paths => paths.map(path => imagePath(path));

    const images = {
      'sports': imagePaths(['sports1.jpg', 'sports0.jpg']),
      'food': imagePaths(['food0.jpg', 'food1.jpg', 'food2.jpg']),
      'noimage': imagePaths(['noimage.jpg', 'noimage1.jpg', 'noimage2.jpg', 'noimage3.jpg'])
    };

    const getRandomImageFromCategory = (images, category) => {
      const rand = Math.floor(Math.random() * images[category].length);

      return images[category][rand];
    }

    let image = getRandomImageFromCategory(images, 'noimage');
    let category = null;

    if (event.categories) {
      category = event.categories[0].title;
    }

    if (images[category]) {
      image = getRandomImageFromCategory(images, category);
    }

    return image;

  }

  getContent() {

    const event = this.props.event;
    const onClick = this.props.onClick.bind(this, event);

    let image = event.image;

    if (!image) {
      image = this.backgroundImageFromCategories(event);
    }

    const style = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url(${image})`
    };


    const start = Utils.padTime(event.time);
    const ending_h = Math.floor(event.value / 60);
    const ending_m = event.value % 60;
    const ending = Utils.padTime({ h: ending_h, m: ending_m });
    const time = `${start} - ${ending}`;

    const containerProps = {
      style: style,
      onClick: onClick
    };

    return (
      <div {...containerProps}>
        <div className='description'>
          <h5 className='title'>{ event.title }</h5>
          <h6 className='small'>{ time }</h6>
          <h6 className='small'>{ event.location }</h6>
        </div>
      </div>
    );

  }

}

EventCard.defaultProps = {
  onClick: () => {}
};

export default EventCard;
