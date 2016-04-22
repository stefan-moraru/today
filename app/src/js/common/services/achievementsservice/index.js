const ach0 = {
  title: 'Attender',
  description: 'Attend at least 5 events',
  done: (user) => {
    return ((user || {}).events || []).length > 5;
  }
};

const ach1 = {
  title: 'Connect with Twitter',
  description: 'Connect account to Twitter, so you can tweet goals.',
  done: (user) => {
    return typeof (user || {}).twitterData !== 'undefined';
  }
};

const ach2 = {
  title: 'Visit the Profile page',
  description: 'You just did it',
  done: (user) => {
    return true;
  }
};

const ach3 = {
  title: 'Connect with Google',
  description: 'Connecting to Google enables getting Calendar events.',
  done: (user) => {
    return typeof (user || {}).googleData !== 'undefined';
  }
};

let achievements = [
  ach0,
  ach1,
  ach2,
  ach3
];

const getAchievements = () => {
  return new Promise((resolve, reject) => {
    resolve(achievements);
  });
};

export default {
  getAchievements: getAchievements
};
