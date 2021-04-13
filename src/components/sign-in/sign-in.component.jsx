import React from 'react';

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

class SignIn extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email : '',
            password: ''
        }
    }
    handleSubmit = async event => {
        event.preventDefault();
        const { emailSignInStart } = this.props;
        const { email, password} = this.state;

        emailSignInStart(email, password)
    }
    
    handleChange = event => {
        const {value, name} = event.target;
        this.setState({ [name]: value })
    }

    render() {
        const { googleSignInStart } = this.props;
        return (
            <SignInContainer>
                <SignInTitle> I already have an account </SignInTitle>
                <span>  Sign in with your email and password </span>

                <form onSubmit = {this.handleSubmit} >

                    <FormInput
                    name='email'
                    type='email'
                    label='name'
                    value={this.state.email}
                    handleChange ={ this.handleChange}
                    required
                    />

                    <FormInput
                     name='password'
                     type='password'
                     label='password'
                     value={this.state.password}
                     handleChange ={ this.handleChange }
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
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export  default connect(null, mapDispatchToProps)(SignIn) ;