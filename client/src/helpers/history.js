import { createBrowserHistory } from 'history';
let history;

if (typeof document !== 'undefined') {
  history = createBrowserHistory();
}

export { history };
