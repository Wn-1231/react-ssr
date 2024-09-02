import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../router';
import store from '../store';

async function hydrate() {
  let router = createBrowserRouter(routes);
  ReactDOM.hydrateRoot(
    document.getElementById('app'),
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
}

hydrate();

