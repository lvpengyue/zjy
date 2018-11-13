<template>
    <div class="table-expand">
        <p v-for="item in expandObj">
            <span>{{item.title}}:</span>
            <span v-if="item.arr">{{item.arr[row[item.key]]}}</span>
            <span v-else>{{row[item.key]}}</span>
        </p>
    </div>
</template>

<style lang="less">
@import "./index.less";


</style>

<script src="./index.js">
</script>
