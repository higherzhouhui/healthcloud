module.exports = {
	  devServer: {
	    proxy: {
	     '/api': {
	             target: 'http://api.jianxiangyunbao.com',
	             changeOrigin: true, 
	                 pathRewrite: {
	                 "^/api": ""
	            }
	        }
	    }
	}
}