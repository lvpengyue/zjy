import {
  mapActions,
  mapGetters
} from 'vuex';
import Cookies from 'js-cookie';
import permissionResourceExpand from '../widgets/permission-resource-expand/index.vue';
import Util from '../../libs/util';

export default {
  async mounted() {
    this.userData = JSON.parse(Cookies.get('user'));
    this.getData();
  },
  data() {
    // 权限名称对应操作按钮，与数据库中资源名称一致
    // 是否显示删除
    const showDel = Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'permission_resource_del') ? 'inline-block' : 'none';
    // 是否显示新增按钮、编辑提交按钮
    const showEdit= Util.showThisRoute(JSON.parse(Cookies.get('permission')), 'permission_resource_edit') ? 'inline-block' : 'none';
    const valideRePassword = (rule, value, callback) => {
      if (value !== this.formValidate.newPassword) {
          callback(new Error('两次输入密码不一致'));
      } else {
          callback();
      }
    };
    return {
      showEdit,
      editResource: false, // 新增、修改角色框是否出现
      formValidate: {
          level: 0, // 0顶级权限 1二级权限
          name: '', // 权限名称
          parentId: 0, // 父极权限id
          url: '',  //对应页面资源
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
          ],
        },
      modal_loading: false,
      userData: null,
      columns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(permissionResourceExpand, {
              props: {
                row: params.row.list,
                showEdit,
                showDel
              }
            });
          }
        },
        {
          title: '模块名称',
          key: 'name'
        },
        {
          title: '模块ID',
          key: 'id'
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
            return h('div', new Date(parseInt(params.row.createTime)).toLocaleString())
          }
        },
        {
          title: '更新时间',
          key: 'updateTime',
          render: (h, params) => {
            return h('div', new Date(parseInt(params.row.updateTime)).toLocaleString())
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
                  display: showEdit
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
                  display: showDel
                },
                on: {
                  click: () => {
                    this.del(params.row.id);
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'permissionResourceData',
      'permissionResourceAdd',
      'permissionResourceDel'
    ])
  },
  methods: {
    ...mapActions([
      'permissionResourceGetData',
      'permissionResourceGetAdd',
      'permissionResourceGetDel'
    ]),

    handleAdd() {
      this.formValidate = {
        level: '', // 0顶级权限 1二级权限
        name: '', // 权限名称
        parentId: '', // 父极权限id
        url: '',  //对应页面资源
        value: '' // 权限code
      },
      this.editResource = true;
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

    // 删除
    async del(resourceId) {
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

    // 页数改变重新获取
    async pageNumChange(pageNum) {
      this.page.pageNum = pageNum;
      this.getData();
    },

    // 查看修改角色信息
    showAndEdit(row) {
      this.formValidate = {
        id: row.id,
        level: row.level, // 0顶级权限 1二级权限
        name: row.name, // 权限名称
        parentId: row.parentId, // 父极权限id
        url: row.url,  //对应页面资源
        value: row.value // 权限code
      };
      this.editResource = true;
    },

    // 每页大小改变，要手动去改变页面大小参数
    pageSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      if (this.page.pageNum === 1) {
        this.getData();
      }
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
  },

  components: {
    permissionResourceExpand
  }
};
