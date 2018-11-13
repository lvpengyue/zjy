<style lang="less">
@import "../../styles/common.less";
@import "./index.less";

</style>
<template>
    <div class="permission-index"
         v-if="permissionIndexData && permissionIndexData.data">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title"
                     class="card-title">
                    <Form inline>
                        <FormItem>
                            <Input type="text"
                                   v-model="search.userName"
                                   placeholder="姓名">
                            <Icon type="ios-person-outline"
                                  slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem v-if="permissionRoleData && permissionRoleData.data">
                            <Select placeholder="请选择角色"
                                    v-model="search.roleId"
                                    style="width: 200px;">
                                <Option v-for="item in permissionRoleData.data"
                                        :key="item.id"
                                        :value="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary"
                                    size="default"
                                    @click="handleSearch()">搜索</Button>
                        </FormItem>
                        <FormItem>
                            <Button type="default"
                                    size="default"
                                    @click="handleReset()">重置</Button>
                        </FormItem>
                    </Form>
                    <Button type="primary"
                            size="default"
                            @click="handleAdd()">新增人员</Button>
                </div>
                <Table :columns="columns"
                       size="large"
                       no-data-text="暂无数据"
                       no-filtered-data-text="没有符合条件的数据"
                       :data="permissionIndexData.data"></Table>
                <Page :total="permissionIndexData.count"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共
                        <span style="font-size: 20px; color: red; padding: 0 4px;">{{permissionIndexData.count}}</span>条数据</span>
                </Page>
            </Card>
            </Col>
        </Row>
        <Modal v-model="addOrEdit"
               width="500">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>新增/编辑人员信息</span>
            </p>
            <div>
                <Form ref="userForm"
                      :model="formValidate1"
                      :label-width="100"
                      label-position="right"
                      :rules="ruleValidate1">
                    <FormItem label="账号"
                              prop="userName">
                        <Input v-model="formValidate1.userName"
                               placeholder="请输入账号"></Input>
                    </FormItem>
                    <FormItem label="密码"
                              prop="password">
                        <Input v-model="formValidate1.password"
                               type="password"
                               placeholder="请输入密码"></Input>
                    </FormItem>
                    <FormItem label="真实姓名"
                              prop="realName">
                        <Input v-model="formValidate1.realName"
                               placeholder="请输入账号"></Input>
                    </FormItem>
                    <FormItem label="身份证号"
                              prop="idcard">
                        <Input v-model="formValidate1.idcard"
                               placeholder="请输入身份证号"></Input>
                    </FormItem>
                    <FormItem label="手机号"
                              prop="phone">
                        <Input v-model="formValidate1.phone"
                               placeholder="请输入手机号"></Input>
                    </FormItem>
                    <FormItem label="邮箱"
                              prop="email">
                        <Input v-model="formValidate1.email"
                               placeholder="请输入邮箱"></Input>
                    </FormItem>
                    <FormItem label="请选择角色："
                              prop="roleId">
                        <Select placeholder="请选择角色"
                                v-model="formValidate1.roleId"
                                style="width: 200px;">
                            <Option v-for="sitem in permissionRoleData.data"
                                    :value="`${sitem.id}`"
                                    :key="sitem.id">{{ sitem.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="备注"
                              prop="">
                        <Input v-model="formValidate1.remark"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               placeholder=""></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="error"
                        size="large"
                        long
                        :loading="modal_loading"
                        @click="saveUser('userForm')">确定提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script src="./index.js">
</script>

<style>
