# chain-loading

按配置数组顺序加载组件, 直到加载成功

```js
import React from 'react';
import ChainLoading from 'chain-loading';

const Cls = compName => ChainLoading({
    loaders: [
        `@/components/group-a/${compName}`,
        `@/components/group-b/${compName}`,
        {
            loader: `@/components/group-c/${compName}`,
        }
    ]
});

<Cls {...props} ref={ref}></Cls>
```
