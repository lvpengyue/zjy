<template>
    <div class="tender-comparison">
        <Row>
            <Col span="24">
            <Card>
                <Form ref="comparisonForm"
                      :model="formValidate2"
                      :label-width="100"
                      label-position="right"
                      :rules="ruleValidate2">
                    <FormItem label="询价员"
                              prop="inquiryOfficer">
                        <Input v-model="formValidate2.inquiryOfficer"
                               placeholder="询价员"></Input>
                    </FormItem>

                    <FormItem label="询价单位"
                              prop="">
                        <Input v-model="formValidate2.inquiryUnit"
                               placeholder="询价单位"></Input>
                    </FormItem>
                    <FormItem label="供货单位"
                              prop="">
                        <Input v-model="formValidate2.supplyUnit"
                               placeholder="供货单位"></Input>
                    </FormItem>
                    <FormItem label="备注"
                              prop="">
                        <Input v-model="formValidate2.remark"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               placeholder=""></Input>
                    </FormItem>
                    <FormItem label="需求计划"
                              class="img-wrap"
                              prop="">
                        <Avatar :src="formValidate2.imgUrl"
                                v-if="formValidate2.demandPlan"
                                style="width: 60px; height: 60px; margin: 0 20px;"></Avatar>
                        <Upload :action="`${conf.baseUrl}/img/upload`"
                                :on-success="handleSuccess1"
                                :format="['jpg','jpeg','png']"
                                :on-format-error="handleFormatError"
                                :show-upload-list="false">
                            <Button type="ghost"
                                    icon="ios-cloud-upload-outline">Upload files</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="采购计划"
                              class="img-wrap"
                              prop="">
                        <Avatar :src="formValidate2.imgUrl"
                                v-if="formValidate2.procurementPlan"
                                style="width: 60px; height: 60px; margin: 0 20px;"></Avatar>
                        <Upload :action="`${conf.baseUrl}/img/upload`"
                                :on-success="handleSuccess2"
                                :format="['jpg','jpeg','png']"
                                :on-format-error="handleFormatError"
                                :show-upload-list="false">
                            <Button type="ghost"
                                    icon="ios-cloud-upload-outline">Upload files</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="询价单"
                              prop="">
                        <Button type="primary"
                                class="tender-btn" @click="showInquiryModal()">详情</Button>
                    </FormItem>
                    <FormItem label="报价单"
                              prop="">
                        <Button type="primary"
                                class="tender-btn"  @click="showQuotationModal()">详情</Button>
                    </FormItem>
                    <FormItem label="比价情况"
                              prop="">
                        <Button type="primary"
                                class="tender-btn" @click="showComparisonModal()">详情</Button>
                    </FormItem>
                </Form>

                <div class="submit-news">
                    <Button type="primary"
                            :loading="modal_loading"
                            @click="saveProjectComparison('comparisonForm')">提交</Button>
                    <Button type="primary"
                            :loading="modal_loading"
                            v-show="formValidate2.id"
                            @click="delProjectComparison()">删除</Button>
                </div>
            </Card>
            </Col>
        </Row>
        <Modal v-model="showInquiry"
               width="500">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>新增/编辑询价单</span>
            </p>
            <div>
                <Form ref="inquiryForm"
                      :model="formValidateInquiry"
                      :label-width="100"
                      label-position="right"
                      :rules="ruleValidateInquiry">
                    <FormItem label="名称"
                              prop="name">
                        <Input v-model="formValidateInquiry.name"
                               placeholder="请输入名称"></Input>
                    </FormItem>
                    <FormItem label="规格型号"
                              prop="">
                        <Input v-model="formValidateInquiry.specificationType"
                               type="text"
                               placeholder="请输入规格型号"></Input>
                    </FormItem>
                    <FormItem label="计量单位"
                              prop="">
                        <Input v-model="formValidateInquiry.unit"
                               placeholder="请输入计量单位"></Input>
                    </FormItem>
                    <FormItem label="数量"
                              prop="">
                        <Input v-model="formValidateInquiry.number"
                               placeholder="请输入数量"></Input>
                    </FormItem>
                    <FormItem label="单价"
                              prop="">
                        <Input v-model="formValidateInquiry.univalent"
                               placeholder="请输入单价"></Input>
                    </FormItem>
                    <FormItem label="金额"
                              prop="">
                        <Input v-model="formValidateInquiry.money"
                               placeholder="请输入金额"></Input>
                    </FormItem>
                    <FormItem label="生产厂家"
                              prop="">
                        <Input v-model="formValidateInquiry.factoryBrand"
                               placeholder="请输入生产厂家"></Input>
                    </FormItem>
                    <FormItem label="到货时间"
                              prop="">
                        <DatePicker type="date" v-model="formValidateInquiry.arrivalTime" placeholder="请选择到货时间" format="yyyy-MM-dd"></DatePicker>
                    </FormItem>
                    <FormItem label="备注"
                              prop="">
                        <Input v-model="formValidateInquiry.remark"
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
                        @click="saveInquiry('inquiryForm')">确定提交</Button>
            </div>
        </Modal>

        <!--报价弹框-->
        <Modal v-model="showQuotation"
               width="500">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>新增/编辑报价单</span>
            </p>
            <div>
                <Form ref="quotationForm"
                      :model="formValidateQuotation"
                      :label-width="100"
                      label-position="right"
                      :rules="ruleValidateQuotation">
                    <FormItem label="名称"
                              prop="name">
                        <Input v-model="formValidateQuotation.name"
                               placeholder="请输入名称"></Input>
                    </FormItem>
                    <FormItem label="规格型号"
                              prop="">
                        <Input v-model="formValidateQuotation.specificationType"
                               type="text"
                               placeholder="请输入规格型号"></Input>
                    </FormItem>
                    <FormItem label="计量单位"
                              prop="">
                        <Input v-model="formValidateQuotation.unit"
                               placeholder="请输入计量单位"></Input>
                    </FormItem>
                    <FormItem label="数量"
                              prop="">
                        <Input v-model="formValidateQuotation.number"
                               placeholder="请输入数量"></Input>
                    </FormItem>
                    <FormItem label="单价"
                              prop="">
                        <Input v-model="formValidateQuotation.univalent"
                               placeholder="请输入单价"></Input>
                    </FormItem>
                    <FormItem label="金额"
                              prop="">
                        <Input v-model="formValidateQuotation.money"
                               placeholder="请输入金额"></Input>
                    </FormItem>
                    <FormItem label="生产厂家"
                              prop="">
                        <Input v-model="formValidateQuotation.factoryBrand"
                               placeholder="请输入生产厂家"></Input>
                    </FormItem>
                    <FormItem label="到货时间"
                              prop="">
                        <DatePicker type="date" v-model="formValidateQuotation.arrivalTime" placeholder="请选择到货时间" format="yyyy-MM-dd"></DatePicker>
                    </FormItem>
                    <FormItem label="备注"
                              prop="">
                        <Input v-model="formValidateQuotation.remark"
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
                        @click="saveQuotation('quotationForm')">确定提交</Button>
            </div>
        </Modal>

        <!--比价弹框-->
        <Modal v-model="showComparison"
               width="900">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>新增/编辑报价单</span>
            </p>
            <div>
                <Form ref="compareForm"
                      :model="formValidateComparison"
                      :label-width="100"
                      label-position="right"
                      :rules="ruleValidateComparison">
                    <FormItem label="名称"
                              prop="name">
                        <Input v-model="formValidateComparison.name"
                               placeholder="请输入名称"></Input>
                    </FormItem>
                    <FormItem label="规格型号"
                              prop="">
                        <Input v-model="formValidateComparison.specificationType"
                               type="text"
                               placeholder="请输入规格型号"></Input>
                    </FormItem>
                    <FormItem label="计量单位"
                              prop="">
                        <Input v-model="formValidateComparison.unit"
                               placeholder="请输入计量单位"></Input>
                    </FormItem>
                    <FormItem label="数量"
                              prop="">
                        <Input v-model="formValidateComparison.number"
                               placeholder="请输入数量"></Input>
                    </FormItem>
                </Form>
            </div>
            <div>
                <Button type="error"
                        size="large"
                        long
                        :loading="modal_loading"
                        @click="saveCompare('compareForm')">确定提交</Button>
            </div>
            <div slot="footer"></div>
            <Row class="compare-card">
                  <Col span="24">
                        <Card>
                              <div slot="title" class="compare-card-title">
                                    比价情况详情
                                    <Button type="primary" @click="addCompany">
                                          新增公司比价单
                                    </Button>
                              </div>
                              <Table :columns="columns"
                                    size="large"
                                    v-if="contractTenderCompanyData && contractTenderCompanyData.data"
                                    no-data-text="暂无数据"
                                    no-filtered-data-text="没有符合条件的数据"
                                    :data="contractTenderCompanyData.data"></Table>
                        </Card>
                  </Col>
            </Row>
        </Modal>

        <!--公司比价单弹框-->
        <Modal v-model="showCompany"
               class="company-comparison"
               width="500">
            <p slot="header"
               style="color:#f60; text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>新增/编辑公司比价单</span>
            </p>
            <div>
                <Form ref="companyForm"
                      :model="formValidateCompany"
                      :label-width="100"
                      label-position="right"
                      :rules="ruleValidateCompany">
                    <FormItem label="名称"
                              prop="name">
                        <Input v-model="formValidateCompany.company"
                               placeholder="请输入名称"></Input>
                    </FormItem>
                    <FormItem label="单价"
                              prop="">
                        <Input v-model="formValidateCompany.univalent"
                               placeholder="请输入单价"></Input>
                    </FormItem>
                    <FormItem label="金额"
                              prop="">
                        <Input v-model="formValidateCompany.money"
                               placeholder="请输入金额"></Input>
                    </FormItem>
                    <FormItem label="生产厂家"
                              prop="">
                        <Input v-model="formValidateCompany.factoryBrand"
                               placeholder="请输入生产厂家"></Input>
                    </FormItem>
                    <FormItem label="到货时间"
                              prop="">
                        <DatePicker type="date" v-model="formValidateCompany.arrivalTime" placeholder="请选择到货时间" format="yyyy-MM-dd"></DatePicker>
                    </FormItem>
                    <FormItem label="备注"
                              prop="">
                        <Input v-model="formValidateCompany.remark"
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
                        @click="saveCompany('companyForm')">确定提交</Button>
            </div>
        </Modal>
    </div>
</template>

<style lang="less">
@import "./index.less";

</style>

<script src="./index.js">
</script>
