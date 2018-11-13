<style lang="less">
@import "../../styles/common.less";
@import "./index.less";

</style>
<template>
    <div class="tender-index"
         v-if="contractTenderData && contractTenderData.data && showIndex">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title"
                     class="card-title">
                    <Form inline>
                        <FormItem>
                            <Input type="text"
                                   v-model="search.name"
                                   placeholder="招标项目名称">
                            <Icon type="ios-person-outline"
                                  slot="prepend"></Icon>
                            </Input>
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
                            @click="handleAdd()">新增招标项目</Button>
                </div>
                <Table :columns="columns"
                       size="large"
                       no-data-text="暂无数据"
                       no-filtered-data-text="没有符合条件的数据"
                       :data="contractTenderData.data"></Table>
                <Page :total="contractTenderData.count"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共
                        <span style="font-size: 20px; color: red; padding: 0 4px;">{{contractTenderData.count}}</span>条数据</span>
                </Page>
            </Card>
            </Col>
        </Row>
        <Modal v-model="addOrEdit"
               width="500">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>新增/编辑招标项目信息</span>
            </p>
            <div>
                <Form ref="tenderForm"
                      :model="formValidate1"
                      :label-width="100"
                      label-position="right"
                      :rules="ruleValidate1">
                    <FormItem label="账号"
                              prop="name">
                        <Input v-model="formValidate1.name"
                               placeholder="请输入账号"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="error"
                        size="large"
                        long
                        :loading="modal_loading"
                        @click="saveUser('tenderForm')">确定提交</Button>
            </div>
        </Modal>
    </div>
    <div class="tender-index" v-else>
        <Row>
            <Col span="24">
            <Card>
                <div slot="title"
                     class="card-title">
                    <Tabs type="card" v-model="tabName">
                        <TabPane label="项目询比价单" name="comparison">
                            <tender-comparison></tender-comparison>
                        </TabPane>
                        <TabPane label="项目物资采购" name="buy">
                            <tender-buy></tender-buy>
                        </TabPane>
                        <TabPane label="项目付款进度" name="pay">
                            <tender-payment></tender-payment>
                        </TabPane>
                        <TabPane label="项目资料上传" name="material">
                            <tender-upload></tender-upload>
                        </TabPane>
                    </Tabs>
                </div>
            </Card>
            </Col>
        </Row>        
    </div>
</template>

<script src="./index.js">
</script>

<style>
