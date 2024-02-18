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
        // Initialize useNavigate hook
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
                        Prénom
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    </label>
                    <label>
                        Nom
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                    </label>
                    <label>
                        Pays
                        <input type="text" value={country} onChange={e => setCountry(e.target.value)}/>
                    </label>
                    <label>
                        Code postal
                        <input type="text" value={zipCode} onChange={e => setZipCode(e.target.value)}/>
                    </label>
                    <label>
                        Nom de la rue
                        <input type="text" value={streetName} onChange={e => setStreetName(e.target.value)}/>
                    </label>
                    <label>
                        Numéro de rue
                        <input type="number" value={streetNumber}
                               onChange={e => setStreetNumber(Number(e.target.value))}/>
                    </label>
                    <label>
                        Ville
                        <input type="text" value={city} onChange={e => setCity(e.target.value)}/>
                    </label>
                    <label>
                        Date de naissance
                        <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)}/>
                    </label>
                    <label>
                        Nom d'utilisateur <sup style={{fontSize: '0.6em'}}>*</sup>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                    </label>
                    <label>
                        Mot de passe <sup style={{fontSize: '0.6em'}}>*</sup>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <label>
                        Email <sup style={{fontSize: '0.6em'}}>*</sup>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </label>
                    <input type="submit" value="Sign Up" className="button-connect"/>
                    <div className="login-text">
                        Vous avez déjà un compte ? <span onClick={() => setIsAuthFormLogin(true)}>Connectez-vous</span>
                    </div>
                    <div className="text-asterisk">
                        * Champs obligatoires
                    </div>
                    <div className="text-rights">
                        En vous inscrivant, vous acceptez nos Conditions générales. Découvrez comment nous recueillons,
                        utilisons et partageons vos données en lisant notre Politique de confidentialité et comment nous
                        utilisons les cookies et autres technologies similaires dans notre Politique en matière de
                        cookies.
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;