export default {
    extractCSS: true,
    esm:{
        type:"babel",
    },
    cjs:{
        type:"babel"
    },
    entry: 'src/index.js', 
    lessInBabelMode:true,
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
        base: '/gs_online_ui/'
    }
}