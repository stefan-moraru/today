const getGoals = () => {

  return new Promise((resolve, reject) => {

    const goals = [
      {
        id: 1,
        days: [ 3, 6 ],
        doneOn: [ '2016-03-02', '2016-03-05' ],
        title: 'Mancat sanatos',
        description: 'Fara fast-food sau dulciuri. Cel mult 2000 de calorii.',
        minDays: 100
      },
      {
        id: 2,
        days: [ 0, 1, 2, 3, 4, 5, 6 ],
        doneOn: [ '2016-03-02', '2016-03-05', '2016-04-01' ],
        title: 'Exercitii fizice',
        description: 'Alergat cel putin 2km sau mers la sala timp de o ora.',
        duration: 30,
        minDays: 5
      },
      {
        id: 3,
        days: [ 1, 2, 3, 4, 5 ],
        doneOn: [ '2016-03-02', '2016-03-05', '2016-04-01' ],
        title: 'Invatat pentru facultate',
        description: 'Alergat cel putin 2km sau mers la sala timp de o ora.',
        duration: 90
      },
      {
        id: 4,
        days: [ 2 ],
        doneOn: [ '2016-01-05', '2016-03-15', '2016-04-01' ],
        title: 'Dansat',
        description: 'Mers la sala de dans',
        location: 'Quasar Dance Iasi',
        duration: 250,
        minDays: 2
      }
    ];

    resolve(goals);

  });

};

export default {
  getGoals: getGoals
};
