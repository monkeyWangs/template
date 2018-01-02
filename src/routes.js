import Router from 'miox-router';
import toast from 'root/lib/toast';
import IndexPage from './webview/index-page/index.vue';

const Ro = new Router();

export default Ro;

Ro.patch('/', async ctx => {
    await ctx.render(IndexPage);
});

// 统一入口给加载webview chunk时加上loading
[
    ['/inner', 'inner-page'],
].forEach(meta => {
    Ro.patch(meta[0], async ctx => {
        toast.loading('加载中...');
        const webview = await import(`./webview/${meta[1]}/index.vue`);
        toast.close('加载中...');
        // babel-plugin-add-module-exports在这个场景下无效
        await ctx.render(webview.default);
    });
})
