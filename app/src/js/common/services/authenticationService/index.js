/* eslint-disable */
import moment from 'moment';
import FbUtils from 'common/utils/firebase';

function loadEvents() {

  return new Promise((resolve, reject) => {
    var request = gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'showDeleted': false,
      'timeMin': moment('2016-03-15', 'YYYY-MM-DD').toISOString(),
      'singleEvents': true,
      'maxResults': 30,
      'orderBy': 'startTime'
    });

    request.execute(function(resp) {
      let _events = [];
      var events = resp.items;

      if (events.length > 0) {
        for (let i = 0; i < events.length; i++) {
          const event = events[i];

          const start = moment(event.start.dateTime);
          const end = moment(event.end.dateTime);
          const duration = (end.hour() * 60 + end.minute()) - (start.hour() * 60 + start.minute());

          const eventConstructed = {
            id: event.id || '',
            location: event.location || '',
            description: event.description || '',
            title: event.summary || '',
            creator: {
              name: event.creator.displayName || '',
              email: event.creator.email
            },
            date: moment(event.start.dateTime, 'YYYY-MM-DD').format('YYYY-MM-DD'),
            time: {
              h: start.hour(),
              m: start.minute()
            },
            duration: duration || 0
          };

          _events.push(eventConstructed)

        }
      }

      resolve(_events);
    });
  });

}

const AuthenticationService = {

  loginWithProvider(provider) {

    let scopes = {
      scope: 'email'
    };

    if (provider === 'google') {
      scopes = {
        scope: 'email, https://www.googleapis.com/auth/calendar'
      }
    }

    FbUtils.ref.authWithOAuthPopup(provider, function(error, authData) {

      if (authData) {
        const providerData = authData[provider];
        const id = providerData.id;
        const email = providerData.email;
        const displayName = providerData.displayName;
        const image = providerData.profileImageURL;
        const emailFormatted = email.toLowerCase().replace(/\./g, ',');

        FbUtils.getUserWithEmail(email)
        .then(found => {

          if (found) {
            // Log in
            console.log('found');
          } else {
            // Create
            let user = {
              email: email,
              name: displayName,
              image: image
            };

            user[`${provider}Data`] = authData[provider];

            FbUtils.ref
            .child('users')
            .child(emailFormatted)
            .set(user);

          }

          //TODO
          const token = {
            access_token: authData.google.accessToken //eslint-disable-line
          };

          gapi.auth.setToken(token); //eslint-disable-line
          gapi.client.load('calendar', 'v3', () => {
            loadEvents().then(events => {
              FbUtils.ref
              .child('users')
              .child(emailFormatted)
              .update({ events: events });

              window.location = '/today';
            });
          });

        });

      }

    }, scopes);

  },

  logout(callback) {

    FbUtils.ref.unauth();

  },

  logged() {

    const authData = FbUtils.ref.getAuth();
    let loggedIn = false;

    if (authData) {
      loggedIn = true;
    }

    return loggedIn;

  },

  token() {

    return localStorage.getItem('token');

  },

  onChange() {

    return;

  }

};

export default AuthenticationService;
