<template>
    <div class="tender-payment"
         v-if="contractTenderPaymentData && contractTenderPaymentData.data">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title"
                     class="card-title">
                    <!-- <Form inline>
                        <FormItem>
                            <Input type="text"
                                   v-model="search.name"
                                   placeholder="姓名">
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
                    </Form> -->
                    <Button type="primary"
                            size="default"
                            @click="handleAdd()">新增付款进度</Button>
                </div>
                <Table :columns="columns"
                       size="large"
                       no-data-text="暂无数据"
                       no-filtered-data-text="没有符合条件的数据"
                       :data="contractTenderPaymentData.data"></Table>
                <!-- <Page :total="contractTenderPaymentData.count"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共
                        <span style="font-size: 20px; color: red; padding: 0 4px;">{{contractTenderPaymentData.count}}</span>条数据</span>
                </Page> -->
            </Card>
            </Col>
        </Row>
        <Modal v-model="addOrEdit"
               width="500">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>新增/编辑付款进度信息</span>
            </p>
            <div>
                <Form ref="paymentForm"
                      :model="formValidatePayment"
                      :label-width="100"
                      label-position="right"
                      :rules="ruleValidatePayment">
                    <FormItem label="项目进度"
                              prop="projectSchedule">
                        <Input v-model="formValidatePayment.projectSchedule"
                               placeholder="项目进度"></Input>
                    </FormItem>
                    <FormItem label="付款批次"
                              prop="paymentBatch">
                        <Input v-model="formValidatePayment.paymentBatch"
                               type="text"
                               placeholder="付款批次"></Input>
                    </FormItem>
                    <FormItem label="付款金额（元）"
                              prop="amount">
                        <Input v-model="formValidatePayment.amount"
                               placeholder="付款金额（元）"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="error"
                        size="large"
                        long
                        :loading="modal_loading"
                        @click="savePayment('paymentForm')">确定提交</Button>
            </div>
        </Modal>
    </div>
</template>

<style lang="less">
@import "./index.less";
@import "../../../styles/common.less";

</style>
<script src="./index.js">
</script>
