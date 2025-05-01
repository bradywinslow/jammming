import Root from './layouts/Root.jsx';
import PageNotFound from './components/pages/PageNotFound.jsx';
import HomePage from './components/pages/HomePage.jsx';
import CreatePlaylist from './components/pages/CreatePlaylist.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root /> }>
    <Route index element={ <HomePage /> } />
    <Route
      path='create-playlist'
      element={ 
        <ProtectedRoute>
          <CreatePlaylist />
        </ProtectedRoute>
      }
    />
    <Route path='*' element={ <PageNotFound /> } />
  </Route>
));

export default function App() {
  return (
    <>
      <RouterProvider router={ router } />
    </>
  );
}
