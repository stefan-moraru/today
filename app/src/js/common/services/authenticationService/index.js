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

        const providerData = authData[provider];
        const id = providerData.id;
        const email = providerData.email;
        const displayName = providerData.displayName;
        const image = providerData.profileImageURL;

        FbUtils.getUserWithEmail(email)
        .then(found => {

          if (found) {
            // Log in
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
            .child(email.toLowerCase().replace(/\./g, ','))
            .set(user);

          }

          window.location = '/today';

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
