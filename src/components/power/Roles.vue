<template>
  <div>
    <!-- 头部面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加角色按钮 -->
      <el-button type="primary" @click="addRoles">添加角色</el-button>
      <!-- 角色列表 -->
      <el-table :data="RolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 循环一级权限 -->
            <el-row v-for="item in scope.row.children" :key="item.id" style="border-bottom: 1px solid #eee">
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removePower(scope.row,item.id)">{{item.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <!-- 循环二级权限 -->
                <el-row v-for="item1 in item.children" :key="item1.id" style="border-bottom: 1px solid #eee">
                  <!-- 渲染二级权限 -->
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removePower(scope.row,item1.id)">{{item1.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <!-- 循环渲染三级权限 -->
                    <span v-for="item2 in item1.children" :key="item2.id">
                      <el-tag type="warning" closable @close="removePower(scope.row,item2.id)">{{item2.authName}}</el-tag>
                    </span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeRoles(scope.row.id)">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="allotPower(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加角色弹出框 -->
      <el-dialog title="添加角色" :visible.sync="addRolesDialogVisible" width="50%" @close="addRolesFormClose">
        <el-form :model="addRolesForm" :rules="addRolesFormRules" ref="addRolesFormRef" label-width="80px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="addRolesForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="addRolesForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addRolesDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addNewRoles">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑角色信息弹出框 -->
      <el-dialog title="编辑角色信息" :visible.sync="editRolesDialogVisible" width="50%" @close="editRolesFormClose">
        <el-form :model="editRolesForm" :rules="editRolesFormRules" ref="editRolesFormRef" label-width="80px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="editRolesForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="editRolesForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editRolesDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editNewRoles">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分配权限的对话框 allot-->
      <el-dialog title="分配权限" :visible.sync="allotDialogVisible" width="50%">
        <!-- 需要被渲染的树形结构 -->
        <el-tree :data="powerTree" :props="powerProps" node-key="id" ref="tree" show-checkbox default-expand-all :default-checked-keys="checkedIDs"></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="allotDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="allotRight">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import mix from './Roles-mix.js'
export default {
  mixins: [mix]
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 10px 5px;
}
</style>
