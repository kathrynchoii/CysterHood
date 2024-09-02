import React, { useState } from 'react';
import { useEffect } from 'react';
import './LoginSignup.css';
// import { useGoogleAuth } from '../../googleAuth';

import user_icon from '../Assets/user.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password-lock.png';
import hide_password_icon from '../Assets/password-eye-closed.png';
import show_password_icon from '../Assets/password-eye-open.png';
// import evergreen_logo from '../Assets/evergreenlogo.png';

export const LoginSignup = () => {
    const [action, setAction] = useState("Sign Up");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(null);
    const [resetPassword, setResetPassword] = useState(false); // State for password reset page
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    // useGoogleAuth();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const evaluatePasswordStrength = (password) => {
        // Password length check
        if (password.length < 8) {
            return "Weak: Password must be at least 8 characters long";
        }

        // Special symbol check
        const specialSymbolsRegex = /[$&%!@?]/;
        if (!specialSymbolsRegex.test(password)) {
            return "Weak: Password must contain at least one special symbol ($&%!@?)";
        }

        // Character types check
        const containsUpperCase = /[A-Z]/.test(password);
        const containsLowerCase = /[a-z]/.test(password);
        const containsNumber = /[0-9]/.test(password);

        if (!containsUpperCase || !containsLowerCase || !containsNumber) {
            return "Weak: Password must contain at least one uppercase letter, one lowercase letter, and one number";
        }

        const characterTypeCount = [containsUpperCase, containsLowerCase, containsNumber].filter(Boolean).length;
        if (characterTypeCount < 2) {
            return "Medium: Password must contain characters from at least two of the following: uppercase letters, lowercase letters, and numbers";
        }

        // If password passes all checks
        return "Strong";
    };

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        const strength = evaluatePasswordStrength(password);
        setPasswordStrength(strength);
        setNewPassword(password);
    };

    const handleConfirmPasswordChange = (event) => {
        const confirmPassword = event.target.value;
        setConfirmPassword(confirmPassword);
        setPasswordsMatch(newPassword === confirmPassword);
    };

    const handleResetPasswordClick = () => {
        setAction("Password Reset");
        setResetPassword(true);
    };

    const handleActionChange = (newAction) => {
        setAction(newAction);
        setResetPassword(false); // Reset password state when switching action
    };

    return (
        <div className='container'>
            <div className="header">
                {/* <img src={evergreen_logo} alt="" /> */}
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            {resetPassword ? (
                <div className="inputs">
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type={showPassword ? "text" : "password"} placeholder="New Password" onChange={handlePasswordChange} />
                        <div className="toggle-password" onClick={togglePasswordVisibility}>
                            {showPassword ? <img src={hide_password_icon} alt="Hide Password" /> : <img src={show_password_icon} alt="Show Password" />}
                        </div>
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type={showPassword ? "text" : "password"} placeholder="Confirm New Password" onChange={handleConfirmPasswordChange} />
                        <div className="toggle-password" onClick={togglePasswordVisibility}>
                            {showPassword ? <img src={hide_password_icon} alt="Hide Password" /> : <img src={show_password_icon} alt="Show Password" />}
                        </div>
                    </div>
                    {!passwordsMatch && <div className="password-error">Passwords do <span className="not-match">NOT</span> match</div>}
                </div>
            ) : (
                <div>
                    <div className="inputs">
                        {action === "Login" ? <div></div> : (
                            <div className="input">
                                <img src={user_icon} alt="" />
                                <input type="text" placeholder="Name" />
                            </div>
                        )}
                        <div className="input">
                            <img src={email_icon} alt="" />
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={handlePasswordChange} />
                            <div className="toggle-password" onClick={togglePasswordVisibility}>
                                {showPassword ? <img src={hide_password_icon} alt="Hide Password" /> : <img src={show_password_icon} alt="Show Password" />}
                            </div>
                        </div>
                        {action === "Sign Up" && passwordStrength && <div className="password-strength">Password Strength: {passwordStrength}</div>}
                    </div>
                    <div className="or-divider">
                        <div className="divider"></div>
                        <div className="or-text">or</div>
                        <div className="divider"></div>
                    </div>
                    {/* <div id="googleSignInDiv"></div> */}
                </div>
            )}
            {action === "Login" ? (
                <div className="forgot-password" onClick={handleResetPasswordClick}>
                    Forgot password? <span>Click Here!</span>
                </div>
            ) : null}
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => handleActionChange("Sign Up")}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => handleActionChange("Login")}>Login</div>
            </div>
        </div>
    );
};

export default LoginSignup;
