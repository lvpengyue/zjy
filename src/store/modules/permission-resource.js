import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 资源列表
     * @type {Object}
     */
    data: '',
    del: '', // 删除资源结果
    add: '' // 新增、编辑资源结果
};

const PERMISSION_RESOURCE_SET_DATA = 'PERMISSION_RESOURCE_SET_DATA';
const PERMISSION_RESOURCE_SET_ADD = 'PERMISSION_RESOURCE_SET_ADD';
const PERMISSION_RESOURCE_SET_DEL = 'PERMISSION_RESOURCE_SET_DEL';

const mutations = {

    /**
     * 设置资源列表数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PERMISSION_RESOURCE_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 新增资源数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PERMISSION_RESOURCE_SET_ADD](state, mutation) {
        state.add = mutation.payload;
    },

    /**
     * 删除资源数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PERMISSION_RESOURCE_SET_DEL](state, mutation) {
        state.del = mutation.payload;
    }
};

const actions = {
    /**
     * 调用资源列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async permissionResourceGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_PERMISSION_LIST,
                params: params
            });

            commit({
                type: PERMISSION_RESOURCE_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取资源列表数据失败:${error.code}`);
        }
    },

    /**
     * 调用新增资源接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async permissionResourceGetAdd({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_ADD_PERMISSION,
                params: params
            });

            commit({
                type: PERMISSION_RESOURCE_SET_ADD,
                payload: response
            });
        } catch (error) {
            console.log(`新增/编辑资源失败:${error.code}`);
        }
    },

    /**
     * 调用删除资源接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async permissionResourceGetDel({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ERP_DELETE_PERMISSION,
                params: params
            });

            commit({
                type: PERMISSION_RESOURCE_SET_DEL,
                payload: response
            });
        } catch (error) {
            console.log(`删除资源失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 资源列表数据
     * @param {Object} state state
     * @return {Object} data 资源列表数据
     */
    permissionResourceData(state) {
        return state.data;
    },

    /**
     * 新增资源
     * @param {Object} state state
     * @return {Object} add 新增
     */
    permissionResourceAdd(state) {
        return state.add;
    },

    /**
     * 删除资源
     * @param {Object} state state
     * @return {Object} add 新增
     */
    permissionResourceDel(state) {
        return state.del;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};
