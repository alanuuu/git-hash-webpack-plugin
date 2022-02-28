const { execSync } = require('child_process');

class GitHashWebpackPlugin {
  constructor(options = {}) {
    this.defaultOptions = {
      len: 11,
      webpack: null,
    };
    this.options = {
      ...this.defaultOptions,
      ...options,
    };
  }

  initDefinePlugin(ctx, options) {
    if (options.plugins) {
      options.plugins = [];
    }

    for (let i = 0; i < options.plugins.length; i++) {
      const plugin = options.plugins[i];
      if (plugin instanceof ctx.DefinePlugin) return;
    }

    options.plugins.push(new ctx.DefinePlugin({}));
  }

  initDefineHash(ctx, options) {
    const hash = this.getGitCommitId();

    options.plugins.forEach((plugin) => {
      if (plugin instanceof ctx.DefinePlugin) {
        if (!plugin.definitions) {
          plugin.definitions = {};
        }

        const definedProcessEnv = plugin.definitions['process.env'];
        if (definedProcessEnv) {
          definedProcessEnv.COMMIT = JSON.stringify(hash);
        } else {
          plugin.definitions['process.env.COMMIT'] = JSON.stringify(hash);
        }
      }
    });
  }

  getGitCommitId() {
    try {
      return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim(
        this.options.len
      );
    } catch (error) {
      console.error('git commit error', error);
      return '';
    }
  }

  apply(compiler) {
    const name = GitHashWebpackPlugin.name;
    const { webpack, options } = compiler;
    if (!webpack && this.options.webpack) {
      webpack = this.options.webpack;
    }
    this.initDefinePlugin(webpack, options);
    compiler.hooks.beforeCompile.tap(name, () => {
      this.injectDefineHash(webpack, options);
    });
  }
}

module.exports = GitHashWebpackPlugin
