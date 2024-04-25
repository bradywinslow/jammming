import Root from './components/Root.jsx';
import NotFound from './components/pages/NotFound.jsx';
import HomePage from './components/pages/HomePage.jsx';
import CreatePlaylist from './components/pages/CreatePlaylist.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root /> }>
    <Route index element={ <HomePage /> } />
    <Route path='create-playlist' element={ <CreatePlaylist /> } />
    <Route path='*' element={ <NotFound /> } />
  </Route>
));

export default function App() {
  return (
    <>
      <RouterProvider router={ router } />
    </>
  );
}
