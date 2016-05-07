import Firebase from 'firebase';
import EventsService from 'common/services/eventservice';
import moment from 'moment';
import uuid from 'node-uuid';

const ref = new Firebase('https://today-app.firebaseio.com');

const getCommunities = () => {

  return new Promise((resolve, reject) => {

    ref
    .child('communities')
    .once('value', function(snapshot) {
      resolve(snapshot.val());
    });

  });

};

const getUsers = () => {

  return new Promise((resolve, reject) => {

    ref
    .child('users')
    .once('value', function(snapshot) {
      resolve(snapshot.val());
    });

  });

};

const getUserWithAuthData = (provider, id) => {

  return getUsers()
  .then(users => {

    let found = null;

    if (users) {

      Object.keys(users).forEach(userEmail => {
        const usr = users[userEmail];
        const parsed = (usr[`${provider}Data`] || {}).id;

        if (parsed === id) {
          found = users[userEmail];
        }
      });

    }

    return found;

  });

};

const getUserWithEmail = (email) => {

  email = email.toLowerCase().replace(/\./g, ',');

  return getUsers()
  .then(users => {

    let found = null;

    if (users) {
      Object.keys(users).forEach(userEmail => {
        const parsed = userEmail.toLowerCase().replace(/\./g, ',');

        if (parsed === email) {
          found = users[userEmail];
        }
      });

    }

    return found;

  });

};


const getEventsForUser = (email) => {

  return new Promise((resolve, reject) => {

    FbUtils.getUserWithEmail(email)
    .then(user => {
      resolve(user.events);
    });

  });

};

const getCurrentUser = () => {

  const authData = FbUtils.ref.getAuth();

  return new Promise((resolve, reject) => {

    FbUtils.getUserWithEmail(authData[authData.provider].email)
    .then(user => {
      resolve(user);
    });

  });

};

const getEventsForCurrentUser = () => {

  const authData = FbUtils.ref.getAuth();

  return new Promise((resolve, reject) => {

    FbUtils.getUserWithEmail(authData[authData.provider].email)
    .then(user => {
      resolve(user.events);
    });

  });

};

const getGoalsForCurrentUser = () => {

  const authData = FbUtils.ref.getAuth();

  return new Promise((resolve, reject) => {

    FbUtils.getUserWithEmail(authData[authData.provider].email)
    .then(user => {
      resolve(user.goals);
    });

  });

};

const getEventsToday = () => {

  const today = moment().format('YYYY-MM-DD');

  return new Promise((resolve, reject) => {
    return getEventsForCurrentUser()
    .then(events => {
      resolve(events.filter(event => {
        return event.date === today;
      }));
    });
  });

};

const getRef = () => {

  return ref;

};

const updateUserWithEmail = (email, updated) => {

  FbUtils.ref
  .child('users')
  .child(email.toLowerCase().replace(/\./g, ','))
  .update(updated);

};

const createEvent = (event) => {

  return new Promise((resolve, reject) => {

    getCurrentUser()
    .then(user => {
      user.events = user.events || [];
      user.events = user.events.filter(ev => ev.id !== event.id);

      event.id = uuid.v1();
      event.image = EventsService.backgroundImageFromCategories(event);

      user.events.push(event);

      updateUserWithEmail(user.email, user);

      resolve(user);
    });

  });

};

const deleteEvent = (event) => {

  return new Promise((resolve, reject) => {

    getCurrentUser()
    .then(user => {
      user.events = user.events || [];
      user.events = user.events.filter(ev => ev.id !== event.id);

      updateUserWithEmail(user.email, user);

      resolve(user);
    });

  });

};

const createGoal = (goal) => {

  return new Promise((resolve, reject) => {

    getCurrentUser()
    .then(user => {
      user.goals = user.goals || [];
      user.goals = user.goals.filter(gl => gl.id !== goal.id);

      goal.id = uuid.v1();

      user.goals.push(goal);

      updateUserWithEmail(user.email, user);

      resolve(user);
    });

  });

};

const deleteGoal = (goal) => {

  return new Promise((resolve, reject) => {

    getCurrentUser()
    .then(user => {
      user.goals = user.goals || [];
      user.goals = user.goals.filter(gl => gl.id !== goal.id);

      updateUserWithEmail(user.email, user);

      resolve(user);
    });

  });

};

const FbUtils = {
  ref: new Firebase('https://today-app.firebaseio.com'),
  getRef: getRef,
  getUsers: getUsers,
  getUserWithEmail: getUserWithEmail,
  getEventsForCurrentUser: getEventsForCurrentUser,
  getEventsForUser: getEventsForUser,
  getEventsToday: getEventsToday,
  getUserWithAuthData: getUserWithAuthData,
  createEvent: createEvent,
  deleteEvent: deleteEvent,
  getGoalsForCurrentUser: getGoalsForCurrentUser,
  createGoal: createGoal,
  deleteGoal: deleteGoal,
  getCommunities: getCommunities
};

export default FbUtils;
