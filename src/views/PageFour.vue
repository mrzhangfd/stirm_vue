<template>

  <div>
    <h1>史上今日</h1>
    <el-form ref="form" label-width="100px" :inline="true">

      <el-form-item label="请输入月份">

        <el-input
            placeholder="请输入月份"
            v-model="month"
            clearable>
        </el-input>
      </el-form-item>

      <el-form-item label="请输入日期">
        <el-input
            placeholder="请输入日期"
            v-model="day"
            clearable>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="todayEventTableData"
        border
        style="width:50%">
      <el-table-column
          prop="ts"
          label="时间"
      >
      </el-table-column>

      <el-table-column
          prop="details"
          label="详情"
      >
      </el-table-column>
      <el-table-column
          prop="site"
          label="地点"
      >
      </el-table-column>

      <el-table-column
          prop="objectId"
          label="信息对象"
      >

      </el-table-column>



    </el-table>
  </div>


</template>

<script>
export default {
  name: "PageFour",
  data() {
    return {
      month: '',
      day: '',
      todayEventTableData:[
        {
          ts: '',
          details: '',
          site:'',
          objectId: '',
        }
      ],
    }
  },
  methods: {

    onSubmit() {
      const _this = this
      console.log(_this.month+" "+_this.day )
      axios.get("http://localhost:8080/event/gettoday", {
        params: {
          month: _this.month,
          day: _this.day
        }
      }).then(function (resp) {
        //console.log(resp.data)
        if (resp.data.code === 200) {
          console.log(resp.data.data)
          //_this.viewShow = true
          _this.todayEventTableData=resp.data.data

        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
}
</script>


<style scoped>

</style>
