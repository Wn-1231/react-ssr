import withClient from '../components/withClient';
import NotFound from '../pages/NotFound/index';
const requireContext = require.context(
  // 组件目录的相对路径
  '../pages',
  // 是否查询子目录
  true,
  // 组件文件名的正则表达式
  // 只会包括以 `.tsx` 结尾的文件
  /\index.*\.js$/,
);
const createRoutes = function () {
  const fileMap = new Map();
  const paths = requireContext
    .keys()
    .map((val) => val.replace('./', ''))
    .map((str) => str.split('/'))
    .map((value) => {
      let arr = [];
      let url = '/';
      for (let i = 0; i < value.length - 1; i++) {
        url += `${value[i]}/`;
        if (i === value.length - 2) {
          fileMap.set(`${value[i]}---${i}`, {
            file: value[i + 1],
            url: `${url}${value[i + 1]}`,
          });
        }
        arr.push(value[i]);
      }
      return arr;
    });

  // 递归方式
  // function dfs(paths, depth, prefix = '/') {
  //   let map = new Map();
  //   for (let i = 0; i < paths.length; i++) {
  //     if (paths[i][0]) {
  //       let next = paths[i].length > 1;
  //       if (next) {
  //         map.set(
  //           paths[i][0],
  //           map.has(paths[i][0])
  //             ? [...map.get(paths[i][0]), paths[i].slice(1)]
  //             : [paths[i].slice(1)],
  //         );
  //       } else {
  //         map.set(
  //           paths[i][0],
  //           map.has(paths[i][0]) ? map.get(paths[i][0]) : [],
  //         );
  //       }
  //     }
  //   }
  //   const routes = [];
  //   map.forEach((children, path) => {
  //     const file = fileMap.get(`${path}---${depth}`);
  //     const str =
  //       file !== 'index.js'
  //         ? file
  //             .match(/\$[a-zA-Z]+/g)
  //             .join('')
  //             .replace(/\$/g, '/:')
  //         : '';
  //     routes.push({
  //       path: depth === 0 ? `/${path}${str}` : `${path}${str}`,
  //       lazy: async () => {
  //         const element = (await import(`../pages${prefix}${path}/${file}`))
  //           ?.default;
  //         const Component = withClient(element);
  //         return {
  //           Component,
  //         };
  //       },
  //       children: dfs(children, depth + 1, prefix + path + '/'),
  //     });
  //   });
  //   return routes;
  // }
  // return dfs(paths, 0);

  // 迭代方式
  function buildRoutes(paths) {
    const routes = [];
    for (let i = 0; i < paths.length; i++) {
      let arr = routes;
      for (let depth = 0; depth < paths[i].length; depth++) {
        const path = paths[i][depth];
        const pathObj = fileMap.get(`${path}---${depth}`);
        const file = pathObj.file;
        const str =
          file !== 'index.js'
            ? file
                .match(/\$[a-zA-Z]+/g)
                .join('')
                .replace(/\$/g, '/:')
            : '';
        const pathURL = depth === 0 ? `/${path}${str}` : `${path}${str}`;
        let node = arr.find(
          (val) =>
            val.path === (depth === 0 ? `/${path}${str}` : `${path}${str}`),
        );
        if (!node) {
          node = {
            path: pathURL,
            lazy: async () => {
              const element = (await import(`../pages${pathObj.url}`))?.default;
              const Component = withClient(element);
              return {
                Component,
              };
            },
            children: [],
          };
          arr.push(node);
        }
        arr = node.children;
      }
    }
    return routes;
  }
  const routes = buildRoutes(paths);
  return routes;
};

const routes = createRoutes();
routes.push({
  path: '*',
  Component: withClient(NotFound),
});
export { routes };
