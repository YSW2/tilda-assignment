import './index.css';
import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5분
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        fontSize: '14px',
                        padding: '12px 16px',
                    },
                }}
            />
        </QueryClientProvider>
    </StrictMode>,
);
