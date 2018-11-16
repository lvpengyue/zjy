<template>
    <div class="tender-payment"
         v-if="contractTenderFileData && contractTenderFileData.data">
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
                    <Upload :action="`${conf.baseUrl}/file/upload?tenderProjectId=${contractTenderId}`"
                            :on-success="handleSuccess"                       
                            :show-upload-list="false">
                            <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                    </Upload>
                </div>
                <Table :columns="columns"
                       size="large"
                       no-data-text="暂无数据"
                       no-filtered-data-text="没有符合条件的数据"
                       :data="contractTenderFileData.data"></Table>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<style lang="less">
@import "./index.less";
@import "../../../styles/common.less";

</style>
<script src="./index.js">
</script>
