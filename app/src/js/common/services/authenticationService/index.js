const AuthenticationService = {

  login() {

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

    return true;

    return localStorage.getItem('token') !== null;

  },

  token() {

    return localStorage.getItem('token');

  },

  onChange() {

  }

};

export default AuthenticationService;
