import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import nimbleLogoWhite from 'assets/images/icons/nimble-logo-white.svg';
import Alert from 'components/Alert';
import ElevatedButton from 'components/ElevatedButton';
import LoadingDialog from 'components/LoadingDialog';
import TextInput from 'components/TextInput';
import { useAppDispatch, useAppSelector } from 'hooks';
import { paths } from 'routes';
import { signIn } from 'store/reducers/Authentication';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, errors, success } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    dispatch(signIn({ email, password }));
  };

  return (
    <div className="sign-in bg-cover min-h-screen flex flex-col justify-center items-center bg-sign-in">
      <img className="mx-auto" src={nimbleLogoWhite} alt="nimble logo" data-test-id={signInScreenTestIds.nimbleLogo} />
      <div className="mt-6 text-white opacity-60 text-regular tracking-survey-tight">Sign in to Nimble</div>

      <div className="mt-6">{errors && <Alert errors={errors} />}</div>

      <form className="w-80 mt-8" onSubmit={handleSubmit} data-test-id={signInScreenTestIds.signInForm}>
        <div className="mb-6">
          <TextInput
            label="Email"
            labelDataTestId={signInScreenTestIds.emailLabel}
            inputAttributes={{
              id: 'form-sign-in-email',
              required: true,
              type: 'email',
              'data-test-id': signInScreenTestIds.emailField,
              onChange: (event) => setEmail(event.target.value),
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
                onChange: (event) => setPassword(event.target.value),
              }}
              className="pr-16"
            />
          </span>
          <button
            className="text-white text-opacity-50 text-small tracking-survey-normal absolute right-3 bottom-4"
            type="button"
            data-test-id={signInScreenTestIds.forgotButton}
          >
            Forgot?
          </button>
        </div>
        <ElevatedButton isFullWidth type="submit" data-test-id={signInScreenTestIds.signInButton}>
          Sign in
        </ElevatedButton>
      </form>

      {success && <Navigate replace to={paths.dashboard} />}

      {loading && <LoadingDialog />}
    </div>
  );
};

export default SignInScreen;
