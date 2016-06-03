module.exports = {
  entry: './client/container/todo',
  output: {
    filename: './client/bundle.js'       
  },
  module: {
     loaders: [
       {
         test: /\.js$/,
         exclude: /node_modules/,
         loader: 'babel',
         query: {
          presets: ['react']
         }
       },
       {
         test: /\.jsx$/,
         loaders: ['babel-loader']
       },
       {
         test: /\.html$/,
         loader: "file?name=[name].[ext]"
       }
     ]
   },
   //not sure you need this. 
   resolve: {
     extensions: ['', '.js', '.jsx']
   }
};