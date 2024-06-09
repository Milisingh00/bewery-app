import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from './firebase'; // Adjust the path as needed
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error messages

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        createdAt: new Date(),
      });

      console.log('User created successfully, navigating...');
      navigate('/', { state: { name } });  // Pass name to the home page
    } catch (err) {
      console.error('Firebase registration error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please use a different email.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error occurred. Please try again.');
      } else if (err.code === 'auth/invalid-api-key') {
        setError('Invalid API key. Please check your Firebase configuration.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password.');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col">
            <div className="card my-4">
              <div className="row g-0">
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-3">Create an Account</h3>
                    <h6>Enter your details below</h6>
                    <form onSubmit={handleSubmit}>
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              className="border-0 border-bottom border-dark w-100"
                              placeholder="Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="email"
                              className="border-0 border-bottom border-dark w-100"
                              placeholder="Email or Phone Number"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="password"
                                className="border-0 border-bottom border-dark w-100"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="password"
                                className="border-0 border-bottom border-dark w-100"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-column justify-content-end pt-3 col-xl-5">
                        <button className="btn btn-danger btn-lg">
                          Create an Account
                        </button>
                      </div>
                    </form>
                    <div className="d-flex gap-3 pt-3 ">
                      <p>Already have an account?</p>
                      <Link to="/">
                        <span className='text-danger text-decoration-none'>Log in</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
