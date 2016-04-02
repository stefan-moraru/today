const AuthenticationService = {

  login() {

    return;

  },

  logout(callback) {

    localStorage.deleteItem('delete');

    if (callback) {

      callback();

    }

    this.onChange(false);

  },

  logged() {

    //TODO

    return true || localStorage.getItem('token') !== null;

  },

  token() {

    return localStorage.getItem('token');

  },

  onChange() {

    return;

  }

};

export default AuthenticationService;
