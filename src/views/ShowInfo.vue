<template>
    <div>
        <h1>对象的演进及关联可视化</h1>
        <el-table
                :data="tableData"
                border
                style="width: 60%">
            <el-table-column
                    prop="objectId"
                    label="对象唯一标识符"
                   >
            </el-table-column>
            <el-table-column
                    prop="realName"
                    label="真实姓名"
                    >
            </el-table-column>
            <el-table-column
                    prop="rawInfo"
                    label="简介"
                   >
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">演进可视化</el-button>
                  <el-button @click="handleClick(scope.row)" type="text" size="small">关联可视化</el-button>
                    <el-button type="text" size="small" @click="editObject(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
      <div class="Echarts">
        <h1>123</h1>
          <div id="evolu" style="width: 600px;height:400px;"></div>
      </div>

    </div>

</template>

<script>
    export default {
        name: "PageTwo",
        methods: {
            handleClick(row) {
                console.log(row);
            },
            editObject(row){
                const _this = this
            },
           myEcharts3(){
            var _this=this
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('evolu'));

            // 指定图表的配置项和数据
            var option = {
              title: {
                text: '                                    Entity-oriented Association Network'
              },
              animationDurationUpdate: 1500,
              animationEasingUpdate: 'quinticInOut',
              series: [
                {
                  type: 'graph',
                  layout: 'none',
                  edgeSymbol: ['circle', 'arrow'],
                  // progressiveThreshold: 700,
                  data: result.nodes.map(function (node) {
                    return {
                      x: node.x,
                      y: node.y,
                      id: node.id,
                      name: node.label,
                      label:node.label,
                      symbolSize: node.size,
                      itemStyle: {
                        normal: {
                          color: node.color
                        }
                      }
                    };
                  }),
                  edges: result.edges.map(function (edge) {
                    return {
                      source: edge.sourceID,
                      target: edge.targetID,
                      name: edge.note,
                      label: {
                        normal: {
                          show: true,
                          formatter: function (x) {
                            return x.data.name;
                          }
                        }
                      },
                    };
                  }),
                  label: {
                    normal:{
                      show:true,
                      position:'bottom'
                    },
                    emphasis: {
                      position: 'bottom',
                      show: true
                    }
                  },
                  roam: true,
                  focusNodeAdjacency: true,
                  lineStyle: {
                    normal: {
                      width: 2,
                      curveness: 0.3,
                      opacity: 0.7
                    }
                  }
                }
              ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
          },

        },

        data() {
            return {
                data:'',
                tableData: [{
                    objectId:'',
                    realName: '',
                    rawInfo:'',
                    params:{},
                    events:[],

                },]
            }
        },
        created() {
            const _this = this
            _this.tableData = _this.$route.params.data
            console.log(_this.$route.params)
        },
      mounted() {
          this.myEcharts3()
      }

    }
</script>

<style scoped>

</style>
