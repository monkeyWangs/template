/**
 * initialize 文件必须前置在 miox-vue2x 之前，
 * 因为我们的webview实例在引入 miox-vue2x 的时机就会继承vue，
 * 插件需要在vue对象上面放置属性如vuex在此之后执行将会无效
 * 所有vue插件放置于此，比如vuex
 * Created by leon on 16/11/28.
 */

// import vue from 'vue';
// import vuex from 'vuex';
//
// vue.use(vuex);
import { PG } from '@u51/pg/full';

PG.Log.setMeta({
    service: '',
    sendPolicy: 0, // 0:打包发送， 1:实时发送
});

// mock需要在axios实例初始化之前
if (process.env.NODE_ENV === 'development') {
    require('./mock');
}

// iOS 锁定webview
PG.exec('setWebViewScrollLock', {
    lock: true,
});

PG.on('U51PageResumeEvent', () => {
    // 页面生命周期内被重新唤起
});
