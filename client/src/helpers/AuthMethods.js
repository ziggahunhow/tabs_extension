/*global chrome*/
import decode from 'jwt-decode';

export default class AuthMethods {
  static loggedIn = async () => {
    const token = await this.getToken();
    console.log('Login status: ', !!token || !this.tokenExpired(token));
    return !!token || this.tokenExpired(token) ? true : false;
  };

  static getToken = () => {
    let token = '';
    return new Promise(resolve => {
      chrome.storage.sync.get(['token'], res => {
        token = res['token'];
        resolve(token);
      });
    });
  };

  static setToken = token => {
    // return localStorage.setItem('token', token);
    return chrome.storage.sync.set({ token }, () => {
      return token;
    });
  };

  static getLoggedInInfo = async () => {
    let loggedInInfo = decode(await AuthMethods.getToken());
    return loggedInInfo;
  };

  static tokenExpired = token => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // token expired
        return true;
      } else return false;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
  static logout = () => {
    // localStorage.removeItem('token');
    chrome.storage.sync.remove('token', items => {
      console.log('logged out');
    });
  };
}
