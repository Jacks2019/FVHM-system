<template>
  <div class="basicInformation">
    <div class="BInfo">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="阀栓名称" style="position:relative; left:-10px; top: 60px">
          <el-col :span="9">
          <el-input v-model="input" style="width: 190px"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="所在位置" style="position:relative; left:-10px; top: 70px">
          <el-col :span="9">
            <el-input v-model="input" style="width: 190px" ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="经度" style="position:relative; left:-10px; top: 80px;">
          <el-col :span="9">
            <el-input v-model="input" style=" width: 150px" ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="纬度" style="position:relative; left:-10px; top: 90px">
          <el-col :span="9">
            <el-input v-model="input" style=" width: 150px"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="状态" style="position:relative; left:-10px; top: 100px">
          <el-select v-model="value" placeholder="Select" style="position: relative;left: -213px;width: 120px">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阀栓编号" style="position:relative; left:300px; top: -250px">
          <el-col :span="9">
            <el-input v-model="input" style="width: 190px" ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="阀栓创建时间" style="position:relative; left:300px; top: -240px">
          <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="选择阀栓创建时间"
              style="position: relative;left: -177px; width: 190px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="通讯编号" style="position:relative; left:300px; top: -230px">
          <el-col :span="9">
            <el-input v-model="input" style="width: 190px" ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="阀栓类型" style="position:relative; left:300px; top: -220px">
          <el-select v-model="value" placeholder="Select" style="position: relative;left: -213px;width: 120px">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" style="position:relative; left:300px; top: -210px">
          <el-col :span="9">
            <el-input v-model="input" style="width: 190px" ></el-input>
          </el-col>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  data() {
    return {
      options: ref([
        {
          value: '阀门',
          label: '阀门',
        },
        {
          value: '消防栓',
          label: '消防栓',
        }
      ]),
      value: ref(''),
      value1: ''
    }
  }
}
</script>

<style>
.basicInformation{
  background-color: #F8F8F8;
  position: relative;
  top: -15px;
  left: -15px;
  width: 51vw;
  height: 85vh;
}
.BInfo{
  background-color: white;
  position: relative;
  top: 8%;
  left: 4.5%;
  width: 85%;
  height: 80%;
}
</style>