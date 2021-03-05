import { AxiosError } from "axios";
import React, { useState } from "react";
import { loginService } from "./services/auth.service";

const Form: React.FC = () => {
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [error, setError] = useState<String>("");
  const [token, setToken] = useState<String>("");
  const inputUsername = "username";
  const inputPassword = "password";

  const handleChange = ({ target }) => {
    if (target.name === inputUsername) {
      setUsername(target.value);
    }
    if (target.name === inputPassword) {
      setPassword(target.value);
    }
  };

  const handleSumbit = async (event) => {
    event.preventDefault();
    setError("");
    setToken("");
    try {
      const response = await loginService(username, password);
      setToken(response.data.token)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSumbit}>
      <label htmlFor="username-input">Username</label>
      <input
        id="username-input"
        name={inputUsername}
        type="text"
        placeholder="Write here..."
        onChange={handleChange}
      />
      <label htmlFor="password-input">Password</label>
      <input
        id="password-input"
        name={inputPassword}
        type="text"
        placeholder="Write here..."
        onChange={handleChange}
      />
      <button type="submit">Login</button>
      {error &&
        <strong style={{color: "red"}}>{error}</strong>
      }
      {token &&
        <strong style={{color: "green"}}>{token}</strong>}
    </form>
  );
};

export default Form;
