const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: 'preload.js',
      builderOptions: {
        appId: 'com.myelectron.vueapp',
        productName: 'MyElectronVueApp',
        win: {
          target: [
            'nsis'
          ]
        },
        linux: {
          target: [
            'AppImage'
          ]
        },
        mac: {
          target: [
            'dmg'
          ]
        }
      }
    }
  }

})
