module.exports = {
	  devServer: {
	    proxy: {
	     '/api': {
	             target: 'https://api.jianxiangyunbao.cc',
	             changeOrigin: true, 
	                 pathRewrite: {
	                 "^/api": ""
	            }
	        }
	    }
	}
}