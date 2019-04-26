const Koa = require('koa');
const path = require('path')
const fs = require('fs');
const static = require('koa-static')
const app = new Koa();


app.use(static(path.join(__dirname, './docs')));
app.use(async(ctx,next)=>{
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./docs/index.html');
})

app.listen(8989, function () {
    console.log('启动前端项目')
})