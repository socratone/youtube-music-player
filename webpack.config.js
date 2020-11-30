const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/, // .js 확장자로 끝나는 파일만 babel-loader를 사용한다.
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        // 먼저 'sass-laoder'가 SASS를 CSS로 바꾼다.
        // 다음으로 'css-loader'가 css를 commonJS로 바꾼다.
        // 다음으로 'style-loader'가 JS strings를 이용해서 html head에 style nodes를 만들어 넣는다.
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          'sass-loader',  
        ],
      },
    ],
  },
};