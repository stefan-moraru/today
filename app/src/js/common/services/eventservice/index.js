let events = [
  {
    id: 10,
    time: { h: 7, m: 0 },
    date: '2016-04-08',
    duration: 30,
    location: 'CUG Iasi',
    category: { id: 0, title: 'food' },
    title: 'Meeting with Anca',
    description: 'Buna ziua sunt un dinozaur'
  },
  {
    id: 0,
    time: { h: 8, m: 30 },
    date: '2016-04-11',
    duration: 30,
    location: 'CUG Iasi',
    category: { id: 0, title: 'food' },
    title: 'Meeting with Anca',
    description: 'Buna ziua sunt un dinozaur'
  },
  {
    id: 1,
    title: 'Breakdance practice',
    time: { h: 15, m: 0 },
    date: '2016-04-04',
    duration: 580,
    location: 'Podu Ros',
    category: { id: 0, title: 'sports' },
    description: 'Buna ziua sunt un dinozaur',
    attendees: [
      { name: 'Carmen', image: 'http://static.tumblr.com/402de64fa71db5f91f427d18092129bb/b4ieo2z/0fHn58aid/tumblr_static_63q57z78gpcss40sg4g0wc004.png' },
      { name: 'Gabriel', image: 'http://b-i.forbesimg.com/faraigundan/files/2014/01/Aliko-Dangote-2.jpeg' },
      { name: 'Stefan', image: 'https://pbs.twimg.com/profile_images/670304972370669568/hm3GGbF1.jpg' },
      { name: 'Dragos', image: 'http://ichef.bbci.co.uk/images/ic/256x256/p01bqmbw.jpg' },
      { name: 'Carmen', image: 'http://static.tumblr.com/402de64fa71db5f91f427d18092129bb/b4ieo2z/0fHn58aid/tumblr_static_63q57z78gpcss40sg4g0wc004.png' },
      { name: 'Gabriel', image: 'http://b-i.forbesimg.com/faraigundan/files/2014/01/Aliko-Dangote-2.jpeg' },
      { name: 'Stefan', image: 'https://pbs.twimg.com/profile_images/670304972370669568/hm3GGbF1.jpg' },
      { name: 'Dragos', image: 'http://ichef.bbci.co.uk/images/ic/256x256/p01bqmbw.jpg' },
      { name: 'Carmen', image: 'http://static.tumblr.com/402de64fa71db5f91f427d18092129bb/b4ieo2z/0fHn58aid/tumblr_static_63q57z78gpcss40sg4g0wc004.png' },
      { name: 'Gabriel', image: 'http://b-i.forbesimg.com/faraigundan/files/2014/01/Aliko-Dangote-2.jpeg' },
      { name: 'Stefan', image: 'https://pbs.twimg.com/profile_images/670304972370669568/hm3GGbF1.jpg' },
      { name: 'Dragos', image: 'http://ichef.bbci.co.uk/images/ic/256x256/p01bqmbw.jpg' }
    ]
  },
  {
    id: 3,
    time: { h: 9, m: 0 },
    date: '2016-04-06',
    duration: 90,
    location: 'Universitatea Alexandru Ioan Cuza Iasi',
    category: { id: 0, title: 'education' },
    title: 'Curs Sisteme de Operare',
    description: 'Buna ziua sunt un dinozaur'
  },
  {
    id: 4,
    time: { h: 1, m: 0 },
    date: '2016-04-24',
    duration: 240,
    location: 'Parcul Copou',
    category: { id: 0, title: 'education' },
    title: 'Voluntariat',
    attendees: [
      { name: 'Gabriel', image: 'http://b-i.forbesimg.com/faraigundan/files/2014/01/Aliko-Dangote-2.jpeg' },
      { name: 'Stefan', image: 'https://pbs.twimg.com/profile_images/670304972370669568/hm3GGbF1.jpg' }
    ]
  },
  {
    id: 5,
    time: { h: 6, m: 30 },
    date: '2016-03-30',
    duration: 120,
    location: 'Podu Ros',
    category: { id: 0, title: 'sports' },
    title: 'Running',
    description: 'Run, Forest, run !'
  },
  {
    id: 6,
    time: { h: 2, m: 0 },
    date: '2016-03-04',
    duration: 90,
    location: 'Palas Mall Iasi',
    category: { id: 0, title: 'meditation' },
    title: 'Meditating'
  }
];

events = [ events[0], events[1], events[2] ];

const getEvents = () => {
  return new Promise((resolve, reject) => {
    resolve(events);
  });
};

const getTodayEvents = () => {
  return new Promise((resolve, reject) => {
    resolve(events);
  });
};

const createEvent = (event) => {
  return new Promise((resolve, reject) => {

    resolve('ok');
/*
id: 6,
time: { h: 20, m: 0 },
date: '2016-03-30',
duration: 90,
location: 'Palas Mall Iasi',
category: { id: 0, title: 'meditation' },
title: 'Meditating'
*/
  });
};

export default {
  getTodayEvents: getTodayEvents,
  getEvents: getEvents,
  createEvent: createEvent
};
