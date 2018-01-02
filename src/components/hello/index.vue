<template src="./index.html"></template>
<style src="./index.scss" lang="sass"></style>

<script>
    import { Component } from 'miox-vue2x';

    @Component({
        props: {
            message: String,
        },
    })
    export default class Hello {
        data = 'hello miox'
    }
</script>
