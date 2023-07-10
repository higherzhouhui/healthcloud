module.exports = {
	  devServer: {
	    proxy: {
	     '/api': {
	             target: 'http://domain.jxybao.com',
	             changeOrigin: true, 
	                 pathRewrite: {
	                 "^/api": ""
	            }
	        }
	    }
	}
}