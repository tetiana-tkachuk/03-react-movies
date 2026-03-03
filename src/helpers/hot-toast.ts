import toast from 'react-hot-toast';

export const notify = (message: string) => toast(message);

export const toastOptions = {
  className: '',
  style: {
    border: '1px solid #0a66c2',
    padding: '16px',
    color: '#0a66c2',
  },
};
