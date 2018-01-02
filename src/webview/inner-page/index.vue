<template src="./index.html"></template>

<script>
    import { Webview, Component, life } from 'miox-vue2x';
    import Layout from '@u51/miox-ui-layout';
    import Icon from '@u51/miox-ui-ant-icon';
    import NavigateBar from '@u51/miox-ui-navigate-bar';
    import { Flex, FlexItem } from '@u51/miox-ui-flex';

    @Component({
        components: {
            layout: Layout,
            icon: Icon,
            navigator: NavigateBar,
            flex: Flex,
            'flex-item': FlexItem,
        },
    })
    export default class InnerPage extends Webview {
        @life
        mounted() {
            // 部分项目可能会有多个入口进入
            if (window.KMD) window.KMD.show();
        }

        prev() {
            this.$backward('/');
        }
    }
</script>
