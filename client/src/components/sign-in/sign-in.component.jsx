import React, {useState} from 'react';

// import './sign-in.styles.scss';

import { connect } from 'react-redux';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component';

import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
} from './sign-in.styles';

const SignIn = ({emailSignInStart, googleSignInStart}) => {

    const [ userCredentials, setCredentials ] = useState({ email : '', password: ''});

    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password)
    }
    
    const handleChange = event => {
        const {value, name} = event.target;
        setCredentials({...userCredentials, [name]: value })
    }
        return (
            <SignInContainer>
                <SignInTitle> I already have an account </SignInTitle>
                <span>  Sign in with your email and password </span>

                <form onSubmit = {handleSubmit} >

                    <FormInput
                    name='email'
                    type='email'
                    label='name'
                    value={email}
                    handleChange ={ handleChange}
                    required
                    />

                    <FormInput
                     name='password'
                     type='password'
                     label='password'
                     value={password}
                     handleChange ={ handleChange }
                     required
                    />

                    {/* <CustomButton type='submit'> Sign in </CustomButton> */}
                    <ButtonsBarContainer>
                        <CustomButton type='submit' onClick={ emailSignInStart } > Sign In </CustomButton> 
                        <CustomButton type='button' isGoogleSignIn onClick={ googleSignInStart }>  signInWithGoogle  </CustomButton>
                    </ButtonsBarContainer>
                   
                    
                </form>
            </SignInContainer>
        );
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export  default connect(null, mapDispatchToProps)(SignIn) ;