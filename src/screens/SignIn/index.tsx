import React from 'react';

import nimbleLogoWhite from 'assets/images/icons/nimble-logo-white.svg';
import background from 'assets/images/illustrations/background-sign-in.png';
import TextInput from 'components/TextInput';

const SignInScreen = (): JSX.Element => {
  return (
    <div
      className="sign-in bg-cover min-h-screen flex flex-col justify-center items-center"
      style={{ backgroundImage: 'url(' + background + ')' }}
    >
      <img className="mx-auto" src={nimbleLogoWhite} alt="nimble logo" data-test-id="nimble-logo-img" />
      <div className="mt-6 mb-8 text-white opacity-60 text-[17px]">Sign in to Nimble</div>
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
        <div className="mb-6">
          <TextInput
            label="Password"
            inputAttributes={{
              id: 'form-sign-in-password',
              required: true,
              type: 'password',
            }}
          />
        </div>
        <button
          className="bg-white text-[#15151A] font-bold text-[17px] rounded-[10px] focus:outline-none focus:shadow-outline w-full h-14"
          type="button"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInScreen;
