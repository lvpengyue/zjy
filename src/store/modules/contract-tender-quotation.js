import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 招标项目列表
     * @type {Object}
     */
    data: '', 
    add: '',
    edit: '', // 编辑招标项目结果
    del: '', // 删除招标项目
};

const CONTRACT_TENDER_QUOTATION_SET_DATA = 'CONTRACT_TENDER_QUOTATION_SET_DATA';
const CONTRACT_TENDER_QUOTATION_SET_ADD = 'CONTRACT_TENDER_QUOTATION_SET_ADD';
const CONTRACT_TENDER_QUOTATION_SET_EDIT = 'CONTRACT_TENDER_QUOTATION_SET_EDIT';
const CONTRACT_TENDER_QUOTATION_SET_DEL = 'CONTRACT_TENDER_QUOTATION_SET_DEL';

const mutations = {

    /**
     * 招标项目列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_QUOTATION_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 新增数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_QUOTATION_SET_ADD](state, mutation) {
        state.add = mutation.payload;
    },

    /**
     * 修改数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_QUOTATION_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    },


    /**
     * 删除招标项目数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_QUOTATION_SET_DEL](state, mutation) {
        state.del = mutation.payload;
    }
};

const actions = {
    /**
     * 调用招标项目列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderQuotationGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.QUOTATION_GET,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_QUOTATION_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取招标项目列表数据失败:${error.code}`);
        }
    },

    /**
     * 调用添加招标项目接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderQuotationGetAdd({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.QUOTATION_ADD,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_TENDER_QUOTATION_SET_ADD,
                payload: response
            });
        } catch (error) {
            console.log(`新增招标项目失败:${error.code}`);
        }
    },

    /**
     * 调用编辑招标项目接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderQuotationGetEdit({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.QUOTATION_EDIT,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_TENDER_QUOTATION_SET_EDIT,
                payload: response
            });
        } catch (error) {
            console.log(`修改招标项目失败:${error.code}`);
        }
    },

    /**
     * 调用启用、禁用招标项目接口（删除）
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderQuotationGetDel({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.QUOTATION_DELETE,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_QUOTATION_SET_DEL,
                payload: response
            });
        } catch (error) {
            console.log(`删除招标项目失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 招标项目列表数据
     * @param {Object} state state
     * @return {Object} data 招标项目列表数据
     */
    contractTenderQuotationData(state) {
        return state.data;
    },

    /**
     * 新增招标项目
     * @param {Object} state state
     * @return {Object} add 新增
     */
    contractTenderQuotationEdit(state) {
        return state.edit;
    },

    /**
     * 获取删除详情
     * @param {Object} state state
     * @return {Object} del 删除详情
     */
    contractTenderQuotationDel(state) {
        return state.del;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
