const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { main: './src/script/pages/index.js' },
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
    module: {
    rules: [ // rules — это массив правил
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
          },
          // добавили правило для обработки файлов
          {
            // регулярное выражение, которое ищет все файлы с такими расширениями
            test: /\.(png|svg|jpg|gif|woff2)$/,
            // при обработке этих файлов нужно использовать file-loader
            loader: 'file-loader'
          },
          // аналогично добавьте правило для работы с html
          {
            test: /\.html$/,
            loader: 'html-loader',
          },
          {
            // применять это правило только к CSS-файлам
              test: /\.css$/,
            // при обработке этих файлов нужно использовать
            // MiniCssExtractPlugin.loader и css-loader
              loader:  [MiniCssExtractPlugin.loader, 'css-loader']
          }
        
      ]
  },
  resolve: {
    extensions: ['.js', '.ts']
},
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html' // путь к файлу index.html
      }),
      new MiniCssExtractPlugin() // подключение плагина для объединения файлов

  ] // добавьте массив

};