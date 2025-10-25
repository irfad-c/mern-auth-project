import React, { useState, useContext, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { user, login } = useContext(AuthContext);

  const navigate = useNavigate();

  /*If a logged-in user somehow lands on the login page,
this effect automatically redirects them to the home page.
Prevents logged-in users from seeing the login form again.*/
  useEffect(() => {
    if (user) navigate("/");
    //[navigate] is included in the dependency array to follow React’s rule that all values used inside useEffect must be listed, even if navigate does not change.We used navigate variable inside useEffect.So we included it in the dependency array also.
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    //e.preventDefault() — stops the form from refreshing the page.
    e.preventDefault();
    try {
      //sends the login credentials to your backend route /api/auth/login.
      const res = await API.post("/auth/login", form);
      /*If login succeeds:
        Backend responds with user and token.
        login() saves them in the global context and localStorage.*/
        //res.data = body of the response
        //spread operator:copy all properties inside res.data.user into a new object.
      login({ ...res.data.user, token: res.data.token });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
