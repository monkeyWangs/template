<template src="./index.html"></template>

<script>
    import { Webview, Component, life } from 'miox-vue2x';
    import Layout from '@u51/miox-ui-layout';
    import Icon from '@u51/miox-ui-ant-icon';
    import NavigateBar from '@u51/miox-ui-navigate-bar';
    import { Flex, FlexItem } from '@u51/miox-ui-flex';
    import { fetchUserInfo } from 'root/lib/service';
    // import { loggerHelper, PageA } from 'root/lib/logger';

    // @loggerHelper('PageA')
    @Component({
        components: {
            layout: Layout,
            icon: Icon,
            navigator: NavigateBar,
            flex: Flex,
            'flex-item': FlexItem,
        },
    })
    export default class IndexPage extends Webview {
        name = '';
        next() {
            this.$forward('/inner');
        }
        @life created() {
            // this.sendLogger(PageA.pv.code, PageA.pv.msg);
            fetchUserInfo().then(data => {
                this.name = data.name;
            });
        }
        @life
        mounted() {
            // 性能埋点
            if (window.KMD) window.KMD.show();
        }
    }
</script>
