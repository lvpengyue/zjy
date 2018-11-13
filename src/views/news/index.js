import {
  mapActions,
  mapGetters
} from 'vuex';
import Cookies from 'js-cookie';
import Util from '../../libs/util';
// require styles

export default {
  async mounted() {
    this.userData = JSON.parse(Cookies.get('user'));
    await this.getData();
    await this.newsGetType();
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
        typeId: ''
      },
      columns: [
        {
          title: '新闻标题',
          key: 'name'
        },
        {
          title: '新闻类型',
          key: 'type'
        },
        {
          title: '新闻来源',
          key: 'source'
        },
        {
          title: '发布时间',
          key: 'releaseTime',
          render: (h, params) => {
            return ('div', new Date(params.row.releaseTime).toLocaleString())
          }
        },
        {
          title: '缩略图',
          key: 'imgUrl',
          render: (h, params) => {
            return h('Avatar', {
              props: {
                src: params.row.imgUrl,
                shape: 'square'
              },
              style: {
                width: '50px',
                height: '50px'
              }
            })
          }
        },
        {
          title: '作者',
          key: 'author'
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
                    this.showAndEdit(params.row.id);
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
                  display: 'inline-block'
                  // display: showDel
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
  computed: {
    ...mapGetters([
      'newsData',
      'newsAdd',
      'newsEdit',
      'newsDel',
      'newsType'
    ])
  },
  methods: {
    ...mapActions([
      'newsGetData',
      'newsGetAdd',
      'newsGetEdit',
      'newsGetDel',
      'newsGetType'
    ]),

    handleAdd() {
      // 去往新增新闻页面
      this.$router.push({
        name: 'newsinfo'
      })
    },

    // 删除
    async del(id) {
       const params = {
          id
       }
       this.$Modal.confirm({
         title: `确定删除该新闻吗？`,
         content: '请想清楚再操作哦',
         okText: '确定',
         onOk: async () => {
          await this.newsGetDel(params);
          if (this.newsDel && !this.newsDel.code) {
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
    async showAndEdit(id) {
      this.$router.push({
        name: 'newsinfo',
        query: {
          id
        }
      })
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
      await this.newsGetData(Object.assign({}, this.page, this.search));
      if (this.newsData && this.newsData.code) {
        this.$Notice.warning({
          title: this.newsData.info
        })
      }
    },

    handleReset() {
      this.search = {
        typeId: ''
      }
      this.page.pageNumber = 1;
    },

    handleSearch() {
      // 进行搜索操作
      this.getData();
    }
  },
};
