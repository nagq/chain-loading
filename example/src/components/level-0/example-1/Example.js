import React from 'react';

const Example = React.forwardRef((props = {}, ref) => {
  return (
    <div>
      <h1>level-0 Example-1, { props.name }</h1>
      <button ref={ref}>submit</button>
    </div>
  );
});

export default Example;
