module.exports = {
	  devServer: {
	    proxy: {
	     '/api': {
	             target: 'http://47.242.197.116:8000',
	             changeOrigin: true, 
	                 pathRewrite: {
	                 "^/api": ""
	            }
	        }
	    }
	}
}