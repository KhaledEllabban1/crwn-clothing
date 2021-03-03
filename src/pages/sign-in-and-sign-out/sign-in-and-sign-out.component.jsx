import React from 'react';

// import './sign-in-and-sign-out.styles.scss';

import { SignInAndSignUpPageContainer } from './sign-in-and-sign-out.styles';

import SignIn from  '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

const SignInAndSignOutPage = () => (
    <SignInAndSignUpPageContainer>
        <SignIn   />
        <SignUp   />
    </SignInAndSignUpPageContainer>
);

export default SignInAndSignOutPage;