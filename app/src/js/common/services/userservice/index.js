import FbUtils from 'common/utils/firebase';

const profile = () => {

  return new Promise((resolve, reject) => {

    const authData = FbUtils.ref.getAuth();

    FbUtils.getUserWithAuthData(authData.provider, authData.uid.substr(authData.uid.indexOf(':') + 1, authData.length))
    .then(user => {

      const profileCardProps = {
        image: user.image,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        city: user.city,
        googleData: typeof user.googleData !== 'undefined',
        facebookData: typeof user.facebookData !== 'undefined',
        twitterData: typeof user.twitterData !== 'undefined',
        categories: user.categories
      };

      resolve(profileCardProps);

    });

  });

};

export default {
  profile
};
