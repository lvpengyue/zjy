<style lang="less">
@import "../../styles/common.less";
@import "./index.less";

</style>
<template>
    <div class="agent-list"
         v-if="permissionRoleData && permissionRoleData.data">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title">
                    <Button type="primary"
                            size="default"
                            @click="handleAdd">新增角色</Button>
                </div>
                <Table :columns="columns"
                       size="large"
                       no-data-text="暂无数据"
                       no-filtered-data-text="没有符合条件的数据"
                       :data="permissionRoleData.data"></Table>
            </Card>
            </Col>
        </Row>
        <Modal v-model="editRole"
               width="500">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>新增/编辑角色</span>
            </p>
            <div>
                <Form :model="formValidate"
                      ref="editRole"
                      :rules="ruleValidate"
                      :label-width="180">
                    <FormItem label="角色名称："
                              prop="name">
                        <Input type="text"
                               v-model="formValidate.name"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="error"
                        size="large"
                        long
                        :loading="modal_loading"
                        @click="saveEdit('editRole')">确定提交</Button>
            </div>
        </Modal>
        <Modal v-model="editAllocate"
               width="600">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>分配权限</span>
            </p>
            <div class="tree-wrap">
                <Tree :data="roleList" show-checkbox multiple @on-check-change="getNodes">

                </Tree>
            </div>
            <div slot="footer">
                <Button type="error"
                        size="large"
                        long
                        :disabled="canNotSave"
                        :loading="modal_loading"
                        @click="saveAllocate()">确定提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script src="./index.js">
</script>

<style>
