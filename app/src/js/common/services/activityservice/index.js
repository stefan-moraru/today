const getActivities = () => {

  return new Promise((resolve, reject) => {

    const goals = [
      {
        id: 1,
        title: 'Running',
        good: true,
        spent: [
          { duration: 30, date: new Date().getTime() },
          { duration: 60, date: new Date().getTime() },
          { duration: 30, date: new Date().getTime() },
          { duration: 10, date: new Date().getTime() },
          { duration: 30, date: new Date().getTime() }
        ]
      },
      {
        id: 2,
        title: 'Browsing 9gag',
        good: false,
        spent: [
          { duration: 30, date: new Date().getTime() },
          { duration: 60, date: new Date().getTime() },
          { duration: 30, date: new Date().getTime() },
          { duration: 10, date: new Date().getTime() },
          { duration: 30, date: new Date().getTime() }
        ]
      }
    ];

    resolve(goals);

  });

};

export default {
  getActivities: getActivities
};
