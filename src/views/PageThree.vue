<template>
    <div>
        <h1>对象关联信息交互式查询及可视化</h1>
        <el-row class="demo-autocomplete">
            <el-col :span="4.8"><div class="sub-title">请输入年份</div></el-col>
            <el-col :span="4.8">
                <el-autocomplete
                        class="inline-input"
                        v-model="year"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入年份"
                        :trigger-on-focus="false"
                        @select="handleSelect"
                        @input="changeInput"
                        value-key="year"
                ></el-autocomplete>
            </el-col>
            <el-col :span="4.8"><div class="sub-title">请输入区划名</div></el-col>
            <el-col :span="4.8">
                <el-autocomplete
                        class="inline-input"
                        v-model="district"
                        :fetch-suggestions="querySearch2"
                        placeholder="请输入区划名"
                        value-key="district"
                        @select="handleSelect"
                ></el-autocomplete>
            </el-col>
            <el-col :span="4.8">
               <el-button>
                   123
               </el-button>

            </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        name: "PageThree",
        data() {
            return {
                year: '',
                district: '',
                years: [],
                districts: [],
                formatData: [],
            };
        },
        methods: {
            querySearch(queryString, cb) {
                const formatData=this.formatData
                const results = queryString ? formatData.filter(this.createFilter(queryString)) : formatData;
                // 调用 callback 返回建议列表的数据
                //console.log(results)
                cb(results);
            },
            createFilter(queryString) {
                return (year) => {
                    return (year.year.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },

            querySearch2(queryString, cb) {
                const formatData=this.formatData
                const _this=this
                _this.districts=[]
                for(const i in formatData){
                    if(_this.year===formatData[i].year){
                        console.log(formatData[i].year)
                        for(const j in formatData[i].districts){
                            const disObj = {}
                            disObj.district=formatData[i].districts[j]

                            _this.districts.push(disObj)
                        }

                    }
                }
                const results = queryString ?  _this.districts.filter(this.createFilter2(queryString)) :  _this.districts;
                // 调用 callback 返回建议列表的数据
                //console.log(results)
                cb(results);
            },
            createFilter2(queryString) {
                return (district) => {
                    return (district.district.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },

            handleSelect(item) {
                console.log(item);
            },

            //监听year的变化，当输入的年代变化时候，右侧的区划信息相应的清空。
            changeInput(){
                this.district=""
            }
        },
        mounted() {
            const _this = this
            axios.get("http://localhost:8080/getcontourinfogroup").then(function (resp) {
                //console.log(resp.data)
                if (resp.data.code === 200) {
                    for (const i in resp.data.data) {
                        const obj = {}
                        obj.year = i.toString();
                        obj.districts = resp.data.data[i]
                        _this.formatData.push(obj)
                    }
                }
                //console.log(_this.formatData)
            })


        }
    }
</script>


<style scoped>

</style>
