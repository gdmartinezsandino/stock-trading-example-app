import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { TradingContext } from '../context/TradingProvider';

const Container = styled.div`
  max-width: 300px;
  margin: 30px auto;
  padding: 40px 25px;
  border-radius: 12px;
  box-shadow: 1px 2px 14px -1px rgba(0,0,0,0.75);
`;

const Login = () => {
  const { login } = useContext(TradingContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Container>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Login
        </button>
      </form>
    </Container>
  );
};

export default Login;
