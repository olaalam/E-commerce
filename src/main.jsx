import { createRoot } from 'react-dom/client';
import '../node_modules/flowbite/dist/flowbite.min.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import NumCartContextProvider from './context/NumCartContext.jsx';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

import './index.css';
import App from './App.jsx';
import UserTokenProvider from './context/UserToken.jsx';
import { Toaster } from 'react-hot-toast'; // ✅ Import Toaster component

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <NumCartContextProvider>
        <UserTokenProvider>
            <Toaster /> 
            <App />
        </UserTokenProvider>
        </NumCartContextProvider>
    </QueryClientProvider>
);
