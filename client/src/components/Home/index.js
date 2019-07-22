import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../Layout';

export default function Home() {
  const { userState } = useContext(UserContext);
  return (
    <div className="home">
      <h1>WELCOME TO TABLESS</h1>
      {userState.uid ? (
        <NavLink to="tabs">Manage tabs</NavLink>
      ) : (
        <NavLink to="login">Please log in</NavLink>
      )}
    </div>
  );
}
