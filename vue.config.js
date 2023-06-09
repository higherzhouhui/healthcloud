module.exports = {
	  devServer: {
	    proxy: {
	     '/api': {
	             target: 'http://www.zhengtaixinnengyuan.com',
	             changeOrigin: true, 
	                 pathRewrite: {
	                 "^/api": ""
	            }
	        }
	    }
	}
}