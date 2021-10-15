import React from 'react';
import slot from '../slot';

const Example = React.forwardRef((props = {}, ref) => {
  return (
    <div>
      <h1>Example default</h1>
      <button ref={ref}>submit</button>
    </div>
  );
});

Example.displayName = 'Example';

export default slot('example')(Example);
