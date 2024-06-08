import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'; // Adjust the path as needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error messages
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      navigate("/homepage");
    } catch (err) {
      console.error('Login error:', err);
      if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email. Please check your email and try again.');
      } else {
        setError('An error occurred during login. Please try again.');
      }
    }
  };

  return (
    <div>
      <section>
        <div className="container py-5">
          <div className="row d-flex">
            <div className="col">
              <div className="card justify-content-center align-items-center my-4">
                <div className="row g-0">
                  <div className="ol-xl-5 justify-content-center align-items-center">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-3">Log in to Exclusive</h3>
                      <h6>Enter your details below</h6>
                      <form onSubmit={handleSubmit}>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className="row">
                          <div className="mb-4 pt-5">
                            <div className="form-outline">
                              <input
                                type="email"
                                className="border-0 border-bottom border-dark"
                                placeholder="Email or Phone Number"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="mb-4">
                              <div className="form-outline">
                                <input
                                  type="password"
                                  className="border-0 border-bottom border-dark"
                                  placeholder="Password"
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="pt-3">
                            <button className="btn btn-danger btn-lg">
                              Login
                            </button>
                          </div>
                          <div>
                            <Link to="/signup">
                              <button
                                className="btn btn-lg ms-2 mt-2"
                                style={{ backgroundColor: "lightgrey" }}
                              >
                                New Account
                              </button>
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
