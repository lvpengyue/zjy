import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 用户列表
     * @type {Object}
     */
    data: '',
    add: '', // 新增人员结果
    edit: '', // 编辑人员结果
    del: '', // 删除用户
    modifyPass: '' // 管理员修改密码结果
};

const PERMISSION_INDEX_SET_DATA = 'PERMISSION_INDEX_SET_DATA';
const PERMISSION_INDEX_SET_ADD = 'PERMISSION_INDEX_SET_ADD';
const PERMISSION_INDEX_SET_EDIT = 'PERMISSION_INDEX_SET_EDIT';
const PERMISSION_INDEX_SET_DEL = 'PERMISSION_INDEX_SET_DEL';
const PERMISSION_INDEX_SET_MODIFY_PASS = 'PERMISSION_INDEX_SET_MODIFY_PASS';

const mutations = {

    /**
     * 人员列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PERMISSION_INDEX_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 新增数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PERMISSION_INDEX_SET_ADD](state, mutation) {
        state.add = mutation.payload;
    },

    /**
     * 修改数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PERMISSION_INDEX_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    },


    /**
     * 删除用户数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PERMISSION_INDEX_SET_DEL](state, mutation) {
        state.del = mutation.payload;
    },

    /**
     * 管理员修改用户密码
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [PERMISSION_INDEX_SET_MODIFY_PASS](state, mutation) {
        state.modifyPass = mutation.payload;
    }
};

const actions = {
    /**
     * 调用用户列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async permissionIndexGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.USER_GET_LIST,
                params: params
            });

            commit({
                type: PERMISSION_INDEX_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取用户列表数据失败:${error.code}`);
        }
    },

    /**
     * 调用新增用户接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async permissionIndexGetAdd({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.USER_ADD,
                params: JSON.stringify(params)
            });

            commit({
                type: PERMISSION_INDEX_SET_ADD,
                payload: response
            });
        } catch (error) {
            console.log(`新增人员失败:${error.code}`);
        }
    },

    /**
     * 调用编辑用户接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async permissionIndexGetEdit({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.USER_EDIT,
                params: JSON.stringify(params)
            });

            commit({
                type: PERMISSION_INDEX_SET_EDIT,
                payload: response
            });
        } catch (error) {
            console.log(`修改人员失败:${error.code}`);
        }
    },

    /**
     * 调用启用、禁用用户接口（删除）
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async permissionIndexGetDel({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.USER_DELETE,
                params: params
            });

            commit({
                type: PERMISSION_INDEX_SET_DEL,
                payload: response
            });
        } catch (error) {
            console.log(`删除用户失败:${error.code}`);
        }
    },

    /**
     * 调用管理员重置密码
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async permissionIndexGetModifyPass({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.API_USER_RESET_PWD,
                params: params
            });

            commit({
                type: PERMISSION_INDEX_SET_MODIFY_PASS,
                payload: response
            });
        } catch (error) {
            console.log(`重置密码失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 用户列表数据
     * @param {Object} state state
     * @return {Object} data 用户列表数据
     */
    permissionIndexData(state) {
        return state.data;
    },

    /**
     * 新增用户
     * @param {Object} state state
     * @return {Object} add 新增
     */
    permissionIndexAdd(state) {
        return state.add;
    },

    /**
     * 新增用户
     * @param {Object} state state
     * @return {Object} add 新增
     */
    permissionIndexEdit(state) {
        return state.edit;
    },

    /**
     * 获取删除详情
     * @param {Object} state state
     * @return {Object} del 删除详情
     */
    permissionIndexDel(state) {
        return state.del;
    },

    /**
     * 获取管理员重置密码详情
     * @param {Object} state state
     * @return {Object} modifyPass 重置密码详情
     */
    permissionIndexModifyPass(state) {
        return state.modifyPass;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
