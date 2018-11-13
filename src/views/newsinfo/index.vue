<style lang="less">
@import "../../styles/common.less";
@import "./index.less";

</style>
<template>
    <div class="newsinfo">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title"
                     class="card-title">
                    基本信息
                </div>
                <Form ref="newsForm"
                      :model="formValidate1"
                      :label-width="100"
                      label-position="right"
                      :rules="ruleValidate1">
                    <FormItem label="文章标题"
                              prop="name">
                        <Input v-model="formValidate1.name"
                               placeholder="请输入文章标题"></Input>
                    </FormItem>

                    <FormItem label="文章作者"
                              prop="author">
                        <Input v-model="formValidate1.author"
                               placeholder="请输入文章作者"></Input>
                    </FormItem>
                    <FormItem label="发布时间"
                              prop="">
                        <DatePicker type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="请选择"
                                    v-model="formValidate1.releaseTime"></DatePicker>
                    </FormItem>
                    <FormItem label="新闻类型"
                              prop="">
                        <Select placeholder="请选择新闻类型"
                                v-model="formValidate1.typeId">
                            <Option v-for="sitem in newsType.data"
                                    v-if="newsType && newsType.data"
                                    :value="sitem.id"
                                    :key="sitem.id">{{ sitem.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="缩略图"
                              class="img-wrap"
                              prop="">
                        <Avatar :src="formValidate1.imgUrl" v-if="formValidate1.imgUrl" style="width: 60px; height: 60px; margin: 0 20px;"></Avatar> 
                        <Upload :action="`${conf.baseUrl}/img/upload`"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :on-format-error="handleFormatError"                            
                            :show-upload-list="false">
                            <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="新闻来源"
                              prop="source">
                        <Input v-model="formValidate1.source"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               placeholder=""></Input>
                    </FormItem>
                    <FormItem label="新闻简介"
                              prop="synopsis">
                        <Input v-model="formValidate1.synopsis"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               placeholder=""></Input>
                    </FormItem>
                </Form>
            </Card>
            </Col>

            <Col span="24">
            <Card>
                <div slot="title"
                     class="card-title">
                    备注资料
                </div>
                <quill-editor v-model="content"
                                class="news-content"
                                ref="myQuillEditor"
                                :options="editorOption">
                </quill-editor>
                <div  class="submit-news">
                    <Button type="primary" :loading="modal_loading" @click="saveEdit('newsForm')">提交</Button>
                </div>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script src="./index.js">
</script>

<style>
