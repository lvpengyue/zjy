import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 物资信息列表
     * @type {Object}
     */
    data: '',
    all: '', // 不分页列表
    add: '', // 新增物资结果
    edit: '', // 编辑物资结果
    del: '', // 删除物资信息
};

const CONTRACT_MATERIAL_SET_DATA = 'CONTRACT_MATERIAL_SET_DATA';
const CONTRACT_MATERIAL_SET_ALL = 'CONTRACT_MATERIAL_SET_ALL';
const CONTRACT_MATERIAL_SET_ADD = 'CONTRACT_MATERIAL_SET_ADD';
const CONTRACT_MATERIAL_SET_EDIT = 'CONTRACT_MATERIAL_SET_EDIT';
const CONTRACT_MATERIAL_SET_DEL = 'CONTRACT_MATERIAL_SET_DEL';

const mutations = {

    /**
     * 物资列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_MATERIAL_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 物资不分页列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_MATERIAL_SET_ALL](state, mutation) {
        state.all = mutation.payload;
    },

    /**
     * 新增数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_MATERIAL_SET_ADD](state, mutation) {
        state.add = mutation.payload;
    },

    /**
     * 修改数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_MATERIAL_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    },


    /**
     * 删除物资信息数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [CONTRACT_MATERIAL_SET_DEL](state, mutation) {
        state.del = mutation.payload;
    }
};

const actions = {
    /**
     * 调用物资信息列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractMaterialGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.MATERIAL_GET_LIST,
                params: params
            });

            commit({
                type: CONTRACT_MATERIAL_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取物资信息列表数据失败:${error.code}`);
        }
    },

    /**
     * 调用物资信息不分页列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractMaterialGetAll({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.MATERIAL_GET_ALL,
                params: params
            });

            commit({
                type: CONTRACT_MATERIAL_SET_ALL,
                payload: response
            });
        } catch (error) {
            console.log(`获取物资信息不分页列表数据失败:${error.code}`);
        }
    },

    /**
     * 调用新增物资信息接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractMaterialGetAdd({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.MATERIAL_ADD,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_MATERIAL_SET_ADD,
                payload: response
            });
        } catch (error) {
            console.log(`新增物资失败:${error.code}`);
        }
    },

    /**
     * 调用编辑物资信息接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractMaterialGetEdit({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.MATERIAL_EDIT,
                params: JSON.stringify(params)
            });

            commit({
                type: CONTRACT_MATERIAL_SET_EDIT,
                payload: response
            });
        } catch (error) {
            console.log(`修改物资失败:${error.code}`);
        }
    },

    /**
     * 调用启用、禁用物资信息接口（删除）
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async contractMaterialGetDel({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.MATERIAL_DELETE,
                params: params
            });

            commit({
                type: CONTRACT_MATERIAL_SET_DEL,
                payload: response
            });
        } catch (error) {
            console.log(`删除物资信息失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 物资信息列表数据
     * @param {Object} state state
     * @return {Object} data 物资信息列表数据
     */
    contractMaterialData(state) {
        return state.data;
    },

    /**
     * 物资信息不分页列表数据
     * @param {Object} state state
     * @return {Object} data 物资信息列表数据
     */
    contractMaterialAll(state) {
        return state.all;
    },

    /**
     * 新增物资信息
     * @param {Object} state state
     * @return {Object} add 新增
     */
    contractMaterialAdd(state) {
        return state.add;
    },

    /**
     * 新增物资信息
     * @param {Object} state state
     * @return {Object} add 新增
     */
    contractMaterialEdit(state) {
        return state.edit;
    },

    /**
     * 获取删除详情
     * @param {Object} state state
     * @return {Object} del 删除详情
     */
    contractMaterialDel(state) {
        return state.del;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
