<style lang="less">
@import "../../styles/common.less";
@import "./index.less";

</style>
<template>
    <div class="permission-index"
         v-if="newsData && newsData.data">
        <Row>
            <Col span="24">
            <Card>
                <div slot="title"
                     class="card-title">
                    <Form inline>
                        <FormItem v-if="newsType && newsType.data">
                            <Select placeholder="请选择新闻类型"
                                    v-model="search.typeId"
                                    style="width: 200px;">
                                <Option v-for="item in newsType.data"
                                        :key="item.id"
                                        :value="item.id">{{ item.name }}</Option>
                            </Select>
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
                            @click="handleAdd()">新增新闻</Button>
                </div>
                <Table :columns="columns"
                       size="large"
                       no-data-text="暂无数据"
                       no-filtered-data-text="没有符合条件的数据"
                       :data="newsData.data"></Table>
                <Page :total="newsData.count"
                      :current="page.pageNum"
                      show-total
                      :page-size="page.pageSize"
                      @on-change="pageNumChange"
                      @on-page-size-change="pageSizeChange"
                      size="small"
                      show-sizer
                      class-name="page-wrap">
                    <span slot="">共
                        <span style="font-size: 20px; color: red; padding: 0 4px;">{{newsData.count}}</span>条数据</span>
                </Page>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script src="./index.js">
</script>

<style>
