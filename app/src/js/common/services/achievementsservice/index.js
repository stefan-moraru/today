let ach = {
  title: 'Creator',
  description: 'Halllooooo',
  done: (user) => {
    return true;
  }
};

let ach1 = {
  title: 'Creator',
  description: 'Halllooooo',
  done: (user) => {
    return false;
  }
};

let achievements = [
  ach,
  ach,
  ach1,
  ach
];

const getAchievements = () => {
  return new Promise((resolve, reject) => {
    resolve(achievements);
  });
};

export default {
  getAchievements: getAchievements
};
