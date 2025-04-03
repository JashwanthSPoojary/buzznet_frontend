import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '../pages/landingPage/LandingPage';
import Signin from '@/pages/authentication/Signin';
import PageNotFound from '@/components/pages/error/PageNotFound';
import GoogleCallback from '@/components/pages/authentication/GoogleCallback';
import Dashboard from '@/pages/dashboard/Dashboard';


// Create routes configuration
const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true, // This makes it the default route for the parent path
        element: <LandingPage />,
      },
      // Add more routes as needed
    ],
  },{
    path:'/signin',
    children:[
      {
        index: true, 
        element: <Signin />,  
      }
    ]
  },
  {
    path:'/error',
    children:[
      {
        index: true, 
        element: <PageNotFound />,  
      }
    ]
  },{
    path:'/google/callback',
    children:[
      {
        index: true, 
        element: <GoogleCallback />,  
      }
    ]
  },{
    path:'/workspace/:workspaceId/channel/:channelId',
    children:[
      {
        index: true, 
        element: <Dashboard />,  
      }
    ]
  },

]);

const Router: React.FC = () => {
    return <RouterProvider router={router} />;
  };
  
  export default Router;