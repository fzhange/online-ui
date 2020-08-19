export default {
    extractCSS: true,
    esm:{
        type:"babel",
    },
    cjs:{
        type:"babel"
    },
    entry: 'src/index.js', 
    lessInBabelMode:true, //在 babel 模式下做 less 编译，基于 gulp-less，默认不开启。
    extraBabelPlugins:[],
    umd:{
        name:"gs_online_ui",
        sourcemap: true,
        minFile:true,
        globals:{
            react: 'React',
        }
    },
    doc:{
        base: '/frontStrategyGroup/gs_online_ui'
    }
}
