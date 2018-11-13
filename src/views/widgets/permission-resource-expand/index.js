import {
    mapActions,
    mapGetters} from 'vuex';

export default {
    props: {
        row: {
            type: Array
        },
        showEdit: {
            type: String
        },
        showDel: {
            type: String
        }
    },

    computed: {
        ...mapGetters([
            'permissionResourceData',
            'permissionResourceData',
            'permissionResourceAdd',
            'permissionResourceDel'
        ])
    },

    data () {
        return {
            editResource: false, // 新增、修改角色框是否出现
            formValidate: {
                level: 0, // 0顶级权限 1二级权限
                name: '', // 权限名称
                parentId: 0, // 父极权限id
                url: '', // 对应页面资源
                value: '' // 权限code
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '请输入页面资源名称', trigger: 'blur' }
                ],
                value: [
                    { required: true, message: '请输入权限code', trigger: 'blur' }
                ],
                parentId: [
                    { required: true, message: '请输入父级权限id', trigger: 'blur' }
                ],
                level: [
                    { required: true, message: '请输入权限级别', trigger: 'blur' }
                ]
            },
            modal_loading: false,
            columns: [
                {
                    title: '模块名称',
                    key: 'name'
                },
                {
                    title: 'value',
                    key: 'value'
                },
                {
                    title: 'url',
                    key: 'url'
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    render: (h, params) => {
                        return h('div', new Date(parseInt(params.row.createTime)).toLocaleString());
                    }
                },
                {
                    title: '更新时间',
                    key: 'updateTime',
                    render: (h, params) => {
                        return h('div', new Date(parseInt(params.row.updateTime)).toLocaleString());
                    }
                },
                {
                    title: '操作',
                    key: 'id',
                    width: '190px',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'default'
                                },
                                style: {
                                    marginRight: '5px',
                                    display: this.showEdit
                                },
                                on: {
                                    click: () => {
                                        this.showAndEdit(params.row);
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'default'
                                },
                                style: {
                                    marginRight: '5px',
                                    display: this.showDel
                                },
                                on: {
                                    click: () => {
                                        this.del(params.row.id);
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ]
        };
    },

    methods: {
        ...mapActions([
            'permissionResourceGetAdd',
            'permissionResourceGetData',
            'permissionResourceGetDel'
        ]),

        // 查看修改角色信息
        showAndEdit (row) {
            this.formValidate = {
                id: row.id,
                level: row.level, // 0顶级权限 1二级权限
                name: row.name, // 权限名称
                parentId: row.parentId, // 父极权限id
                url: row.url, // 对应页面资源
                value: row.value // 权限code
            };
            this.editResource = true;
        },

        // 删除
        async del (resourceId) {
            const params = {
            id: resourceId
            }
            this.$Modal.confirm({
            title: '确定删除',
            content: '确定删除这个资源吗？',
            okText: '确定',
            onOk: async () => {
            await this.permissionResourceGetDel(params);
            if (this.permissionResourceDel && this.permissionResourceDel.code == 1) {
                this.$Message.success('删除成功');
                await this.getData();
            } else {
                this.$Notice.warning({
                title: '删除失败'
                })
            }
            }
        })
        },

        saveEdit (name) {
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    this.modal_loading = true;
                    await this.permissionResourceGetAdd(this.formValidate);
    
                    if (this.permissionResourceAdd && this.permissionResourceAdd.code == 0) {
                        this.$Notice.warning({
                            title: this.permissionResourceAdd.info
                        });
                        this.modal_loading = false;
                    } else {
                        this.modal_loading = false;
                        this.editResource = false;
                        this.$Message.success('编辑资源成功');
                        await this.getData();
                    }
                }
            });
        },

        // 获取数据的统一方法
        async getData() {
            await this.permissionResourceGetData();
            if (this.permissionResourceData && this.permissionResourceData.code == 0) {
                this.$Notice.warning({
                    title: this.permissionResourceData.info
                })
            }
      }
    }
}
;
