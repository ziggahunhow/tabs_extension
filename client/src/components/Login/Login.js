import React, { useState, useContext } from 'react';
import { backendPostFn } from '../../helpers';
import { history } from '../../helpers/history';
import AuthMethods from '../../helpers/AuthMethods';
import { UserContext } from '../Layout';

function Login(props) {
  const { setlogin } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [input, setInput] = useState({
    email: '',
    password: ''
  });
  const handleChange = event => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value
    });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const { token } = await backendPostFn(input, 'users/login');
      AuthMethods.setToken(token);
      setlogin(true);
      history.push('/');
    } catch (error) {
      setError(error.message.replace(/^.*:/, ''));
    }
  };

  return (
    <form className="login" onSubmit={e => handleSubmit(e)}>
      {['email', 'password'].map(item => (
        <div key={item}>
          <label htmlFor={item}>{item}</label>
          <input
            name={item}
            id={item}
            value={input[item]}
            onChange={handleChange}
            type={item}
          />
        </div>
      ))}
      <button>Submit</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;
