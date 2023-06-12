module.exports = {
	  devServer: {
	    proxy: {
	     '/api': {
	             target: 'https://338v828404.goho.co',
	             changeOrigin: true, 
	                 pathRewrite: {
	                 "^/api": ""
	            }
	        }
	    }
	}
}