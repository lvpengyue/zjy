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
    this.formValidate1.operator = this.userData.realName;
    await this.getData();
    await this.contractMaterialGetAll();
  },
  data() {
    return {
        formValidate1: {
          brand: '',
          name: '',
          number: '',
          operator: '',
          price: '',
          remark: ''
      },

      ruleValidate1: {
          name: [
              { required: true, message: '物资名称不得为空', trigger: 'change' }
          ],
          brand: [
              { required: true, message: '物资品牌不得为空', trigger: 'blur' }
          ],
          operator: [
              { required: true, message: '操作人不得为空', trigger: 'blur' }
          ],
          price: [
              { required: true, message: '物资价格不得为空', trigger: 'blur' }
          ],
          number: [
              { required: true, message: '物资数量不得为空', trigger: 'blur' }
          ],
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
          title: '入库时间',
          key: 'storageTime'
        },
        {
          title: '操作员',
          key: 'operator'
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
              }, '撤销'),
            ]);
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'contractInData',
      'contractInIn',
      'contractInUndo',
      'contractMaterialAll',
    ])
  },
  methods: {
    ...mapActions([
      'contractInGetData',
      'contractInGetIn',
      'contractInGetUndo',
      'contractMaterialGetAll',
    ]),

    handleAdd() {
      this.action = 'add';
      this.userFormInit();
      this.addOrEdit = true;
    },

    userFormInit() {
      this.formValidate1 = {
        brand: '',
          name: '',
          number: '',
          operator: this.userData.realName,
          price: '',
          remark: ''
      }
    },

    saveUser (name) {
        this.$refs[name].validate(async (valid) => {
            if (valid) {
                this.modal_loading = true;
                
                // 入库
                await this.contractInGetIn(this.formValidate1);

                if (this.contractInIn && this.contractInIn.code) {
                    this.$Notice.warning({
                        title: '入库失败'
                    });
                    this.modal_loading = false;
                } else {
                    this.modal_loading = false;
                    this.addOrEdit = false;
                    this.$Notice.success({
                      title: '入库成功',
                      desc: '新增入库成功'
                    });
                    await this.getData();
                }
                
            }
        });
    },

    // 撤销入库
    async del(id) {
       const params = {
          id
       }
       this.$Modal.confirm({
         title: `确定撤销吗？`,
         content: '请想清楚再操作哦',
         okText: '确定',
         onOk: async () => {
          await this.contractInGetUndo(params);
          if (this.contractInUndo && !this.contractInUndo.code) {
            this.$Message.success('撤销成功');
            await this.getData();
          } else {
             this.$Notice.warning({
               title: '撤销失败'
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
        librarian: row.librarian,
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
      await this.contractInGetData(Object.assign({}, this.page, this.search));
      if (this.contractInData && this.contractInData.code) {
        this.$Notice.warning({
          title: this.contractInData.info
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
