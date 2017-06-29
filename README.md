# babelrc-targeted-rollup

> Builds a babel configuration for rollup with specific targets from `babel-preset-env`.

## Installation

```bash
yarn add babelrc-targeted-rollup --dev
```

## Usage

Create a `.babelrc` containing the [`env` preset](https://github.com/babel/babel-preset-env).

```json
{
    "presets": [
        ["env", {
            "targets": {
                "node"     : 6,
                "browsers" : "Last 2 versions" 
            }
        }]
    ]
}
```

Then, in your `rollup.config.js`:

```js
import babelrc from 'babelrc-targeted-rollup';
import babel   from 'rollup-plugin-babel';

const baseOptions = {
    entry    : 'src/my-package.js',
    external : ['lodash'],
    globals  : {
        'lodash': '_'
    }
};

const targets = [
    {
        dest       : 'dist/my-package.js',
        format     : 'umd',
        moduleName : 'MyPackage',
        plugins    : [
            babel(babelrc('browsers'))
        ]
    },
    {
        dest    : 'dist/my-package.es.js',
        format  : 'es',
        plugins : [
            babel(babelrc('node'))
        ]
    }
];
export default targets.map(targetOptions => (
    Object.assign({}, baseOptions, targetOptions)
));
```

## Options

You can pass the same options as for [`babelrc-rollup`](https://github.com/eventualbuddha/babelrc-rollup#options) plus:

#### `targets` (default: `[]`)

The `babel-preset-env` targets you want to have inside the returned babel configuration.
