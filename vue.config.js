module.exports = {
	  devServer: {
	    proxy: {
	     '/api': {
	             target: 'http://api.jianxyb.top',
	             changeOrigin: true, 
	                 pathRewrite: {
	                 "^/api": ""
	            }
	        }
	    }
	}
}