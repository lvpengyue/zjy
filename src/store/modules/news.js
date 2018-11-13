import util from 'util';
import $apiConf from '../$api-conf';



const state = {

    /**
     * 新闻列表
     * @type {Object}
     */
    data: '',
    add: '', // 新增新闻结果
    edit: '', // 编辑新闻结果
    del: '', // 删除新闻
    type: '', // 新闻类型列表
    info: '', // 新闻详情
};

const NEWS_SET_DATA = 'NEWS_SET_DATA';
const NEWS_SET_ADD = 'NEWS_SET_ADD';
const NEWS_SET_EDIT = 'NEWS_SET_EDIT';
const NEWS_SET_DEL = 'NEWS_SET_DEL';
const NEWS_SET_TYPE = 'NEWS_SET_TYPE';
const NEWS_SET_INFO = 'NEWS_SET_INFO';

const mutations = {

    /**
     * 新闻列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [NEWS_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },

    /**
     * 新闻类型列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [NEWS_SET_TYPE](state, mutation) {
        state.type = mutation.payload;
    },

    /**
     * 新增数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [NEWS_SET_ADD](state, mutation) {
        state.add = mutation.payload;
    },

    /**
     * 修改数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [NEWS_SET_EDIT](state, mutation) {
        state.edit = mutation.payload;
    },


    /**
     * 删除新闻数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [NEWS_SET_DEL](state, mutation) {
        state.del = mutation.payload;
    },

    /**
     * 新闻详情
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [NEWS_SET_INFO](state, mutation) {
        state.info = mutation.payload;
    }
};

const actions = {
    /**
     * 调用新闻列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async newsGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.NEWS_GET_LIST,
                params: params
            });

            commit({
                type: NEWS_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取新闻列表数据失败:${error.code}`);
        }
    },

    /**
     * 调用新闻列表列表接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async newsGetType({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.NEWS_GET_TYPE_LIST,
                params: params
            });

            commit({
                type: NEWS_SET_TYPE,
                payload: response
            });
        } catch (error) {
            console.log(`获取新闻类型列表数据失败:${error.code}`);
        }
    },

    /**
     * 调用新增新闻接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async newsGetAdd({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.NEWS_ADD,
                params: JSON.stringify(params)
            });

            commit({
                type: NEWS_SET_ADD,
                payload: response
            });
        } catch (error) {
            console.log(`新增新闻失败:${error.code}`);
        }
    },

    /**
     * 调用编辑新闻接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async newsGetEdit({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.NEWS_EDIT,
                params: JSON.stringify(params)
            });

            commit({
                type: NEWS_SET_EDIT,
                payload: response
            });
        } catch (error) {
            console.log(`修改新闻失败:${error.code}`);
        }
    },

    /**
     * 调用启用、禁用新闻接口（删除）
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async newsGetDel({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.NEWS_DELETE,
                params: params
            });

            commit({
                type: NEWS_SET_DEL,
                payload: response
            });
        } catch (error) {
            console.log(`删除新闻失败:${error.code}`);
        }
    },

    /**
     * 调用获取新闻详情接口
     * @param {Object} context context
     * @param {Object} params contact content type
     */
    async newsGetInfo({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.NEWS_GET,
                params: params
            });

            commit({
                type: NEWS_SET_INFO,
                payload: response
            });
        } catch (error) {
            console.log(`获取新闻详情失败:${error.code}`);
        }
    }
};

const getters = {

    /**
     * 新闻列表数据
     * @param {Object} state state
     * @return {Object} data 新闻列表数据
     */
    newsData(state) {
        return state.data;
    },

    /**
     * 新闻类型列表数据
     * @param {Object} state state
     * @return {Object} data 新闻列表数据
     */
    newsType(state) {
        return state.type;
    },

    /**
     * 新增新闻
     * @param {Object} state state
     * @return {Object} add 新增
     */
    newsAdd(state) {
        return state.add;
    },

    /**
     * 新增新闻
     * @param {Object} state state
     * @return {Object} add 新增
     */
    newsEdit(state) {
        return state.edit;
    },

    /**
     * 获取删除详情
     * @param {Object} state state
     * @return {Object} del 删除详情
     */
    newsDel(state) {
        return state.del;
    },

    /**
     * 获取新闻详情
     * @param {Object} state state
     * @return {Object} info 新闻详情
     */
    newsInfo(state) {
        return state.info;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
