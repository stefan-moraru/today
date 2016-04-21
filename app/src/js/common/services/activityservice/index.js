const getActivities = () => {

  return new Promise((resolve, reject) => {

    const goals = [
      {
        id: 1,
        title: 'Running',
        good: true,
        spent: [
          { duration: 40, date: new Date("2016-04-18").getTime() },
          { duration: 90, date: new Date("2016-04-20").getTime() },
          { duration: 10, date: new Date("2016-04-21").getTime() },
          { duration: 40, date: new Date("2016-04-22").getTime() },
          { duration: 50, date: new Date("2016-04-18").getTime() }
        ]
      },
      {
        id: 2,
        title: 'Browsing 9gag',
        good: false,
        spent: [
          { duration: 20, date: new Date("2016-04-19").getTime() },
          { duration: 50, date: new Date("2016-04-20").getTime() },
          { duration: 90, date: new Date("2016-04-21").getTime() },
          { duration: 20, date: new Date("2016-04-22").getTime() },
          { duration: 50, date: new Date("2016-04-18").getTime() }
        ]
      }
    ];

    resolve(goals);

  });

};

export default {
  getActivities: getActivities
};
