import React, { useState } from 'react';
import { backendPostFn } from '../../helpers';

function SignUp(props) {
  const [error, setError] = useState(null);
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    const name = { name: input.name };
    if (input.password !== input.confirmPassword)
      return setError('Your passwords are not the same!');
    try {
      await backendPostFn(input, 'users/register');
    } catch (error) {
      setError(error.message.replace(/^.*:/, ''));
    }
  };

  return (
    <form className="login" onSubmit={e => handleSubmit(e)}>
      {['name', 'email', 'password', 'confirmPassword'].map(item => (
        <div className="input-field" key={item}>
          <label htmlFor={item}>{item}</label>
          <input
            name={item}
            id={item}
            value={input[item]}
            onChange={handleChange}
            type={
              item === 'email'
                ? 'email'
                : item.toLowerCase().includes('password')
                ? 'password'
                : 'text'
            }
          />
        </div>
      ))}
      <button>Submit</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default SignUp;
