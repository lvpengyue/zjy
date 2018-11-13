<template>
    <div class="log-table-expand" v-if="row && row.length > 0">
        <div v-for = "item in row" class="each-log">
            <div class="title">
                <h4>{{new Date(parseInt(item.updateTime)).toLocaleString()}}</h4>
                <div class="state state-important" v-if="item.noticeByEmail == 1">
                    重要
                </div>
                <div class="state state-common" v-else>
                    普通
                </div>
            </div>    
            <div>
                <p><span>竞争对手情况：</span>{{item.opponentDescribe ? item.opponentDescribe : '未更新'}}</p>
                <p><span>公共洗衣房情况：</span>{{item.publicWasherDescribe ? item.publicWasherDescribe : '未更新'}}</p>
                <p><span>与学校对接情况：</span>{{item.buttDescribe ? item.buttDescribe : '未更新'}}</p>
            </div>
        </div>
    </div>
</template>

<style lang="less">
@import "./index.less";




</style>

<script src="./index.js">
</script>
