import {
  mapActions,
  mapGetters
} from 'vuex';
import Cookies from 'js-cookie';
import tableExpand from '../widgets/table-expand/index.vue';
import $ from 'jquery';
import Util from '../../libs/util';

export default {
  async mounted() {
    this.userData = JSON.parse(Cookies.get('user'));
    // await this.permissionResourceGetData();
    await this.getData();
  },
  
  data() {
    return {
      canNotSave: true, // 分配权限未操作不得提交
      roleList:  [],
      allocateParams: {
        roleId: 0,
        permissionids: []
      },
      allocateList: [], // 分配权限的集合
      editAllocate: false, // 分配权限弹框
      editRole: false, // 新增、修改角色框是否出现
      action: 'add', // 新增还是编辑 edit
      formValidate: {
          name: '',
          id: ''
      },
      ruleValidate: {
          name: [
              { required: true, message: '请输入名称', trigger: 'blur' }
          ],
      },
      modal_loading: false,
      userData: null,
      columns: [
        // {
        //   type: 'expand',
        //   width: 50,
        //   render: (h, params) => {
        //     return h(tableExpand, {
        //       props: {
        //         row: params.row,
        //         expandObj: expandObject
        //       }
        //     });
        //   }
        // },
        {
          title: '角色名称',
          key: 'name'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '更新时间',
          key: 'updateTime'
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'default'
                },
                style: {
                  marginRight: '5px',
                  display: 'inline-block'
                },
                on: {
                  click: () => {
                    this.showAndEdit(params.row);
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'default'
                },
                style: {
                  marginRight: '5px',
                  display: 'inline-block'
                },
                on: {
                  click: () => {
                    this.allocate(params.row);
                  }
                }
              }, '配置权限'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'default'
                },
                style: {
                  marginRight: '5px',
                  display: 'inline-block'
                },
                on: {
                  click: () => {
                    this.del(params.row.id);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'permissionRoleData',
      'permissionRoleAdd',
      'permissionRoleEdit',
      'permissionRoleAllocate',
      'permissionRoleDel',
      'permissionResourceData'
    ]),
  },
  methods: {
    ...mapActions([
      'permissionRoleGetData',
      'permissionRoleGetAdd',
      'permissionRoleGetEdit',
      'permissionRoleGetAllocate',
      'permissionRoleGetDel',
      'permissionResourceGetData'
    ]),

    getNodes(nodeList) {
      this.allocateList = nodeList;
      this.canNotSave = false;
    },

    allocate(row) {
      this.canNotSave = true;
      const allocateArr = [];
      row.list.forEach(item => {
        if (item.parentId != 0) {
          allocateArr.push(item.url);
        }
      });
      this.allocateParams.roleId = row.id;
      this.editAllocate = true;
      this.allocateList = [];
      const arr = [];
      if (this.permissionResourceData && this.permissionResourceData.data && this.permissionResourceData.data.length > 0) {
        this.permissionResourceData.data.forEach((item, index) => {
          const eachObj = Object.assign({}, {
            title: item.name,
            expand: true,
            id: item.id,
            parentId: item.parentId,
            children: [],
          });
          item.list.forEach((sitem, sindex) => {
            eachObj.children.push({
              title: sitem.name,
              id: sitem.id,
              parentId: sitem.parentId,
              checked: allocateArr.indexOf(sitem.url) >= 0 ? true : false,
            })
          });
          arr[index] = eachObj;
        })
      };

      this.roleList = [];
      this.roleList[0] = {
        title: '所有权限',
        expand: true,
        selected: true,
        children: arr,
      }
    },

    async saveAllocate() {
      this.modal_loading = true;
      // 对选中权限进行处理
      const arr = [];
      this.allocateList.forEach(item => {
        if (item.nodeKey !== 0) {
          arr.push(item.id);
          arr.push(item.parentId);
        }
      });
      // 去重
      const obj = new Set(arr);
      const newArr = [];
      // 去掉id为0
      obj.forEach(item => {
        if (item !== 0) {
          newArr.push(item);
        }
      });
      this.allocateParams.permissionids = newArr;
      await this.permissionRoleGetAllocate(this.allocateParams);
      if (this.permissionRoleAllocate && this.permissionRoleAllocate.code == 0) {
        this.$Notice.warning({
            title: this.permissionRoleAllocate.info
        });
        this.modal_loading = false;
      } else {
          this.modal_loading = false;
          this.editAllocate = false;
          this.$Message.success('分配权限成功');
          await this.getData();
      }
    },

    handleAdd() {
      this.action = 'add';
      this.formValidate.id = '';
      this.formValidate.name = '';
      this.editRole = true;
    },

    saveEdit (name) {
        this.$refs[name].validate(async (valid) => {
            if (valid) {
                this.modal_loading = true;
                if (this.action === 'add') {
                  await this.permissionRoleGetAdd(this.formValidate);

                  if (this.permissionRoleAdd && this.permissionRoleAdd.code) {
                      this.$Notice.warning({
                          title: '新增角色失败'
                      });
                      this.modal_loading = false;
                  } else {
                      this.modal_loading = false;
                      this.editRole = false;
                      this.$Message.success('新增角色成功');
                      await this.getData();
                  }
                } else {
                  await this.permissionRoleGetEdit(this.formValidate);

                  if (this.permissionRoleEdit && this.permissionRoleEdit.code) {
                      this.$Notice.warning({
                          title: '编辑角色失败'
                      });
                      this.modal_loading = false;
                  } else {
                      this.modal_loading = false;
                      this.editRole = false;
                      this.$Message.success('编辑角色成功');
                      await this.getData();
                  }
                }
                
            }
        });
    },

    // 删除
    async del(agentId) {
       const params = {
          id: agentId
       }
       this.$Modal.confirm({
        title: '确定删除',
        content: '确定删除这个角色吗？',
        okText: '确定',
        onOk: async () => {
          await this.permissionRoleGetDel(params);
         if (this.permissionRoleDel && !this.permissionRoleDel.code) {
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
      this.action = 'edit';
      this.formValidate = {
        id: row.id,
        name: row.name
      },
      this.editRole = true;
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
      await this.permissionRoleGetData();
      if (this.permissionRoleData && this.permissionRoleData.code) {
        this.$Notice.warning({
          title: '获取列表失败'
        })
      }
    }
  },

  components: {
    tableExpand
  }
};
