import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 招标项目列表
     * @type {Object}
     */
    data: '',
    add: '', // 新增招标项目结果
    edit: '', // 编辑招标项目结果
    del: '', // 删除招标项目
    id: '', // 默认的当前操作的项目id
};

const CONTRACT_TENDER_SET_DATA = 'CONTRACT_TENDER_SET_DATA';
const CONTRACT_TENDER_SET_ADD = 'CONTRACT_TENDER_SET_ADD';
const CONTRACT_TENDER_SET_EDIT = 'CONTRACT_TENDER_SET_EDIT';
const CONTRACT_TENDER_SET_DEL = 'CONTRACT_TENDER_SET_DEL';
const CONTRACT_TENDER_SET_ID = 'CONTRACT_TENDER_SET_ID';

const mutations = {

    /**
     * 招标项目列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 新增数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_SET_ADD](state, mutation) {
        state.add = mutation.payload;
    },

    /**
     * 修改数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    },


    /**
     * 删除招标项目数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_SET_DEL](state, mutation) {
        state.del = mutation.payload;
    },

    /**
     * 设置当前操作的项目id
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_TENDER_SET_ID](state, mutation) {
        state.id = mutation.payload;
    }
};

const actions = {
    /**
     * 调用招标项目列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.TENDER_GET_LIST,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取招标项目列表数据失败:${error.code}`);
        }
    },

    /**
     * 调用新增招标项目接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderGetAdd({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.TENDER_ADD,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_TENDER_SET_ADD,
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
    async contractTenderGetEdit({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.TENDER_EDIT,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_SET_EDIT,
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
    async contractTenderGetDel({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.TENDER_DELETE,
                params: params
            });

            commit({
                type: CONTRACT_TENDER_SET_DEL,
                payload: response
            });
        } catch (error) {
            console.log(`删除招标项目失败:${error.code}`);
        }
    },

    /**
     * 设置id
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractTenderSetId({
        commit,
        dispatch,
        state
    }, params) {
        commit({
            type: CONTRACT_TENDER_SET_ID,
            payload: params
        });
    }
};

const getters = {

    /**
     * 招标项目列表数据
     * @param {Object} state state
     * @return {Object} data 招标项目列表数据
     */
    contractTenderData(state) {
        return state.data;
    },

    /**
     * 新增招标项目
     * @param {Object} state state
     * @return {Object} add 新增
     */
    contractTenderAdd(state) {
        return state.add;
    },

    /**
     * 新增招标项目
     * @param {Object} state state
     * @return {Object} add 新增
     */
    contractTenderEdit(state) {
        return state.edit;
    },

    /**
     * 获取删除详情
     * @param {Object} state state
     * @return {Object} del 删除详情
     */
    contractTenderDel(state) {
        return state.del;
    },

    /**
     * 获取项目id
     * @param {Object} state state
     * @return {Object} id 项目id
     */
    contractTenderId(state) {
        return state.id;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
