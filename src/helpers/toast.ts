import { toast } from 'react-toastify';

export const showGeneralErrorToast = () => {
  toast.error('There is something wrong. Please try again later!', { position: 'top-center' });
};
