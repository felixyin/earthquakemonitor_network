<template>
  <div>
    <c-breadcrumb :items="breadcrumb"></c-breadcrumb>
    <div>
      <el-row>
        <el-col :span="2"><span class="textspan">状态</span></el-col>
        <el-col :span="4">
          <el-select v-model="userForm.status" placeholder="请选择状态">
            <el-option label="所有" value=""></el-option>
            <el-option v-for="item in statusList" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>

        <el-col :span="2"><span class="textspan">账号</span></el-col>
        <el-col :span="4">
          <el-input placeholder="请输入账号" v-model="userForm.username" class="queryinput"></el-input>
        </el-col>

        <el-col :span="2"><span class="textspan">手机</span></el-col>
        <el-col :span="4">
          <el-input placeholder="请输入手机" v-model="userForm.phone" class="queryinput"></el-input>
        </el-col>

        <el-col :span="2">
          <el-button @click="queryUser">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="addForm">添加</el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 20px;">
        <el-table :data="userData" v-loading.body="dataLoading">
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="username" label="账号"></el-table-column>
          <el-table-column prop="password" label="密码"></el-table-column>
          <el-table-column prop="phone" label="手机号码"></el-table-column>
          <el-table-column prop="roleId" label="角色"></el-table-column>
          <el-table-column prop="status" label="状态" :formatter="formatStatus"></el-table-column>
          <el-table-column inline-template :context="_self" fixed="right" label="操作" width="100">
                        <span>
                            <el-button @click="editForm(row, $index)" type="text" size="small">编辑</el-button>
                            <el-button @click="preDeleteRow($index)"
                                       type="text" size="small">删除</el-button>
                        </span>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-dialog title="添加课程" v-model="formDialogVisible" style="width:80%;">
          <el-form :model="userForm" ref="userForm" :rules="rules">
            <el-form-item label="账号" prop="username" :label-width="formLabelWidth">
              <el-input v-model="userForm.username" auto-complete="off" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
              <el-input v-model="userForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone" :label-width="formLabelWidth">
              <el-input v-model="userForm.phone" auto-complete="off" placeholder="请输入手机号码" type="number"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="roleId" :label-width="formLabelWidth">
              <el-select v-model="userForm.roleId">
                <el-option v-for="item in roleList" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
              <el-select v-model="userForm.status">
                <el-option v-for="item in statusList" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="formDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onUserFormSubmit" :loading="userForm.isLoading">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div>
        <el-dialog title="警告" v-model="delDialogVisible" size="tiny">
          <span>确定是要删除此用户吗？</span>
          <span slot="footer" class="dialog-footer">
                        <el-button @click="delDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="deleteRow">确 定</el-button>
                    </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import CBreadcrumb from '../../components/Breadcrumb'
  import * as userService from '../../services/user'

  export default {
    name: 'course-manage',
    data () {
      return {
        breadcrumb: [
          {label: '设置'},
          {label: '用户管理'}
        ],
        searchInput: '',
        userData: [],
        userForm: {
          username: null,
          password: null,
          phone: null,
          roleId: null,
          status: 1
        },
        rules: {
          username: [
            {required: true, message: '账号必填', trigger: 'blur'},
            {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码必填', trigger: 'change'},
            {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          phone: [
//                        {required: true, message: '请输入联系方式', trigger: 'change'},
            {min: 10, max: 12, message: '长度在 10 到 12 个字符', trigger: 'blur'}
          ],
//                    roleId: [
//                        {type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change'}
//                    ],
          roleId: [
            {type: 'number', required: true, message: '请选择角色', trigger: 'change'}
          ],
          status: [
            {type: 'number', required: true, message: '状态必选', trigger: 'change'}
          ]
        },
        statusList: [
          {id: 2, name: '禁用'},
          {id: 1, name: '启用'}
        ],
        statusSelected: false,
        roleList: [
          {id: 1, name: '管理员'},
          {id: 2, name: '维护人员'},
          {id: 3, name: '普通用户'}
        ],
        emptyUserForm: {
          username: '',
          password: '',
          phone: '',
          roleId: '',
          status: true
        },

        courseData: [],
        dataLoading: false,
        subjectList: [],
        subjectSelected: '',
        formDialogVisible: false,

        delDialogVisible: false,
        formLabelWidth: '100px',
        formRules: {
          subjectSelected: [{
            required: true,
            message: '请选择科目',
            trigger: 'change'
          }],
          courseName: [{
            required: true,
            message: '请填写课程名称',
            trigger: 'blur'
          }, {
            max: 60,
            message: '长度不能超过 60 个字符',
            trigger: 'blur'
          }]
        }
      }
    },
    mounted() {
      this.dataLoading = true;
      userService.findAllUser({}).then(data => {
        this.userData = data;
        this.dataLoading = false;
      })
    },
    methods: {
      formatStatus(row){
        if (row.status === 1) {
          return '启用'
        } else if (row.status === 2) {
          return '停用'
        }
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      addForm(){
        this.userForm = this.emptyUserForm
        this.userForm.isLoading = false
        this.formDialogVisible = true
      },
      editForm(row, index) {
        this._edit_index = index;
        this.userForm = row;
        this.userForm.isLoading = false
        this.formDialogVisible = true
      },
      preDeleteRow (index) {
        this._del_index = index;
        this.delDialogVisible = true
      },
      deleteRow () {
        let id = this.userData[this._del_index].id;
        userService.del(id).then(data => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.userData.splice(this._del_index, 1);
          this.delDialogVisible = false
        }, msg => {
          this.$message.error(msg)
          this.delDialogVisible = false
        })
      },
      onUserFormSubmit () {
        let self = this;
        this.$refs.userForm.validate(valid => {
          if (valid) {
            self.userForm.isLoading = true
            userService.save(this.userForm).then(data => {
              self.$message({
                message: '保存成功！',
                type: 'success'
              })
              if (self.userForm.id) { // update
                self.userData[self._edit_index] = data
              } else { // insert
                self.userData.push(data)
              }
              self.formDialogVisible = false
              self.userForm.isLoading = false
              self.$refs.userForm.resetFields()
            }, msg => {
              self.$message.error(msg)
              self.userForm.isLoading = false
            })
          } else {
            return
          }
        })
      },
      queryUser () {
        this.dataLoading = true
        userService.findAllUser(this.userForm).then(data => {
          this.userData = data
          this.dataLoading = false
        }, msg => {
          this.$message.error(msg)
          this.dataLoading = false
        })
      }
    },
    components: {
      CBreadcrumb
    }
  }
</script>

<style scoped>

</style>
