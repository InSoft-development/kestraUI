const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


module.exports = {
  devServer: {
    proxy: {
      '/api/v1': { // Обратите внимание на изменение пути до '/api/v1'
        target: 'http://localhost:8080', // Целевой сервер
        changeOrigin: true, // Необходимо для изменения заголовка Origin на целевой сервер
        pathRewrite: {'^/api/v1' : '/api/v1'} // Переписываем путь запроса
      }
    }
  }
}