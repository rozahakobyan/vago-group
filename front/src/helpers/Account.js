class Account {
  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static getToken() {
    return localStorage.getItem('token') || null;
  }

  static deleteStrong() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  static getUser() {
    try {
      return JSON.parse(localStorage.getItem('user')) || {};
    } catch (e) {
      return {};
    }
  }

  static setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export default Account;
