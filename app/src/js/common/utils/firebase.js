import Firebase from 'firebase';

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

const getUserWithEmail = (email) => {

  return getUsers()
  .then(users => {

    let found = null;

    if (users) {

      Object.keys(users).forEach(userEmail => {
        const parsed = userEmail.toLowerCase().replace(/\,/g, '.');

        if (parsed === email) {
          found = users[userEmail];
        }
      });

    }

    return found;

  });

};

const getRef = () => {

  return ref;

};

const FbUtils = {
  ref: new Firebase('https://today-app.firebaseio.com'),
  getRef: getRef,
  getUsers: getUsers,
  getUserWithEmail: getUserWithEmail
};

export default FbUtils;
