import React from 'react';
import ChainLoading from 'chain-loading';
import { useConfig } from './config';

export default (name) => {
  return (ComponentClass) => {
    const Comp = React.forwardRef((props = {}, ref) => {
      const config = useConfig();
      const { data = {} } = config;
      const pack = data[name] || {};
      const key = pack.package || name;

      const Loaded = ChainLoading({
        name,
        debug: true,
        loaders: [
          {
            loader: () => import(
              /* webpackChunkName: "level-2" */
              /* webpackInclude: /components[\\\/]level-2/ */
              /* webpackPrefetch: true */
              /* webpackPreload: true */
              '@/components/level-2/' + key
            ),
            path: '@/components/level-2/' + key
          },
          {
            loader: () => import(
              /* webpackChunkName: "level-1" */
              /* webpackInclude: /components[\\\/]level-1/ */
              /* webpackPrefetch: true */
              /* webpackPreload: true */
              '@/components/level-1/' + key
            ),
            path: '@/components/level-1/' + key
          },
          {
            loader: () => import(
              /* webpackChunkName: "level-0" */
              /* webpackInclude: /components[\\\/]level-0/ */
              /* webpackPrefetch: true */
              /* webpackPreload: true */
              '@/components/level-0/' + key
            ),
            path: '@/components/level-0/' + key
          },
          {
            loader: () => import(
              /* webpackChunkName: "level-0" */
              /* webpackInclude: /components[\\\/]level-0/ */
              /* webpackPrefetch: true */
              /* webpackPreload: true */
              '@/components/level-0/' + name
            ),
            path: '@/components/level-0/' + name
          },
          {
            loader: () => Promise.resolve(ComponentClass),
            path: 'default'
          }
        ],
      });
      return React.createElement(Loaded, { ...props, ref});
    });
    Comp.displayName = name + ' [slot]';
    return Comp;
  }
}
