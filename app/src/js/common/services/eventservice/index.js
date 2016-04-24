import FbUtils from 'common/utils/firebase';

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

const getHikes = () => {
  return new Promise((resolve, reject) => {
    resolve(hikes);
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

const deleteEvent = (event) => {
  return new Promise((resolve, reject) => {
    resolve('ok');
  });
};

export default {
  getTodayEvents: getTodayEvents,
  getEvents: getEvents,
  createEvent: createEvent,
  deleteEvent: deleteEvent,
  getHikes: getHikes
};
