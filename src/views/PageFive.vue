<template>

  <div>
    <h1>信息对象时空轨迹</h1>
    <el-form ref="form" label-width="100px" :inline="true">

      <el-form-item label="信息对象">

        <el-input
            placeholder="信息对象"
            v-model="objectName"
            clearable>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="ObjectTrackTableData"
        border
        style="width: 100%">
      <el-table-column
          prop="ts"
          label="时间"
          width="100"
      >
      </el-table-column>

      <el-table-column
          prop="site"
          label="地点"
          width="100"
      >
      </el-table-column>

      <el-table-column
          prop="details"
          label="详情"
          width="300"
      >
      </el-table-column>


      <el-table-column
          prop="affect"
          label="结果"
          width="300"
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
      objectName: '',

      ObjectTrackTableData:[
        {
          ts: '',
          site:'',
          details: '',
          affect:'',
        }
      ],
    }
  },
  methods: {

    onSubmit() {
      const _this = this

      axios.get("http://localhost:8080/getobjecttimeline", {
        params: {
          name:_this.objectName
        }
      }).then(function (resp) {
        console.log(resp.data)
        if (resp.data.code === 200) {
          console.log(resp.data.data)
          //_this.viewShow = true
          _this.ObjectTrackTableData=resp.data.data.events

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
