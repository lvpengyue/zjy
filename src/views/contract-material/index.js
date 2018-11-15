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
  },
  data() {
    return {
        formValidate1: {
          id: '',
          brand: '',
          name: 0,
          number: '',
          price: '',
          remark: ''
      },

      action: 'add', // 新增还是编辑  edit

      ruleValidate1: {
          name: [
              { required: true, message: '物资名称不得为空', trigger: 'blur' }
          ],
          brand: [
              { required: true, message: '物资品牌不得为空', trigger: 'blur' }
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
      },
      columns: [
        {
          title: '物资名称',
          key: 'name'
        },
        {
          title: '物资数量',
          key: 'number'
        },
        {
          title: '物资价格',
          key: 'price'
        },
        {
          title: '物资品牌',
          key: 'brand'
        },
        {
          title: '物资备注',
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
      'contractMaterialData',
      'contractMaterialAdd',
      'contractMaterialEdit',
      'contractMaterialDel',
    ])
  },
  methods: {
    ...mapActions([
      'contractMaterialGetData',
      'contractMaterialGetAdd',
      'contractMaterialGetEdit',
      'contractMaterialGetDel',
    ]),

    handleAdd() {
      this.action = 'add';
      this.userFormInit();
      this.addOrEdit = true;
    },

    userFormInit() {
      this.formValidate1 = {
        id: '',
        brand: '',
        name: 0,
        number: '',
        price: '',
        remark: ''
      }
    },

    saveUser (name) {
        this.$refs[name].validate(async (valid) => {
            if (valid) {
                this.modal_loading = true;
                
                // 新增、编辑
                if (this.action === 'add') {
                  await this.contractMaterialGetAdd(this.formValidate1);

                  if (this.contractMaterialAdd && this.contractMaterialAdd.code) {
                      this.modal_loading = false;
                      this.$Notice.warning({
                          title: this.contractMaterialAdd.data
                      });
                      this.modal_loading = false;
                  } else if (this.contractMaterialAdd && !this.contractMaterialAdd.code) {
                      this.modal_loading = false;
                      this.addOrEdit = false;
                      this.$Notice.success({
                        title: '新增成功',
                        desc: '新增物资成功'
                      });
                      await this.getData();
                  }
                } else {
                  await this.contractMaterialGetEdit(this.formValidate1);

                  if (this.contractMaterialEdit && this.contractMaterialEdit.code) {
                      this.modal_loading = false;
                      this.$Notice.warning({
                          title: this.contractMaterialEdit.data
                      });
                      this.modal_loading = false;
                  } else {
                      this.modal_loading = false;
                      this.addOrEdit = false;
                      this.$Notice.success({
                        title: '编辑成功',
                        desc: '编辑物资成功'
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
          await this.contractMaterialGetDel(params);
          if (this.contractMaterialDel && !this.contractMaterialDel.code) {
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
      this.formValidate1 = {
        id: row.id,
        brand: row.brand,
        name: row.name,
        number: row.number,
        price: row.price,
        remark: row.remark
      };
      this.addOrEdit = true;
      // setTimeout(() => {
      //   this.$refs['userForm'].validate();
      // }, 200)
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
      await this.contractMaterialGetData(Object.assign({}, this.page, this.search));
      if (this.contractMaterialData && this.contractMaterialData.code) {
        this.$Notice.warning({
          title: this.contractMaterialData.info
        })
      }
    },

    handleReset() {
      this.search = {
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
