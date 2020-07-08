<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        methods: {}
    }
</script>

<style>
    #app {
        /*font-family: Helvetica, sans-serif;*/
        /*text-align: center;*/
    }

    /**
    解决element-ui的table表格控件表头与内容列不对齐问题
     */
    body.el-table th.gutter {
        display: table-cell !important;
    }
</style>

