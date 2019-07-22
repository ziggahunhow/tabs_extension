import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AuthMethods from '../../helpers/AuthMethods';
import { history } from '../../helpers/history';
import { UserContext } from '../Layout';

export default function Menu() {
  const item = {
    home: ['/', 'Home'],
    login: ['login', 'Log in'],
    register: ['register', 'Sign up'],
    tabs: ['tabs', 'Tabs']
  };
  const { userState, setlogin } = useContext(UserContext);
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    userState.uid ? setloggedIn(true) : setloggedIn(false);
  }, [userState.uid]);

  return (
    <ul className="header-menu">
      {Object.keys(item)
        .filter(key =>
          loggedIn
            ? !['register', 'login'].includes(key)
            : !['tabs'].includes(key)
        )
        .map(page => (
          <li className="header-menu-item" key={page}>
            <NavLink to={item[page][0]}>{item[page][1]}</NavLink>
          </li>
        ))}
      {loggedIn && (
        <li
          className="header-menu-item"
          onClick={() => {
            AuthMethods.logout();
            setlogin(false);
            history.push('/');
          }}
        >
          Log out
        </li>
      )}
    </ul>
  );
}
