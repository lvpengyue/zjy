import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 询价
     * @type {Object}
     */
    data: '',
    edit: '', // 编辑询价结果
    del: '', // 删除询价
};

const CONTRACT_TENDER_INQUIRY_SET_DATA = 'CONTRACT_TENDER_INQUIRY_SET_DATA';
const CONTRACT_TENDER_INQUIRY_SET_EDIT = 'CONTRACT_TENDER_INQUIRY_SET_EDIT';
const CONTRACT_TENDER_INQUIRY_SET_DEL = 'CONTRACT_TENDER_INQUIRY_SET_DEL';

const mutations = {

    /**
     * 询价列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_INQUIRY_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 修改数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_INQUIRY_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    },


    /**
     * 删除询价数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_INQUIRY_SET_DEL](state, mutation) {
        state.del = mutation.payload;
    }
};

const actions = {
    /**
     * 调用询价列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderInquiryGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.INQUIRY_GET,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_INQUIRY_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取询价列表数据失败:${error.code}`);
        }
    },

    /**
     * 调用编辑询价接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderInquiryGetEdit({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.INQUIRY_EDIT,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_TENDER_INQUIRY_SET_EDIT,
                payload: response
            });
        } catch (error) {
            console.log(`修改询价失败:${error.code}`);
        }
    },

    /**
     * 调用启用、禁用询价接口（删除）
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderInquiryGetDel({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.INQUIRY_DELETE,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_INQUIRY_SET_DEL,
                payload: response
            });
        } catch (error) {
            console.log(`删除询价失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 询价列表数据
     * @param {Object} state state
     * @return {Object} data 询价列表数据
     */
    contractTenderInquiryData(state) {
        return state.data;
    },

    /**
     * 新增询价
     * @param {Object} state state
     * @return {Object} add 新增
     */
    contractTenderInquiryEdit(state) {
        return state.edit;
    },

    /**
     * 获取删除详情
     * @param {Object} state state
     * @return {Object} del 删除详情
     */
    contractTenderInquiryDel(state) {
        return state.del;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
