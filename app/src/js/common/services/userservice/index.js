const profile = () => {

  return new Promise((resolve, reject) => {

    const profileCardProps = {
      image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAatAAAAJDI5NDdiMTUyLTJjODUtNDg1ZC05YmNmLTcxMWIwZDkzYzgyMg.jpg',
      name: 'Stefan Moraru',
      xp: 1020
    };

    resolve(profileCardProps);

  });

};

export default {
  profile
};
