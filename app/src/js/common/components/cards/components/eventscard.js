import React from 'react';

class EventsCard extends React.Component {

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
      'sports': imagePaths(['sports1.jpg', 'sports2.jpg']),
      'food': imagePaths(['food0.jpg', 'food1.jpg', 'food2.jpg']),
      'noimage': imagePaths(['noimage.jpg'])
    };

    let image = images['noimage'][0]
    let category = null;

    if (event.categories) {
      category = event.categories[0].title;
    }

    if (images[category]) {
      //TODO: RANDOM
      const rand = 0;

      console.log(images[category][0]);

      image = images[category][rand];
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
        <div className='event col-xs-12' style={style} key={'c-card-events-event-' + index}>
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

    const events = [
      {
        id: 0,
        time: { h: 7, m: 30 },
        date: '2016-03-10',
        duration: 30,
        location: 'Palas Iasi',
        categories: [{ id: 0, title: 'food' }],
        title: 'Meeting with Anca'
      },
      {
        id: 1,
        title: 'Breakdance practice',
        time: { h: 9, m: 30 },
        date: '2016-03-10',
        duration: 60,
        location: 'Podu Ros',
        categories: [{ id: 0, title: 'sports' }]
      },
      {
        id: 3,
        time: { h: 10, m: 30 },
        date: '2016-03-10',
        duration: 90,
        location: 'Universitatea Alexandru Ioan Cuza Iasi',
        categories: [{ id: 0, title: 'education' }],
        title: 'Curs Sisteme de Operare'
      },
    ];

    const eventsRendered = this.generateEvents(events);

    return (
      <div className='c-card-events'>
        <div className='col-xs-12'>
          <h5>Events</h5>
        </div>

        <div className='col-xs-12'>
          { eventsRendered }
        </div>
      </div>
    );

  }

}

export default EventsCard;
