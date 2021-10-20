
import React, { useRef } from "react";
import { hot } from 'react-hot-loader/root';
import ChainLoading from 'chain-loading';
import Example from './components/Example';

const load = name => ChainLoading({
  name,
  debug: true,
  loaders: [
    {
      loader: () => import(
        `@/components/level-2/${name}`
      ),
      path: '@/components/level-2/example'
    },
    {
      loader: () => import(
        `@/components/level-1/${name}`
      ),
      path: `@/components/level-1/${name}`
    },
    {
      loader: () => Promise.resolve((props, ref) => {
        return <div>Example</div>
      }),
      path: `@/components/${name.replace(name[0], name[0].toUpperCase())}`
    }
  ],
});

function App()  {
  const ref = useRef();
  const ExampleInner = load('example');

  return (
    <>
      <h1>Demo</h1>
      <ExampleInner name="props name"/>
      <div></div>
      <h1>Demo: slot</h1>
      <Example ref={ref} name={'test-a'}/>
    </>
  );
}

export default hot(App);
