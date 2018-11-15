<template>
    <div class="tender-comparison">
        <Row>
            <Col span="24">
            <Card>
                <Form ref="contractForm"
                      :model="formValidateBuy"
                      :label-width="100"
                      label-position="right"
                      :rules="ruleValidateBuy">
                    <FormItem label="合同名称"
                              prop="contractName">
                        <Input v-model="formValidateBuy.contractName"
                               placeholder="合同名称"></Input>
                    </FormItem>

                    <FormItem label="合同类型"
                              prop="">
                        <Input v-model="formValidateBuy.contractType"
                               placeholder="合同类型"></Input>
                    </FormItem>
                    <FormItem label="合同编号"
                              prop="">
                        <Input v-model="formValidateBuy.contractNumber"
                               placeholder="合同编号"></Input>
                    </FormItem>
                    <FormItem label="合同金额"
                              prop="">
                        <Input v-model="formValidateBuy.contractAmount"
                               placeholder="合同金额"></Input>
                    </FormItem>
                    <FormItem label="合作单位"
                              prop="">
                        <Input v-model="formValidateBuy.cooperationUnit"
                               placeholder="合作单位"></Input>
                    </FormItem>
                    <FormItem label="签订日期"
                              prop="">
                        <DatePicker type="date" v-model="formValidateBuy.signTime" placeholder="请选择签订日期" format="yyyy-MM-dd"></DatePicker>
                    </FormItem>
                    <FormItem label="支付方式"
                              prop="">
                        <Input v-model="formValidateBuy.payment"
                               placeholder="支付方式"></Input>
                    </FormItem>
                    <FormItem label="工期"
                              prop="">
                        <Input v-model="formValidateBuy.limitTime"
                               placeholder="工期"></Input>
                    </FormItem>
                    <FormItem label="未付款项"
                              prop="">
                        <Input v-model="formValidateBuy.unpaidItem"
                               placeholder="未付款项"></Input>
                    </FormItem>
                    <FormItem label="工程验收"
                              prop="">
                        <Input v-model="formValidateBuy.projectAccept"
                               placeholder="工程验收"></Input>
                    </FormItem>
                    <FormItem label="质保金金额"
                              prop="">
                        <Input v-model="formValidateBuy.qualityGuaranteeDepositAmount"
                               placeholder="质保金金额"></Input>
                    </FormItem>
                    <FormItem label="备注"
                              prop="">
                        <Input v-model="formValidateBuy.remark"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               placeholder=""></Input>
                    </FormItem>
                </Form>

                <div  class="submit-news">
                    <Button type="primary" :loading="modal_loading" @click="saveEdit('contractForm')">提交</Button>
                </div>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<style lang="less">
@import "./index.less";

</style>

<script src="./index.js">
</script>
