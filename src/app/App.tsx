import { RouterProvider } from 'react-router';
import { Toaster } from '@/app/components/ui/sonner';
import { AppProvider } from '@/app/context/AppContext';
import { router } from '@/app/routes';

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </AppProvider>
  );
}