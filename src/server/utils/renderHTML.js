import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';
import { routes } from '../../router';
import { renderToString } from 'react-dom/server';
import { getServerStore } from '../../store';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-dom';
import { createFetchRequest } from './index';
export async function renderHTML(req, res) {
  const handler = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req, res);
  const context = await handler.query(fetchRequest);
  const router = createStaticRouter(handler.dataRoutes, context, {});
  const routeList = matchRoutes(routes, req.path);
  // 获取 store
  const store = getServerStore();

  const fetchList = [];

  for (let i = 0; i < routeList?.length; i++) {
    const route = routeList[i].route;
    if (route.lazy) {
      const component = (await route.lazy()).Component;
      // 页面数据预获取
      fetchList.push(component.getInitData?.(store, req));
    } else {
      const component = route.Component;
      // 页面数据预获取
      fetchList.push(component.getInitData?.(store, req));
    }
  }

  await Promise.all(fetchList);

  const ReactHtml = (<Provider store={store}>
    <StaticRouterProvider router={router} context={context} />
  </Provider>)

  const html = renderToString(ReactHtml);

  const SSRHTML = `
    <!doctype html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport"
                content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          <title>同构渲染</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
        window.INITIAL_STATE=${JSON.stringify(store.getState())}</script>
        <script src="/index.js"></script>
      </body>
    </html>
  `;
  return SSRHTML;
}
