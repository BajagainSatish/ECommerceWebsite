/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import paths, { rootPaths } from './paths';
import MainLayout from 'layouts/main-layout';
import AuthLayout from 'layouts/auth-layout';
import Splash from 'components/loading/Splash';
import PageLoader from 'components/loading/PageLoader';

const App = lazy(() => import('App'));
const Dashboard = lazy(() => import('pages/dashboard'));
const Login = lazy(() => import('pages/authentication/Login'));
const Signup = lazy(() => import('pages/authentication/Signup'));
const AddProduct = lazy(() => import('pages/product/AddProduct'));
const ViewProducts = lazy(() => import('pages/product/ViewProducts'));
const AddBrand = lazy(() => import('pages/brand/AddBrand'));
const ViewBrands = lazy(() => import('pages/brand/ViewBrands'));
const AddCategory = lazy(() => import('pages/category/AddCategory'));
const ViewCategories = lazy(() => import('pages/category/ViewCategories'));

const router = createBrowserRouter(
  [
    {
      element: (
        <Suspense fallback={<Splash />}>
          <App />
        </Suspense>
      ),
      children: [
        {
          path: '/',
          element: (
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </MainLayout>
          ),
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: paths.productRoot,
              children: [
                { path: 'add', element: <AddProduct /> },
                { path: 'view', element: <ViewProducts /> },
              ],
            },
            {
              path: paths.brandRoot,
              children: [
                { path: 'add', element: <AddBrand /> },
                { path: 'view', element: <ViewBrands /> },
              ],
            },
            {
              path: paths.categoryRoot,
              children: [
                { path: 'add', element: <AddCategory /> },
                { path: 'view', element: <ViewCategories /> },
              ],
            },
          ],
        },
        {
          path: rootPaths.authRoot,
          element: (
            <AuthLayout>
              <Outlet />
            </AuthLayout>
          ),
          children: [
            {
              path: paths.login,
              element: <Login />,
            },
            {
              path: paths.signup,
              element: <Signup />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: '/dashdarkX',
  },
);

export default router;
