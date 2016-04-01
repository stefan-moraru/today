import React from 'react';

class EventCard extends React.Component {

  padTime(time) {

    let hour = time.h;
    let minutes = time.m;

    if (hour < 10) {
      hour = `0${hour}`
    }

    if (minutes == 0) {
      minutes = `00`;
    }

    return `${hour}:${minutes}`;

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

  generateEvents(events) {

    return events
    .map(item => {
      item.value = item.time.h * 60 + item.time.m + item.duration

      return item;
    })
    .sort((a, b) => a.value > b.value)
    .map((item, index) => {

      let image = item.image;

      if (!image) {
        image = this.backgroundImageFromCategories(item);
      }

      const style = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url(${image})`
      };

      const start = this.padTime(item.time);
      const ending_h = Math.floor(item.value / 60);
      const ending_m = item.value % 60;
      const ending = this.padTime({ h: ending_h, m: ending_m });

      const time = `${start} - ${ending}`;

      return (
        <div className='c-card event col-xs-12' style={style} key={'c-card-events-event-' + index}>
          <div className='description'>
            <h5 className='title'>{ item.title }</h5>
            <h6 className='small'>{ time }</h6>
            <h6 className='small'>{ item.location }</h6>
          </div>
        </div>
      );

    });

  }

  render() {

    const eventsRendered = this.generateEvents([this.props.event]);

    return (
      <div className='c-card-event'>
        { eventsRendered }
      </div>
    );

  }

}

export default EventCard;
