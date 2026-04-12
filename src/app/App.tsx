import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider } from './components/ThemeProvider';
import { UserProvider } from './contexts/UserContext';
import { AdminProvider } from './contexts/AdminContext';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AdminProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </AdminProvider>
      </UserProvider>
    </ThemeProvider>
  );
}