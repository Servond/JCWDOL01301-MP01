import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/register',
        {
          name,
          email,
          password,
        },
      );

      if (response.status === 201) {
        console.log('Registrasi berhasil!');
        // Handle registrasi berhasil (misalnya, redirect ke halaman login)
      } else {
        console.error('Registrasi gagal:', response.data);
      }
    } catch (error) {
      console.error('Error saat registrasi:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nama:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button type="submit">Daftar</button>
    </form>
  );
};

export default RegisterForm;
