import {
  mapActions,
  mapGetters
} from 'vuex';
import Cookies from 'js-cookie';
import tableExpand from '../widgets/table-expand/index.vue';
import alCascader from '../my-components/area-linkage/components/al-cascader.vue';
import Util from '../../libs/util';

export default {
  async mounted() {
    this.userData = JSON.parse(Cookies.get('user'));
    await this.getData();
    await this.permissionRoleGetData();
  },
  data() {
    const valideRePassword = (rule, value, callback) => {
        if (value !== this.formValidate.newPassword) {
            callback(new Error('两次输入密码不一致'));
        } else {
            callback();
        }
    };
    const validePhone = (rule, value, callback) => {
        var re = /^1[0-9]{10}$/;
        if (!re.test(value)) {
            callback(new Error('请输入正确格式的手机号'));
        } else {
            callback();
        }
    };

    const validePersonId = (rule, value, callback) => {
        var re = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!re.test(value)) {
            callback(new Error('请输入正确的身份证号'));
        } else {
            callback();
        }
    };
    return {
        formValidate1: {
          name: '',
          phone: '',
          roleId: '',
          laundryId: '',
          id: '',
      },

      action: 'add', // 新增还是编辑  edit

      ruleValidate1: {
          userName: [
              { required: true, message: '账号不得为空', trigger: 'blur' }
          ],
          password: [
              { required: true, message: '密码不得为空', trigger: 'blur' }
          ],
          realName: [
              { required: true, message: '真实姓名不得为空', trigger: 'blur' }
          ],
          email: [
              { required: true, message: '真实姓名不得为空', trigger: 'blur' },
              { type: 'email', message: '邮箱格式部队', trigger: 'blur'}
          ],
          phone: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              { validator: validePhone }
          ],
          idcard: [
              { required: true, message: '请输入身份证号', trigger: 'blur' },
              { validator: validePersonId }
          ],
          laundryId: [
            { required: true, message: '请选择工厂', trigger: 'change' }
          ],
          roleId: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ]
      },
      addOrEdit: false, // 新增或编辑框是否出现
      modal_loading: false,
      userData: null,
      page: {
        pageNumber: 1,
        pageSize: 10
      },
      search: {
        userName: '',
        roleId: ''
      },
      columns: [
        {
          title: '用户名',
          key: 'userName'
        },
        {
          title: '真实姓名',
          key: 'realName'
        },
        {
          title: '手机号',
          key: 'phone'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '角色',
          key: 'role'
        },
        {
          title: '身份证号',
          key: 'idcard'
        },
        {
          title: '备注',
          key: 'remark'
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
              // h('Button', {
              //   props: {
              //     type: 'success',
              //     size: 'default'
              //   },
              //   style: {
              //     marginRight: '5px',
              //     display: 'inline-block'
              //   },
              //   on: {
              //     click: () => {
              //       this.editPassword(params.row);
              //     }
              //   }
              // }, '重置密码'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'default'
                },
                style: {
                  marginRight: '5px',
                  display: 'inline-block'
                  // display: showDel
                },
                on: {
                  click: () => {
                    this.del(params.row.uid);
                  }
                }
              }, '删除'),
            ]);
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'permissionIndexData',
      'permissionIndexAdd',
      'permissionIndexEdit',
      'permissionIndexDel',
      'permissionIndexModifyPass',

      'permissionRoleData',
    ])
  },
  methods: {
    ...mapActions([
      'permissionIndexGetData',
      'permissionIndexGetAdd',
      'permissionIndexGetEdit',
      'permissionIndexGetDel',
      'permissionIndexGetModifyPass',

      'permissionRoleGetData',
    ]),

    handleAdd() {
      this.action = 'add';
      this.userFormInit();
      this.addOrEdit = true;
    },

    userFormInit() {
      this.formValidate1 = {
        email: '',
        idcard: '',
        password: '',
        phone: '',
        realName: '',
        remark: '',
        roleId: '',
        userName: ''
      }
    },

    editPassword(row) {
      this.$Modal.confirm({
          title: '确定重置密码？',
          content: '<p>确定重置密码为初始密码吗？</p>',
          onOk: async () => {
              // 进行重置密码的操作
              await this.permissionIndexGetModifyPass({
                id: row.id
              })

              if (this.permissionIndexModifyPass && this.permissionIndexModifyPass.code == 1) {
                this.$Notice.success({
                  title: this.permissionIndexModifyPass.info
                })
              } else {
                this.$Notice.warning({
                  title: this.permissionIndexModifyPass.info
                })
              }
          },
          onCancel: () => {
              this.$Message.info('取消重置密码');
          }
      });
    },

    saveEdit (name) {
        this.$refs[name].validate(async (valid) => {
            if (valid) {
                this.modal_loading = true;
                await this.permissionIndexGetModifyPass({
                    password: this.formValidate.newPassword,
                    id: this.formValidate.id
                })

                if (this.permissionIndexModifyPass && this.permissionIndexModifyPass.code == 0) {
                    this.$Notice.warning({
                        title: this.permissionIndexModifyPass.info
                    });
                    this.modal_loading = false;
                } else {
                    this.modal_loading = false;
                    this.editPass = false;
                    this.$Message.success('修改密码成功');
                }
            }
        });
    },

    saveUser (name) {
        this.$refs[name].validate(async (valid) => {
            if (valid) {
                this.modal_loading = true;
                
                // 新增、编辑
                if (this.action === 'add') {
                  await this.permissionIndexGetAdd(this.formValidate1);

                  if (this.permissionIndexAdd && this.permissionIndexAdd.code) {
                      this.$Notice.warning({
                          title: '新增失败'
                      });
                      this.modal_loading = false;
                  } else {
                      this.modal_loading = false;
                      this.addOrEdit = false;
                      this.$Notice.success({
                        title: '新增成功',
                        desc: '新增用户成功'
                      });
                      await this.getData();
                  }
                } else {
                  await this.permissionIndexGetEdit(this.formValidate1);

                  if (this.permissionIndexEdit && this.permissionIndexEdit.code) {
                      this.$Notice.warning({
                          title: '修改失败'
                      });
                      this.modal_loading = false;
                  } else {
                      this.modal_loading = false;
                      this.addOrEdit = false;
                      this.$Notice.success({
                        title: '编辑成功',
                        desc: '编辑成功'
                      });
                      await this.getData();
                  }
                }
                
            }
        });
    },

    // 删除
    async del(uid) {
       const params = {
          uid
       }
       this.$Modal.confirm({
         title: `确定删除该账号吗？`,
         content: '请想清楚再操作哦',
         okText: '确定',
         onOk: async () => {
          await this.permissionIndexGetDel(params);
          if (this.permissionIndexDel && !this.permissionIndexDel.code) {
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
    async pageNumChange(pageNumber) {
      this.page.pageNumber = pageNumber;
      this.getData();
    },

    // 查看修改用户信息
    async showAndEdit(row) {
      this.action = 'edit';
      this.userFormInit();
      this.formValidate1 = {
        uid: row.uid,
        email: row.email,
        idcard: row.idcard,
        password: row.password,
        phone: row.phone,
        realName: row.realName,
        remark: row.remark,
        roleId: `${row.roleId}`,
        userName: row.userName
      };
      this.addOrEdit = true;
      setTimeout(() => {
        this.$refs['userForm'].validate();
      }, 200)
    },

    // 每页大小改变，要手动去改变页面大小参数
    pageSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      if (this.page.pageNumber === 1) {
        this.getData();
      }
    },

    // 获取数据的统一方法
    async getData() {
      await this.permissionIndexGetData(Object.assign({}, this.page, this.search));
      if (this.permissionIndexData && this.permissionIndexData.code) {
        this.$Notice.warning({
          title: this.permissionIndexData.info
        })
      }
    },

    handleReset() {
      this.search = {
        userName: '',
        roleId: ''
      }
      this.page.pageNumber = 1;
    },

    handleSearch() {
      // 进行搜索操作
      this.getData();
    }
  },

  components: {
    tableExpand,
    alCascader
  }
};
