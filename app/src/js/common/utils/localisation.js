const localise = (content) => {

  const language = 'RO';

  const contentRO = {
    'Home': 'Acasă',
    'Today': 'Astăzi',
    'Calendar': 'Calendar',
    'Goals': 'Goals',
    'Login': 'Logare',
    'Logout': 'Logout',
    'Settings': 'Setări'
  };

  let translated = content;

  if (contentRO[content]) {
    translated = contentRO[content];
  }

  return translated;

};

export default localise;
