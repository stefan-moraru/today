import React from 'react';
import Card from 'common/components/card';
import Utils from 'common/utils';
import EventService from 'common/services/eventservice';

class EventCard extends Card {

  getDescription() {

    return this.props.description;

  }

  getExtraClassNames() {

    return 'u-p-0 ' + this.props.extraClasses;

  }

  getType() {

    return 'event';

  }

  backgroundImageFromCategories(event) {

    const path = '/src/assets/images/';
    const prefix = `category_`;
    const imagePath = name => `${path}${prefix}${name}`;
    const imagePaths = paths => paths.map(item => imagePath(item));

    const images = {
      'sports': imagePaths(['sports1.jpg', 'sports0.jpg']),
      'food': imagePaths(['food0.jpg', 'food1.jpg', 'food2.jpg']),
      'noimage': imagePaths(['noimage.jpg', 'noimage1.jpg', 'noimage2.jpg', 'noimage3.jpg'])
    };

    const getRandomImageFromCategory = (imagesList, category) => {
      const rand = Math.floor(Math.random() * imagesList[category].length);

      return imagesList[category][rand];
    };

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

  removeEvent(event, ev) {

    ev.stopPropagation();

    if (confirm('Are you sure you want to delete event ?')) { // eslint-disable-line

      EventService.deleteEvent(event);

    }

  }

  getContent() {

    const event = this.props.event;
    const onClick = this.props.onClick.bind(this, event);
    let remove = null;
    let image = event.image;

    if (!image) {
      image = this.backgroundImageFromCategories(event);
    }

    if (this.props.remove) {

      remove = (
        <div className='remove' onClick={this.removeEvent.bind(this, event)}>
          <i className='fa fa-remove'></i>
        </div>
      );

    }

    const style = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url(${image})`
    };

    const start = Utils.padTime(event.time);
    const value = Utils.eventValue(event);
    const endingH = Math.floor(value / 60);
    const endingM = value % 60;
    const ending = Utils.padTime({ h: endingH, m: endingM });
    const time = `${start} - ${ending}`;

    const containerProps = {
      style: style,
      onClick: onClick,
      className: `event-inner-content event--priority-${event.priority}`
    };

    return (
      <div {...containerProps}>
        <div className='description'>
          <h5>{ event.title }</h5>
          <h6>{ time }</h6>
          <h6>{ event.location }</h6>

          { remove }
        </div>
      </div>
    );

  }

}

EventCard.defaultProps = {
  onClick: () => {
    return;
  },
  remove: false
};

export default EventCard;
