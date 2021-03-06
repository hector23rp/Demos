import React, { useState } from "react";

import { FormProps } from "./form.type";

const Form: React.FC<FormProps> = ({ authService, hasConfirmPassword }) => {
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [confirmPassword, setConfirmPassword] = useState<String>("");
  const [error, setError] = useState<String>("");
  const [token, setToken] = useState<String>("");
  const inputUsername = "username";
  const inputPassword = "password";
  const inputConfirmPassword = "confirm-password";

  const handleChange = ({ target }) => {
    if (target.name === inputUsername) {
      setUsername(target.value);
    }
    if (target.name === inputPassword) {
      setPassword(target.value);
    }
    if (hasConfirmPassword && target.name === inputConfirmPassword) {
      setConfirmPassword(target.value);
    }
  };

  const handleSumbit = async (event) => {
    event.preventDefault();
    setError("");
    setToken("");
    try {
      authService.setBody({username, password});
      const response = await authService.authService();
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
      { hasConfirmPassword &&
        <> 
          <label htmlFor="confirm-password-input">Confirm Password</label>
          <input
            id="confirm-password-input"
            name={inputConfirmPassword}
            type="text"
            placeholder="Write here..."
            onChange={handleChange}
          />
        </>
      }
      <button type="submit">Submit</button>
      {error &&
        <strong style={{color: "red"}}>{error}</strong>
      }
      {token &&
        <strong style={{color: "green"}}>{token}</strong>}
    </form>
  );
};

export default Form;
