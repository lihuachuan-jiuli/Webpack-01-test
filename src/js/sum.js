
// export default 把模块内容暴露出去
export default function sum(...args) {
    // 累加和
    return args.reduce((p,c)=> p + c, 0);
}