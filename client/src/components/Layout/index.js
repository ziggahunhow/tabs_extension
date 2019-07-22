import React, { useReducer, useEffect, useState } from 'react';
import Header from '../Header';
import AuthMethods from '../../helpers/AuthMethods';
import { history } from '../../helpers/history';
const user = {
  uid: '',
  email: ''
};

const userReducer = (userState, action) => {
  switch (action.type) {
    case 'login':
      return action.payload;
    case 'logout':
      return user;
    default:
      throw new Error();
  }
};
export const UserContext = React.createContext(user);

export default function Layout(props) {
  const [userState, dispatch] = useReducer(userReducer, user);
  const [login, setlogin] = useState(false);
  const [start, setstart] = useState(false);

  useEffect(() => {
    if (!start) {
      console.log('starting ext...');
      const checkLogin = async () => {
        try {
          const token = await AuthMethods.getLoggedInInfo();
          console.log('layout mounted, user token: ', token);
          dispatch({
            type: 'login',
            payload: { uid: token.id, email: token.email }
          });
          history.push('/tabs');
        } catch (error) {
          console.log('layout mounted, no login info', error);
          history.push('/');
        }
      };
      checkLogin();
      setstart(true);
    }
  }, [login, start]);

  useEffect(() => {
    const checkLogin = async () => {
      if (login) {
        try {
          const token = await AuthMethods.getLoggedInInfo();
          console.log('layout mounted, user token: ', token);
          dispatch({
            type: 'login',
            payload: { uid: token.id, email: token.email }
          });
        } catch (error) {
          console.log('layout mounted, user error', error);
        }
      } else {
        dispatch({
          type: 'logout'
        });
      }
    };
    checkLogin();
  }, [login]);

  return (
    <div className="layout">
      <UserContext.Provider value={{ userState, dispatch, setlogin }}>
        <Header />
        {props.children}
      </UserContext.Provider>
    </div>
  );
}
