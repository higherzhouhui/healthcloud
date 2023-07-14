module.exports = {
	  devServer: {
	    proxy: {
	     '/api': {
	             target: 'http://api.jxgyi.top',
	             // target: 'http://192.168.2.166:8000',
	             changeOrigin: true, 
	                 pathRewrite: {
	                 "^/api": ""
	            }
	        }
	    }
	}
}