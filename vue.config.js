module.exports = {
	  devServer: {
	    proxy: {
	     '/api': {
	             target: 'http://api.zhengtaixinnengyuan.com',
	             changeOrigin: true, 
	                 pathRewrite: {
	                 "^/api": ""
	            }
	        }
	    }
	}
}