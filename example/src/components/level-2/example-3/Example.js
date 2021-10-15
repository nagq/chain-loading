import React from 'react';

const Example = React.forwardRef((props = {}, ref) => {
  return (
    <div>
      <h1>level-2 Example-3</h1>
      <button ref={ref}>submit</button>
    </div>
  );
});

export default Example;
