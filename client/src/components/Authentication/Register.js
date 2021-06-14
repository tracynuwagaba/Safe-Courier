import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const Register = ({ registerUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
      confirmPassword,
    };
    registerUser(newUser);
  };

  return (
    <div className="register-wrapper">
      <div className="row">
        <div className="returnHome">
          <Link to="/" className="link">
            <i className="fas fa-backspace"></i>Return Home
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="text-center registerText">
          <h3>Create an account</h3>
          <p>
            Already have an account?
            <Link to="/login" className="link">
              Log In
            </Link>
          </p>
        </div>
      </div>

      <div className="row">
        <div className="text-center">
          <form noValidate onSubmit={handleSubmit} action="">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <span className="text-light">{errors.name}</span>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                error={errors.name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <span className="text-light">{errors.email}</span>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                error={errors.email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <span className="text-light">{errors.password}</span>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                error={errors.password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <span className="text-light">{errors.confirmPassword}</span>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                error={errors.confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password..."
              />
            </div>

            <button type="submit">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

export default Register;
