import Firebase from 'firebase';
import Utils from 'common/utils';

class FbUtils {

  constructor() {

    this.ref = new Firebase('https://today-app.firebaseio.com');

  }

  getUsers() {

    return new Promise((resolve, reject) => {

      ref
      .child('users')
      .once('value', function(snapshot) {
        resolve(snapshot.val());
      });

    });

  }

  getUserWithEmail(email) {

    return this.getUsers()
    .then(users => {

      let found = null;

      Object.keys(users).forEach(userEmail => {
        const parsed = userEmail.toLowerCase().replace(/\,/g, '.');

        if (parsed === email) {
          found = true;
        }
      });

      return found;

    });

  }

}

export default FbUtils;
