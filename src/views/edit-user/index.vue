<style lang="less">
@import "./index.less";








</style>

<template>
    <div class="own-space">
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                代理商信息查看修改
            </p>
            <div>
                <Form ref="userForm"
                      :model="formValidate"
                      :label-width="100"
                      label-position="right"
                      :rules="ruleValidate">
                    <FormItem label="个人照片">
                        <div class="user-img" style="width: 120px; height: 120px;">
                            <img :src="formValidate.fullPic+'?x-oss-process=image/resize,m_fill,h_240,w_240'"
                                 alt="" style="height: 120px; width: 120px;">
                        </div>
                    </FormItem>
                    <FormItem label="姓名"
                              prop="name">
                        <Input v-model="formValidate.name" disabled
                               placeholder="请输入您的姓名"></Input>
                    </FormItem>
                    <FormItem label="手机号"
                              prop="phone">
                        <Input v-model="formValidate.phone" disabled></Input>
                    </FormItem>
                    <FormItem label="身份证号"
                              prop="personId">
                        <Input v-model="formValidate.personId"
                               placeholder="请输入身份证号"></Input>
                    </FormItem>
                    <FormItem label="引荐人"
                              prop="introducer">
                        <Input v-model="formValidate.introducer"
                               placeholder="请输入引荐人"></Input>
                    </FormItem>
                    <FormItem label="年龄" prop="age">
                        <Input v-model="formValidate.age"
                               placeholder="请输入您的年龄"></Input>
                    </FormItem>
                    <FormItem label="性别">
                        <RadioGroup v-model="formValidate.sex">
                            <Radio label="0">男</Radio>
                            <Radio label="1">女</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="所在企业">
                        <Input v-model="formValidate.company"
                               placeholder="请输入您所在企业"></Input>
                    </FormItem>
                    <FormItem label="所在地区">
                        <al-cascader v-model="formValidate.res1"
                                     data-type="name"
                                     level="2" />
                    </FormItem>
                    <FormItem label="注册邮箱"
                              prop="email">
                        <Input v-model="formValidate.email"
                               placeholder="请输入邮箱"></Input>
                    </FormItem>
                    <div>
                        <Button type="text"
                                style="width: 100px;"
                                @click="cancelEditUserInfor">取消</Button>
                        <Button type="primary"
                                v-show="showSaveEdit"
                                style="width: 100px;"
                                :loading="save_loading"
                                @click="saveEdit('userForm')">保存</Button>
                    </div>
                </Form>
            </div>
        </Card>
    </div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import Cookies from 'js-cookie';
import alCascader from '../my-components/area-linkage/components/al-cascader.vue';
import Util from '../../libs/util.js';

export default {
    name: 'ownspace_index',
    data () {
        const showSaveEdit = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'save_edit');
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };

        const validePersonId = (rule, value, callback) => {
            var re = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (!re.test(value)) {
                callback(new Error('请输入正确的身份证号'));
            } else {
                callback();
            }
        };

        const valideRePassword = (rule, value, callback) => {
            if (value !== this.formValidate.password) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        return {
            showSaveEdit, // 权限控制，是否显示提交修改按钮
            uid: '',
            baseUrl: 'http://192.168.0.155:12528',
            securityCode: '', // 验证码
            phoneHasChanged: false, // 是否编辑了手机
            save_loading: false,
            identifyError: '', // 验证码错误
            identifyCodeRight: false, // 验证码是否正确
            hasGetIdentifyCode: false, // 是否点了获取验证码
            canGetIdentifyCode: false, // 是否可点获取验证码
            checkIdentifyCodeLoading: false,
            inputCodeVisible: false, // 显示填写验证码box
            initPhone: '',
            gettingIdentifyCodeBtnContent: '获取验证码', // “获取验证码”按钮的文字
            formValidate: {
                fullPic: '',
                pic: '',
                name: '',
                email: '',
                province: '',
                city: '',
                county: '',
                company: '',
                sex: '0',
                age: '',
                introducer: '',
                phone: '',
                res1: [],
                personId: ''
            },
            ruleValidate: {
                age: [
                    { required: true, message: '年龄不得为空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '姓名不得为空', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '邮箱不得为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不对', trigger: 'blur' }
                ],
                introducer: [
                    { required: true, message: '引荐人不得为空', trigger: 'blur' }
                ],
                personId: [
                    { required: true, message: '请输入身份证号', trigger: 'blur' },
                    { validator: validePersonId }
                ],
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: validePhone }
                ]
            }
        };
    },
    methods: {
        ...mapActions([
            'ownSpaceGetData',
            'editUserGetData'
        ]),
        cancelEditUserInfor () {
            this.$store.commit('removeTag', 'ownspace_index');
            localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
            let lastPageName = '';
            if (this.$store.state.app.pageOpenedList.length > 1) {
                lastPageName = this.$store.state.app.pageOpenedList[1].name;
            } else {
                lastPageName = this.$store.state.app.pageOpenedList[0].name;
            }
            this.$router.push({
                name: lastPageName
            });
        },
        saveEdit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // 先转换参数
                    this.formValidate.province = this.formValidate.res1[0];
                    this.formValidate.city = this.formValidate.res1[1];
                    this.formValidate.county = this.formValidate.res1[2];
                    this.saveInfoAjax();
                }
            });
        },
        async saveInfoAjax () {
            this.save_loading = true;
            await this.editUserGetData(Object.assign(
                {},
                this.formValidate,
                {id: this.uid, agentId: this.$route.params.agentId})
            );
            if (this.editUserData.code === 1) {
                this.$Notice.success({
                    title: '修改信息成功'
                });
                if (this.uid == this.$route.params.agentId) {
                    await this.ownSpaceGetData({
                    id: this.uid
                    })
                    // 覆盖cookie中存的个人信息
                    Cookies.set('user', this.ownSpaceData.data);
                }
                this.save_loading = false;
            } else {
                this.$Message.error(this.ownSpaceModify.info);
                this.save_loading = false;
            } 
        }
    },
    async mounted () {
        this.uid = JSON.parse(Cookies.get('user')).id;
        await this.ownSpaceGetData({
            id: this.$route.params.agentId
        });
        if (this.ownSpaceData.code === 1) {
            this.formValidate = {
                fullPic: this.ownSpaceData.data.pic,
                pic: this.ownSpaceData.data.pic ? this.ownSpaceData.data.pic.split('/').reverse()[0] : '',
                name: this.ownSpaceData.data.name,
                email: this.ownSpaceData.data.email,
                province: this.ownSpaceData.data.province,
                city: this.ownSpaceData.data.city,
                county: this.ownSpaceData.data.county,
                sex: this.ownSpaceData.data.sex,
                age: `${this.ownSpaceData.data.age}`,
                introducer: this.ownSpaceData.data.introducer,
                company: this.ownSpaceData.data.company,
                phone: this.ownSpaceData.data.phone,
                res1: [this.ownSpaceData.data.province, this.ownSpaceData.data.city, this.ownSpaceData.data.county],
                personId: this.ownSpaceData.data.personId
            }
        }
    },
    computed: {
        ...mapGetters([
            'ownSpaceData',
            'editUserData'
        ])
    },
    components: {
        alCascader
    }
};
</script>
