import { Box, CssBaseline, ThemeProvider } from '@mui/material';

import { Suspense, lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import skylineUrl from './assets/skyline.svg';
import { RootBox } from './components/aa-shared/RootBox';
import AppLoader from './features/app-structure/AppLoader';
import MainNavigation from './features/app-structure/AppMainNavigation';
import { LoadingScreen } from './features/app-structure/LoadingScreen';
import TopBar from './features/app-structure/TopBar';
import Login from './features/log-in-out/Login';
import LoginProvider from './features/log-in-out/LoginProvider';
import { useIsSmall } from './hooks/useIsSmall';
import theme from './style/theme';

const Offers = lazy(() => import('./routes/Offers'));
const Invoices = lazy(() => import('./routes/Invoices'));
const TimeCapture = lazy(() => import('./features/time-capture'));
const OfferEdit = lazy(() => import('./routes/OfferEdit'));
const Options = lazy(() => import('./features/options'));
const Constructions = lazy(() => import('./features/constructions/Constructions'));
const Times = lazy(() => import('./features/times'));
const Upload = lazy(() => import('./routes/Upload'));
const Planing = lazy(() => import('./features/planing'));
const MyVacations = lazy(() => import('./features/my-vacations'));
const Info = lazy(() => import('./features/info'));
const Jobs = lazy(() => import('./features/options/jobs'));
const PrintSettings = lazy(() => import('./features/options/print-settings'));
const BgbServices = lazy(() => import('./features/options/services/bgb'));

export default function App() {
  const isSmall = useIsSmall();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <RootBox>
          <TopBar />
          <Box mt={isSmall ? 6 : 7}>
            <AppRoutes />
          </Box>
        </RootBox>
        <img
          style={{
            zIndex: '-1',
            position: 'fixed',
            bottom: '0',
            width: '100%',
          }}
          src={skylineUrl}
        />
      </CssBaseline>
    </ThemeProvider>
  );
}

function AppRoutes() {
  return (
    <LoginProvider>
      <AppLoader>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Outlet />}>
            <Route index element={<MainNavigation />} />
            <Route
              path="info"
              element={
                <LazyLoad>
                  <Info />
                </LazyLoad>
              }
            />
            <Route
              path="invoices"
              element={
                <LazyLoad>
                  <Invoices />
                </LazyLoad>
              }
            />
            <Route
              path="planing"
              element={
                <LazyLoad>
                  <Planing />
                </LazyLoad>
              }
            />
            <Route
              path="upload"
              element={
                <LazyLoad>
                  <Upload />
                </LazyLoad>
              }
            />
            <Route
              path="constructions"
              element={
                <LazyLoad>
                  <Constructions />
                </LazyLoad>
              }
            />
            <Route
              path="options"
              element={
                <LazyLoad>
                  <Options />
                </LazyLoad>
              }
            >
              <Route
                index
                element={
                  <LazyLoad>
                    <Jobs />
                  </LazyLoad>
                }
              />
              <Route
                path="print-settings"
                element={
                  <LazyLoad>
                    <PrintSettings />
                  </LazyLoad>
                }
              />
              <Route
                path="bgb-services"
                element={
                  <LazyLoad>
                    <BgbServices />
                  </LazyLoad>
                }
              />
            </Route>

            <Route
              path="time-capture"
              element={
                <LazyLoad>
                  <TimeCapture />
                </LazyLoad>
              }
            />
            <Route
              path="my-vacations"
              element={
                <LazyLoad>
                  <MyVacations />
                </LazyLoad>
              }
            />
            <Route
              path="time"
              element={
                <LazyLoad>
                  <Times />
                </LazyLoad>
              }
            />

            <Route
              path="offers"
              element={
                <LazyLoad>
                  <Offers />
                </LazyLoad>
              }
            />
            <Route
              path="offers/:id"
              element={
                <LazyLoad>
                  <OfferEdit />
                </LazyLoad>
              }
            />
          </Route>
        </Routes>
      </AppLoader>
    </LoginProvider>
  );
}

function LazyLoad({ children }: React.PropsWithChildren) {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
}
