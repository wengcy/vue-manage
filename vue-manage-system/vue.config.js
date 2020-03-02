module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                //target:'http://192.168.3.18',
                target:'http://120.24.50.184:9000/iot_data_server/report',
                changeOrigin:true,
                ws: true,
                secure:false,
                pathRewrite:{
                    '^/api': ''
                }
            }
        }
    }
}