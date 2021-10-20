# chain-loading

按配置数组顺序加载组件, 直到加载成功

```js
const load = name => ChainLoading({
  name,
  debug: true,
  loaders: [
    {
      loader: () => import(
        `@/components/level-2/${name}`
      ),
      path: `@/components/level-2/${name}`
    },
    {
      loader: () => import(
        `@/components/level-1/${name}`
      ),
      path: `@/components/level-1/${name}`
    },
    {
      loader: () => import(
        `@/components/${name.replace(name[0], name[0].toUpperCase())}`
      ),
      path: `@/components/${name.replace(name[0], name[0].toUpperCase())}`
    }
  ],
});

const Example = load(example);

<Example name="test"/>
```

# options

#### debug

当`debug`为`true`时, 组件外层会添加一层`div`, 将`name`及加载组件的其它`option`作为data属性挂载在`div`上。

```html
<div data-name="example" data-path="@/components/level-0/example-1">
    <div>
        <h1>level-0 Example-1, props name</h1>
        <button>submit</button>
    </div>
</div>
```
