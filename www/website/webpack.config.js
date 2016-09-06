var webpack = require('webpack');

function rewriteUrl(replacePath) {
    return function(req, opt) {
        var queryIndex = req.url.indexOf('?');
        var query = queryIndex >= 0 ? req.url.substr(queryIndex) : "";

        req.url = req.path.replace(opt.path, replacePath) + query;
        console.log("rewriting ", req.originalUrl, req.url);
    };
}

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		publicPath: '/assets/'
	},
	module: {

	},
	resolve: {
		alias: {
			jquery: "/lib/jquery/dist/jquery.min.js",
			underscore: "/lib/underscore/underscore.js",
			backbone: "/lib/backbone/backbone.js"
		}
	},

	devServer: {
		stats: { colors: true },
		port: 8080,
		inline: true,
		proxy: [{
			path: '/api/**',
			target: "http://localhost:3000/",
			rewrite: rewriteUrl('/$1\.json'),
			changeOrigin: true,
			secure: false
		}]
      /*proxy: {
      '/api/**': {
				target: 'http://localhost:3000',
				secure: false
	      	}
	    }*/
    }

}