import Firebase from 'firebase';
import moment from 'moment';

const ref = new Firebase('https://today-app.firebaseio.com');

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
        const parsed = (usr[provider] || {}).id;

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

const getEventsForCurrentUser = () => {

  const authData = FbUtils.ref.getAuth();

  return new Promise((resolve, reject) => {

    FbUtils.getUserWithEmail(authData[authData.provider].email)
    .then(user => {
      resolve(user.events);
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

const FbUtils = {
  ref: new Firebase('https://today-app.firebaseio.com'),
  getRef: getRef,
  getUsers: getUsers,
  getUserWithEmail: getUserWithEmail,
  getEventsForCurrentUser: getEventsForCurrentUser,
  getEventsForUser: getEventsForUser,
  getEventsToday: getEventsToday,
  getUserWithAuthData: getUserWithAuthData
};

export default FbUtils;
