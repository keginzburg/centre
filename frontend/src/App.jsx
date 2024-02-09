import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as sessionActions from "./store/session";
import Splash from "./components/splash/Splash";
import Feed from "./components/feed/Feed";
import ArticleForm from "./components/articles/forms/ArticleForm";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

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
        path: '/new-story',
        element: <ArticleForm />
      }
    ]
  }
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
