import FbUtils from 'common/utils/firebase';

const AuthenticationService = {

  loginWithProvider(provider) {

    FbUtils.ref.authWithOAuthPopup(provider, function(error, authData) {

      if (authData) {
        //Get user with this providers id
        /*
          user: {
            email: '',
            twitter: ..,
            google: ..,
            facebook: ..,
            twitterData: { },
            googleData: { },
            facebookData: { }
          }
        */
        const id = authData[provider].id;
        const email = authData[provider].email;
        const displayName = authData[provider].displayName;

        FbUtils.getUserWithEmail(email)
        .then(found => {

          if (found) {
            // Log in
          } else {
            // Create

            let user = {
              email: email,
              name: displayName
            };

            user[`${provider}Data`] = authData[provider];

            FbUtils.ref
            .child('users')
            .child(email.toLowerCase().replace(/\./g, ','))
            .set(user);

          }

        });

      }

    }, {
      scope: 'email'
    });

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
