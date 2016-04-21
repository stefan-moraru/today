import FbUtils from 'common/utils/firebase';

const profile = () => {

  return new Promise((resolve, reject) => {

    const authData = FbUtils.ref.getAuth();

    FbUtils.getUserWithEmail(authData[authData.provider].email)
    .then(user => {

      const profileCardProps = {
        image: user.image,
        name: user.name
      };

      resolve(profileCardProps);

    });

  });

};

export default {
  profile
};
