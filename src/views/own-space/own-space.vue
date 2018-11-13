<style lang="less">
@import "./own-space.less";

</style>

<template>
    <div class="own-space">
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <ul v-if="ownSpaceData && ownSpaceData.data">
                <li>
                    <span class="title">账户名：</span>
                    <span class="value">{{ownSpaceData.data.userName}}</span>
                </li>
                <li>
                    <span class="title">真实姓名：</span>
                    <span class="value">{{ownSpaceData.data.realName}}</span>
                </li>
                <li>
                    <span class="title">角色：</span>
                    <span class="value">{{ownSpaceData.data.roleId}}</span>
                </li>
                <li>
                    <span class="title">身份证号：</span>
                    <span class="value">{{ownSpaceData.data.idcard}}</span>
                </li>
                <li>
                    <span class="title">邮箱：</span>
                    <span class="value">{{ownSpaceData.data.email}}</span>
                </li>
                <li>
                    <span class="title">备注：</span>
                    <span class="value">{{ownSpaceData.data.remark}}</span>
                </li>
                <li>
                    <span class="title">创建时间：</span>
                    <span class="value">{{ownSpaceData.data.createtime}}</span>
                </li>
            </ul>
        </Card>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import Util from '../../libs/util.js';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'ownspace_index',
    data () {
        return {
            userData: '',
        };
    },
    methods: {
        ...mapActions([
            'ownSpaceGetData'
        ])
    },
    async mounted () {
        this.userData = JSON.parse(Cookies.get('user'));
        await this.ownSpaceGetData({
            uid: this.userData.uid
        });
    },
    computed: {
        ...mapGetters([
            'ownSpaceData'
        ])
    },
};
</script>
