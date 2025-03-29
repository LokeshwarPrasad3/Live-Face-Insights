import EmotionDetection from '@/pages/EmotionDetection';
import Layout from '@/pages/Layout';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Navigate to="/face-emotion-detection" replace />}
      />
      <Route
        path="face-emotion-detection"
        element={
          <Layout>
            {' '}
            <EmotionDetection />{' '}
          </Layout>
        }
      />
    </>
  )
);

export default routes;
