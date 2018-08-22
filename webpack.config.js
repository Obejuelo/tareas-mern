module.exports = {
	entry: './server/app/index.js',
	output: {
		path: __dirname + '/server/public/js',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			}
		]
	}
};