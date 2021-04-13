import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';
import {
    SignUpContainer,
    SignUpTitle
} from './sign-up.styles';

class SignUp extends React.Component{
    constructor(){
        super();


        this.state = {
            displayName: '',
            email : '',
            password : '',
            confirmPassword: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { signUpStart } = this.props;

        const { displayName, email, password, confirmPassword } = this.state;

        signUpStart({email, password, displayName});

        if (  password !== confirmPassword ) {
            alert(" Passwords don't match ");
            return;
        }

    };

    handleChange = event =>{
        const {name , value} = event.target;
        this.setState({ [name]:value });
    };

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return(
            <SignUpContainer>
                <SignUpTitle> I do not have a account</SignUpTitle>
                <span> Sign up with your email and password </span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                     type="text"
                     name='displayName'
                     value={displayName}
                     onChange={this.handleChange}
                     label='DisplayName'
                     required
                     />
                    <FormInput
                     type="email"
                     name='email'
                     value={email}
                     onChange={this.handleChange}
                     label='Email'
                     required
                     />
                    <FormInput
                     type="password"
                     name='password'
                     value={password}
                     onChange={this.handleChange}
                     label='Password'
                     required
                     />
                    <FormInput
                     type="password"
                     name='confirmPassword'
                     value={confirmPassword}
                     onChange={this.handleChange}
                     label='confirmPassword'
                     required
                     />
                     <CustomButton type='submit' onClick={signUpStart} > SIGN UP </CustomButton>
                </form>

            </SignUpContainer>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);