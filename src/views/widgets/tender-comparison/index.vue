<template>
    <div class="tender-comparison">
        <Row>
            <Col span="24">
            <Card>
                <Form ref="comparisonForm"
                      :model="formValidate1"
                      :label-width="100"
                      label-position="right"
                      :rules="ruleValidate1">
                    <FormItem label="询价员"
                              prop="">
                        <Input v-model="formValidate1.inquiryOfficer"
                               placeholder="询价员"></Input>
                    </FormItem>

                    <FormItem label="询价单位"
                              prop="">
                        <Input v-model="formValidate1.inquiryUnit"
                               placeholder="询价单位"></Input>
                    </FormItem>
                    <FormItem label="供货单位"
                              prop="">
                        <Input v-model="formValidate1.supplyUnit"
                               placeholder="供货单位"></Input>
                    </FormItem>
                    <FormItem label="备注"
                              prop="">
                        <Input v-model="formValidate1.remark"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               placeholder=""></Input>
                    </FormItem>
                    <FormItem label="需求计划"
                              class="img-wrap"
                              prop="">
                        <Avatar :src="formValidate1.imgUrl" v-if="formValidate1.demandPlan" style="width: 60px; height: 60px; margin: 0 20px;"></Avatar> 
                        <Upload :action="`${conf.baseUrl}/img/upload`"
                            :on-success="handleSuccess1"
                            :format="['jpg','jpeg','png']"
                            :on-format-error="handleFormatError"                            
                            :show-upload-list="false">
                            <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="采购计划"
                              class="img-wrap"
                              prop="">
                        <Avatar :src="formValidate1.imgUrl" v-if="formValidate1.procurementPlan" style="width: 60px; height: 60px; margin: 0 20px;"></Avatar> 
                        <Upload :action="`${conf.baseUrl}/img/upload`"
                            :on-success="handleSuccess2"
                            :format="['jpg','jpeg','png']"
                            :on-format-error="handleFormatError"                            
                            :show-upload-list="false">
                            <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="询价单"
                              prop="">
                        <Button type="primary" class="tender-btn">详情</Button>
                    </FormItem>
                    <FormItem label="报价单"
                              prop="">
                        <Button type="primary" class="tender-btn">详情</Button>
                    </FormItem>
                    <FormItem label="比价情况"
                              prop="">
                        <Button type="primary" class="tender-btn">详情</Button>
                    </FormItem>
                </Form>

                <div  class="submit-news">
                    <Button type="primary" :loading="modal_loading" @click="saveEdit('comparisonForm')">提交</Button>
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
