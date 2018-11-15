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
    const valideMaxNumber = (rule, value, callback) => {
        console.log(this.formValidate1);
        if (value > this.outObj.number) {
            callback(new Error('不得输入超过最大库存数的数字'));
        } else {
            callback();
        }
    };

    return {
        formValidate1: {
          brand: '',
          name: '',
          number: '',
          operator: '',
          price: '',
          remark: '',
          agent: ''
      },

      ruleValidate1: {
          name: [
              { required: true, message: '物资名称不得为空', trigger: 'change' }
          ],
          brand: [
              { required: true, message: '物资品牌不得为空', trigger: 'blur' }
          ],
          price: [
              { required: true, message: '物资价格不得为空', trigger: 'blur' }
          ],
          operator: [
              { required: true, message: '操作人不得为空', trigger: 'blur' }
          ],
          number: [
              { required: true, message: '出库数量不得为空', trigger: 'blur' },
              { validator: valideMaxNumber }
          ],
          agent: [
              { required: true, message: '经办人不得为空', trigger: 'blur' }
          ],
      },
      addOrEdit: false, // 新增或编辑框是否出现
      modal_loading: false,
      userData: null,
      outObj: '', // 出库的对象
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
          title: '出库时间',
          key: 'outageTime'
        },
        {
          title: '操作员',
          key: 'operator'
        },
        {
          title: '经办人',
          key: 'agent'
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
      'contractOutData',
      'contractOutOut',
      'contractOutUndo',
      'contractMaterialAll',
    ])
  },
  watch: {
    formValidate1: {
      handler(newV, oldV) {
        if (newV.name) {
          this.contractMaterialAll.data.forEach(item => {
            if (item.name === this.formValidate1.name) {
              this.outObj = item;
              console.log(item);
              this.formValidate1.brand = item.brand;
              this.formValidate1.price = item.price;
            }
          })
          
        }
      },
      deep: true
    },
  },
  methods: {
    ...mapActions([
      'contractOutGetData',
      'contractOutGetOut',
      'contractOutGetUndo',
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
          agent: '',
          operator: this.userData.realName,
          price: '',
          remark: ''
      }
    },

    saveUser (name) {
        this.$refs[name].validate(async (valid) => {
            if (valid) {
                this.modal_loading = true;
                
                // 出库
                await this.contractOutGetOut(this.formValidate1);

                if (this.contractOutOut && this.contractOutOut.code) {
                    this.$Notice.warning({
                        title: '出库失败'
                    });
                    this.modal_loading = false;
                } else {
                    this.modal_loading = false;
                    this.addOrEdit = false;
                    this.$Notice.success({
                      title: '出库成功',
                      desc: '新增出库成功'
                    });
                    await this.getData();
                }
                
            }
        });
    },

    // 撤销出库
    async del(id) {
       const params = {
          id
       }
       this.$Modal.confirm({
         title: `确定撤销吗？`,
         content: '请想清楚再操作哦',
         okText: '确定',
         onOk: async () => {
          await this.contractOutGetUndo(params);
          if (this.contractOutUndo && !this.contractOutUndo.code) {
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
      await this.contractOutGetData(Object.assign({}, this.page, this.search));
      if (this.contractOutData && this.contractOutData.code) {
        this.$Notice.warning({
          title: this.contractOutData.info
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
