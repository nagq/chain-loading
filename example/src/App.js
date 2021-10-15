
import React, { useRef } from "react";
import { hot } from 'react-hot-loader/root';
import Example from './components/Example';

function App()  {
  const ref = useRef();

  return (
    <>
      <div>
        test
      </div>
      <Example ref={ref} name={'test-a'}/>
    </>
  );
}

export default hot(App);
