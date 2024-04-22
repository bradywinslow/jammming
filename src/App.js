import Root from './components/Root.jsx';
import NotFound from './components/NotFound.jsx';
import SearchBar from './components/SearchBar.jsx';
import SearchResults from './components/SearchResults.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root /> }>
    <Route index element={ <SearchBar /> } />
    <Route path='results' element={ <SearchResults /> } />
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
