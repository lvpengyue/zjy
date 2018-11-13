<style lang="less">
@import "../../styles/common.less";
@import "./index.less";

</style>
<template>
    <div class="permission-index"
         v-if="contractMaterialData && contractMaterialData.data">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title"
                     class="card-title">
                    
                    <Button type="primary"
                            size="default"
                            @click="handleAdd()">添加物资</Button>
                </div>
                <Table :columns="columns"
                       size="large"
                       no-data-text="暂无数据"
                       no-filtered-data-text="没有符合条件的数据"
                       :data="contractMaterialData.data"></Table>
                <Page :total="contractMaterialData.count"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共
                        <span style="font-size: 20px; color: red; padding: 0 4px;">{{contractMaterialData.count}}</span>条数据</span>
                </Page>
            </Card>
            </Col>
        </Row>
        <Modal v-model="addOrEdit"
               width="500">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>新增/编辑物资信息</span>
            </p>
            <div>
                <Form ref="userForm"
                      :model="formValidate1"
                      :label-width="100"
                      label-position="right"
                      :rules="ruleValidate1">
                    <FormItem label="物资名称"
                              prop="name">
                        <Input v-model="formValidate1.name"
                               placeholder="请输入物资名称"></Input>
                    </FormItem>
                    <FormItem label="物资品牌"
                              prop="brand">
                        <Input v-model="formValidate1.brand"
                               type="text"
                               placeholder="请输入品牌"></Input>
                    </FormItem>
                    <FormItem label="物资价格"
                              prop="">
                        <Input v-model="formValidate1.price"
                               placeholder="请输入物资价格"></Input>
                    </FormItem>
                    <FormItem label="物资数量"
                              prop="">
                        <Input v-model="formValidate1.number"
                               placeholder="请输入身份证号"></Input>
                    </FormItem>
                    <FormItem label="操作人"
                              prop="librarian">
                        <Input v-model="formValidate1.librarian"
                               placeholder="请输入操作人"></Input>
                    </FormItem>
                    <FormItem label="物资备注"
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
