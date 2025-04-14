import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Signin from '@/pages/Signin';
import PageNotFound from '@/components/pages/error/PageNotFound';
import GoogleCallback from '@/components/pages/authentication/GoogleCallback';
import Protectedroute from '@/components/basic/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';
import ChannelMessage from '@/components/pages/dashboard/channel/ChannelMessage';
import InvitePage from '@/pages/InviteMember';
import DirectMessage from '@/components/pages/dashboard/dm/DirectMessage';
import Chatbot from '@/components/pages/dashboard/chatbot/Chatbot';
import VideoCall from '@/components/pages/dashboard/dm/video/VideoCall';


// Create routes configuration
const router = createBrowserRouter([
  {
    path: "*",
    element: <PageNotFound />
  },
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
    path: '/invite/:invitetoken',
    children: [
      {
        index: true, // This makes it the default route for the parent path
        element: <InvitePage />,
      },
      // Add more routes as needed
    ],
  },
  {
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
    path:'/workspace/:workspaceId',
    element:<Protectedroute><Dashboard/></Protectedroute>,
    children:[
      {
        index: true,
        element: <Navigate to="chatbot" replace />
      },
      {
        path:'channel/:channelId',
        element: <ChannelMessage/>,  
      },{
        path:'dm/:dmId',
        element: <DirectMessage/>,  
      },
      {
        path:'chatbot',
        element: <Chatbot/>,  
      },
      {
        path:'dm/:dmId/video',
        element:<VideoCall/>
      }
    ]
  }

]);

const Router: React.FC = () => {
    return <RouterProvider router={router} />;
  };
  
  export default Router;