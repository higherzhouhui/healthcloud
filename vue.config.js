module.exports = {
	  devServer: {
	    proxy: {
	     '/api': {
	             target: 'http://api.jianxiangyunbao.cc',
	             changeOrigin: true, 
	                 pathRewrite: {
	                 "^/api": ""
	            }
	        }
	    }
	}
}