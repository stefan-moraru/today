import FbUtils from 'common/utils/firebase';

const profile = () => {

  return new Promise((resolve, reject) => {

    const authData = FbUtils.ref.getAuth();

    const email = authData[authData.provider].email;
    const formattedEmail = email.toLowerCase().replace(/\./g, ',');

    FbUtils.getUserWithEmail(formattedEmail)
    .then(user => {

      const profileCardProps = {
        image: user.image,
        name: user.name,
        email: user.email,
        googleData: typeof user.googleData !== 'undefined',
        facebookData: typeof user.facebookData !== 'undefined',
        twitterData: typeof user.twitterData !== 'undefined'
      };

      resolve(profileCardProps);

    });

  });

};

export default {
  profile
};
