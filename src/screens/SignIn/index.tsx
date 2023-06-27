import React from 'react';

import nimbleLogoWhite from 'assets/images/icons/nimble-logo-white.svg';
import ElevatedButton from 'components/ElevatedButton';
import TextInput from 'components/TextInput';

export const signInScreenTestIds = {
  nimbleLogo: 'sign-in__nimble-logo',
  signInForm: 'sign-in-form',
  emailLabel: 'sign-in-form__email',
  emailField: 'sign-in-form__input-email',
  passwordLabel: 'sign-in-form__password',
  passwordField: 'sign-in-form__input-password',
  forgotButton: 'sign-in-form__forgot-button',
  signInButton: 'sign-in-form__button',
};

const SignInScreen = (): JSX.Element => {
  return (
    <div className="sign-in bg-cover min-h-screen flex flex-col justify-center items-center bg-sign-in">
      <img className="mx-auto" src={nimbleLogoWhite} alt="nimble logo" data-test-id={signInScreenTestIds.nimbleLogo} />
      <div className="mt-6 mb-8 text-white opacity-60 text-regular tracking-survey-tight">Sign in to Nimble</div>
      <form className="w-80" data-test-id={signInScreenTestIds.signInForm}>
        <div className="mb-6">
          <TextInput
            label="Email"
            labelDataTestId={signInScreenTestIds.emailLabel}
            inputAttributes={{
              id: 'form-sign-in-email',
              required: true,
              type: 'email',
              'data-test-id': signInScreenTestIds.emailField,
            }}
          />
        </div>
        <div className="mb-6 relative">
          <span className="block w-full">
            <TextInput
              label="Password"
              labelDataTestId={signInScreenTestIds.passwordLabel}
              inputAttributes={{
                id: 'form-sign-in-password',
                required: true,
                type: 'password',
                'data-test-id': signInScreenTestIds.passwordField,
              }}
              extraClassName="pr-16"
            />
          </span>
          <button
            className="text-white text-opacity-50 text-small tracking-survey-normal absolute right-3 bottom-4"
            data-test-id={signInScreenTestIds.forgotButton}
          >
            Forgot?
          </button>
        </div>
        <ElevatedButton isFullSize type="submit" data-test-id={signInScreenTestIds.signInButton}>
          Sign in
        </ElevatedButton>
      </form>
    </div>
  );
};

export default SignInScreen;
