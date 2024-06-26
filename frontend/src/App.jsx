import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as sessionActions from "./store/session";
import Splash from "./components/splash/Splash";
import Feed from "./components/feed/Feed";
import ArticleForm from "./components/articles/forms/ArticleForm";
import ArticleEditForm from "./components/articles/forms/ArticleEditForm";
import ArticleShow from "./components/articles/show/ArticleShow";
import ProfileShow from "./components/profile/ProfileShow";
import Error from "./components/error/Error";

import ReactGa from 'react-ga4';
import { trackPageView } from "./analytics";
const measurementId = 'G-374LE8WP35';
ReactGa.initialize(measurementId);


function Layout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return (
    <>
      {isLoaded && <Outlet />}
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Splash />
      },
      {
        path: '/feed',
        element: <Feed />
      },
      {
        path: '/articles/:articleId',
        element: <ArticleShow />
      },
      {
        path: '/new-story',
        element: <ArticleForm />
      },
      {
        path: '/articles/:articleId/edit',
        element: <ArticleEditForm />
      },
      {
        path: '/users/:userId',
        element: <ProfileShow />
      },
      {
        path: '/error',
        element: <Error />
      },
      {
        path: '*',
        element: <Error />
      }
    ]
  }
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
