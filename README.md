# git-hash-webpack-plugin

Add variable to process.env.COMMIT


## Install

```shell
npm install --save-dev git-hash-webpack-plugin
```

## Usage
```
const GitHashWebpackPlugin = require("git-hash-webpack-plugin");

module.exports = {
  plugins: [
    new GitHashWebpackPlugin()
  ]
}

// use
console.log(process.env.COMMIT) // commit id


```

## Options

**options.len**

- type: number
- default: 0

control hash length

**options.webpack**

- type: object
- default: null

if webpack version < 5 ; add webpack to option




