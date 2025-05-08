import BookingSistem from '@/components/BookingSistem';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
        <BookingSistem />
        <ToastContainer />
    </div>
  );
};

export default App