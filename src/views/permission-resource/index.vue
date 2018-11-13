<style lang="less">
@import "../../styles/common.less";
@import "./index.less";






</style>
<template>
    <div class="agent-list" v-if="permissionResourceData && permissionResourceData.data">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title">
                    <Button type="primary"
                        size="default"
                        v-show="showEdit == 'inline-block'"
                        @click="handleAdd">新增资源</Button>
                </div>
                <Table :columns="columns"
                        size="large"
                        no-data-text="暂无数据"
                        no-filtered-data-text="没有符合条件的数据"
                       :data="permissionResourceData.data"></Table>
            </Card>
            </Col>
        </Row>
        <Modal v-model="editResource"
               width="500">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>新增资源</span>
            </p>
            <div>
                <Form :model="formValidate"
                      ref="editResource"
                      :rules="ruleValidate"
                      :label-width="180">
                    <FormItem label="权限名称：" prop="name">
                        <Input type="text" v-model="formValidate.name"></Input>
                    </FormItem>
                    <FormItem label="权限级别：">
                        <Input type="text" v-model="formValidate.level" placeholder="0是一级权限，1是二级"></Input>
                    </FormItem>
                    <FormItem label="父级权限ID：">
                        <Select v-model="formValidate.parentId">
                            <Option v-for="item in permissionResourceData.data" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="对应页面资源：" prop="url">
                        <Input type="text" v-model="formValidate.url"></Input>
                    </FormItem>
                    <FormItem label="权限CODE：">
                        <Input type="text" v-model="formValidate.value"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="error"
                        size="large"
                        long
                        :loading="modal_loading"
                        @click="saveEdit('editResource')">确定提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script src="./index.js">
</script>

<style>
