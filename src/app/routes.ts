import { createBrowserRouter } from 'react-router';
import LandingPage from '@/app/pages/LandingPage';
import ChatPage from '@/app/pages/ChatPage';
import PreviewPage from '@/app/pages/PreviewPage';
import LibraryPage from '@/app/pages/LibraryPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/chat',
    Component: ChatPage,
  },
  {
    path: '/preview',
    Component: PreviewPage,
  },
  {
    path: '/library',
    Component: LibraryPage,
  },
]);
