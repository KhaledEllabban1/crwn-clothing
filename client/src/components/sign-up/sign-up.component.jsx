import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';
import {
    SignUpContainer,
    SignUpTitle
} from './sign-up.styles';

const SignUp = ({signUpStart}) => {

    const [ userCredentials, setCredentials ] = useState({
        displayName: '',
        email : '',
        password : '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        signUpStart({email, password, displayName});

        if (  password !== confirmPassword ) {
            alert(" Passwords don't match ");
            return;
        }

    };

    const handleChange = event =>{
        const {name , value} = event.target;
        setCredentials({...userCredentials, [name]:value });
    };

    return(
            <SignUpContainer>
                <SignUpTitle> I do not have a account</SignUpTitle>
                <span> Sign up with your email and password </span>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <FormInput
                     type="text"
                     name='displayName'
                     value={displayName}
                     onChange={handleChange}
                     label='DisplayName'
                     required
                     />
                    <FormInput
                     type="email"
                     name='email'
                     value={email}
                     onChange={handleChange}
                     label='Email'
                     required
                     />
                    <FormInput
                     type="password"
                     name='password'
                     value={password}
                     onChange={handleChange}
                     label='Password'
                     required
                     />
                    <FormInput
                     type="password"
                     name='confirmPassword'
                     value={confirmPassword}
                     onChange={handleChange}
                     label='confirmPassword'
                     required
                     />
                     <CustomButton type='submit' onClick={signUpStart} > SIGN UP </CustomButton>
                </form>

            </SignUpContainer>
        );
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);