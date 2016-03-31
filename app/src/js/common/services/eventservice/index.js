const getTodayEvents = () => {
    return new Promise((resolve, reject) => {
      resolve([
      {
        id: 0,
        time: { h: 7, m: 30 },
        date: '2016-03-31',
        duration: 30,
        location: 'CUG Iasi',
        categories: [{ id: 0, title: 'food' }],
        title: 'Meeting with Anca'
      },
      {
        id: 1,
        title: 'Breakdance practice',
        time: { h: 8, m: 0 },
        date: '2016-04-01',
        duration: 60,
        location: 'Podu Ros',
        categories: [{ id: 0, title: 'sports' }]
      },
      {
        id: 3,
        time: { h: 9, m: 0 },
        date: '2016-03-31',
        duration: 90,
        location: 'Universitatea Alexandru Ioan Cuza Iasi',
        categories: [{ id: 0, title: 'education' }, { id: 1, title: 'sports' }],
        title: 'Curs Sisteme de Operare'
      },
      {
        id: 4,
        time: { h: 12, m: 0 },
        date: '2016-03-30',
        duration: 30,
        location: 'Parcul Copou',
        categories: [{ id: 0, title: 'education' }, { id: 1, title: 'sports' }],
        title: 'Voluntariat'
      },
      {
        id: 5,
        time: { h: 16, m: 30 },
        date: '2016-03-30',
        duration: 90,
        location: 'Podu Ros',
        categories: [{ id: 0, title: 'sports' }],
        title: 'Running'
      },
      {
        id: 6,
        time: { h: 20, m: 0 },
        date: '2016-03-30',
        duration: 90,
        location: 'Palas Mall Iasi',
        categories: [{ id: 0, title: 'meditation' }],
        title: 'Meditating'
      }
    ]);
    });
};

export default {
  getTodayEvents: getTodayEvents
};
