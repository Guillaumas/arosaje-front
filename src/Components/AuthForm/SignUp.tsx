import React, {useContext, useState, useEffect} from 'react';
import '../../Styles/AuthForm.css';
import {AuthFormContext} from "../../Contexts/AuthFormContext";
import {RoleService} from '../../Services/RoleService';
import {AuthService} from "../../Services/AuthService";
import {useNavigate} from "react-router-dom";

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [streetName, setStreetName] = useState('');
    const [streetNumber, setStreetNumber] = useState(0);
    const [city, setCity] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [roleId, setRoleId] = useState(0);
    const [error, setError] = useState('');

    const navigate = useNavigate();



    const {setIsAuthFormLogin} = useContext(AuthFormContext);

    useEffect(() => {
        RoleService.getRoles()
            .then(roles => {
                const userRole = roles.find((role: { name: string, id: number }) => role.name === 'user');
                if (userRole) {
                    setRoleId(userRole.id);
                }
            })
            .catch(console.error);
    }, []);



    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();

        setUsernameError('');
        setPasswordError('');
        setEmailError('');

        if (username.trim() === '') {
            setUsernameError('Username is required');
        }

        if (password.trim() === '') {
            setPasswordError('Password is required');
        }

        if (email.trim() === '') {
            setEmailError('Email is required');
        }

        if (usernameError !== '' || passwordError !== '' || emailError !== '') {
            return;
        }

        const user = {
            username,
            password,
            email,
            firstName,
            lastName,
            country,
            zipCode,
            streetName,
            streetNumber,
            city,
            birthDate,
            roleId
        };

        if (streetName.trim() !== '' && streetNumber.toString().trim() !== '' && city.trim() !== '') {
            if (!streetNumber || !city || !streetName) {
                return setError('Please fill in all the fields');
            }
            else {
                user.city = city;
                user.streetName = streetName;
                user.streetNumber = streetNumber;
            }
        }

        try {
            const response = await AuthService.register(user);

            if (!response.ok) {
                throw new Error('Failed to register');
            }
            console.log('User registered successfully');
            navigate('/login');

        } catch (error) {
            console.error('Failed to register user:', error);
        }
    };

    return (
    <div className="login-background">
        <div className="form-container">
            <form onSubmit={handleSignUp} className="login-form">
                <label>
                    First Name
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                </label>
                <label>
                    Last Name
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                </label>
                <label>
                    Country
                    <input type="text" value={country} onChange={e => setCountry(e.target.value)}/>
                </label>
                <label>
                    Zip Code
                    <input type="text" value={zipCode} onChange={e => setZipCode(e.target.value)}/>
                </label>
                <label>
                    Street Name
                    <input type="text" value={streetName} onChange={e => setStreetName(e.target.value)}/>
                </label>
                <label>
                    Street Number
                    <input type="number" value={streetNumber}
                           onChange={e => setStreetNumber(Number(e.target.value))}/>
                </label>
                <label>
                    City
                    <input type="text" value={city} onChange={e => setCity(e.target.value)}/>
                </label>
                <label>
                    Birth Date
                    <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)}/>
                </label>
                <label>
                    Username <sup style={{fontSize: '0.6em'}}>*</sup>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                </label>
                <label>
                    Password <sup style={{fontSize: '0.6em'}}>*</sup>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
                <label>
                    Email <sup style={{fontSize: '0.6em'}}>*</sup>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </label>
                <input type="submit" value="Sign Up" className="button-connect"/>
                <div className="login-text">
                    Already have an account? <button onClick={() => setIsAuthFormLogin(true)}>Log in</button>
                </div>
                <div className="text-asterisk">
                    * Required fields
                </div>
                <div className="text-rights">
                    By signing up, you agree to our Terms and Conditions. Learn how we collect,
                    use and share your data by reading our Privacy Policy and how we
                    use cookies and similar technologies in our Cookie Policy.
                </div>
            </form>
        </div>
    </div>
);
}

export default SignUp;