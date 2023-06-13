import React from 'react';

import nimbleLogoWhite from 'assets/images/icons/nimble-logo-white.svg';
import background from 'assets/images/illustrations/background-sign-in.png';
import ElevatedButton from 'components/ElevatedButton';
import TextInput from 'components/TextInput';

const SignInScreen = (): JSX.Element => {
  return (
    <div
      className="sign-in bg-cover min-h-screen flex flex-col justify-center items-center"
      style={{ backgroundImage: 'url(' + background + ')' }}
    >
      <img className="mx-auto" src={nimbleLogoWhite} alt="nimble logo" data-test-id="nimble-logo-img" />
      <div className="mt-6 mb-8 text-white opacity-60 text-regular">Sign in to Nimble</div>
      <form className="w-80">
        <div className="mb-6">
          <TextInput
            label="Email"
            inputAttributes={{
              id: 'form-sign-in-email',
              required: true,
              type: 'text',
            }}
          />
        </div>
        <div className="mb-6 relative">
          <span className="block w-full">
            <TextInput
              label="Password"
              inputAttributes={{
                id: 'form-sign-in-password',
                required: true,
                type: 'password',
              }}
              extraClassName="pr-16"
            />
          </span>
          <button className="text-white text-opacity-50 text-small absolute right-3 bottom-4">Forgot?</button>
        </div>
        <ElevatedButton isFullSize={true} type="submit">
          Sign In
        </ElevatedButton>
      </form>
    </div>
  );
};

export default SignInScreen;
