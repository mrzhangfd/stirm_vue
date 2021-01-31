<template>
    <div>
        <h1>区划信息交互式查询及可视化</h1>
        <el-form ref="form"  label-width="100px" :inline="true">

            <el-form-item label="请输入年份">
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
            </el-form-item>

            <el-form-item label="请输入区划名">
                <el-autocomplete
                        class="inline-input"
                        v-model="contour"
                        :fetch-suggestions="querySearch2"
                        placeholder="请输入区划名"
                        value-key="contour"
                        @select="handleSelect"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item>
                <el-button @click="searchMap" type="primary" >
                    查询区划信息
                </el-button>
            </el-form-item>

            <el-form-item>
                <el-button @click="searchMapRele" type="primary" >
                    查询区划演进
                </el-button>
            </el-form-item>

        </el-form >

        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="contourYear"
                    label="年代（公元）"
            >
            </el-table-column>

            <el-table-column
                    prop="contourName"
                    label="区划名"
            >
            </el-table-column>

            <el-table-column
                    prop="contourArea"
                    label="面积（单位）"
            >
            </el-table-column>

            <el-table-column
                    prop="contourPerimeter"
                    label="周长（单位）"
            >
            </el-table-column>

            <el-table-column
                    prop="preContourYear"
                    label="前序时间"
            ></el-table-column>
            <el-table-column
                    prop="preContour"
                    label="前序区划"
            ></el-table-column>

            <el-table-column
                    prop="nextContourYear"
                    label="后序时间"
            >
            </el-table-column>

            <el-table-column
                    prop="nextContour"
                    label="后序区划"
            >
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button @click="getMap(scope.row)" type="text" size="small">获取图片</el-button>
                    <el-button @click="preMap(scope.row)" type="text" size="small" >前序</el-button>
                    <el-button @click="nextMap(scope.row)" type="text" size="small" >后序</el-button>
                    <!--        <el-button type="text" size="small" @click="editObject(scope.row)">编辑</el-button>-->
                </template>
            </el-table-column>
        </el-table>

        <viewer :images="contourInfoImg" >
            <img v-for="src in contourInfoImg" :src="src" :key="src" width="400" height="233px">
        </viewer>
        <viewer :images="contourReleImg">

            <img v-for="src in contourReleImg" :src="src" :key="src" width="400" height="233px">
        </viewer>
    </div>

</template>

<script>
    export default {
        name: "ContourRele",
        data() {
            return {
                year: '',
                contour: '',
                years: [],
                contours: [],
                formatData: [],
                tableData: [{
                    contourYear: '',
                    contourName: '',
                    contourArea: '',
                    contourPerimeter: '',
                    preContourYear: '',
                    preContour: [],
                    nextContourYear: '',
                    nextContour: []

                },],
                //图片路径
                contourInfoImg: [],

                //关联轮廓
                contourReleImg:[],
                //图片位置是否显示
                viewShow: false
            };
        },
        methods: {
            querySearch(queryString, cb) {
                const formatData = this.formatData
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
                const formatData = this.formatData
                const _this = this
                _this.contours = []
                for (const i in formatData) {
                    if (_this.year === formatData[i].year) {
                        console.log(formatData[i].year)
                        for (const j in formatData[i].contours) {
                            const disObj = {}
                            disObj.contour = formatData[i].contours[j]
                            _this.contours.push(disObj)
                        }
                    }
                }
                const results = queryString ? _this.contours.filter(this.createFilter2(queryString)) : _this.contours;
                // 调用 callback 返回建议列表的数据
                //console.log(results)
                cb(results);
            },
            createFilter2(queryString) {
                return (district) => {
                    return (district.contour.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },

            handleSelect(item) {
                console.log(item);
            },
            getMap(row) {
                console.log(row.contourName)

                const _this = this
                _this.contourInfoImg = []
                axios.get("http://localhost:8080/getcontourpath", {
                    params: {
                        contourYear: row.contourYear,
                        contourName: row.contourName
                    }
                }).then(function (resp) {
                    //console.log(resp.data)
                    if (resp.data.code === 200) {
                        console.log(resp.data.data)
                        //_this.viewShow = true
                        _this.contourInfoImg = []
                        _this.contourInfoImg.push(resp.data.data)

                    }
                }).catch(function (error) {
                    console.log(error)
                })
            },
            preMap(row) {
                console.log(row)
                const _this = this
                _this.contourInfoImg = []
                axios.get("http://localhost:8080/getcontoursallinfo", {
                    params: {
                        contourYear: row.preContourYear,
                        contourName: row.preContour
                    }
                }).then(function (resp) {
                    //console.log(resp.data)
                    if (resp.data.code === 200) {
                        console.log(resp.data.data)
                        _this.tableData = resp.data.data

                    }
                }).catch(function (error) {
                    console.log(error)
                })
            },

            nextMap(row) {
                console.log(row)
                const _this = this
                _this.contourInfoImg = []
                axios.get("http://localhost:8080/getcontoursallinfo", {
                    params: {
                        contourYear: row.nextContourYear,
                        contourName: row.nextContour
                    }
                }).then(function (resp) {
                    //console.log(resp.data)
                    if (resp.data.code === 200) {
                        console.log(resp.data.data)
                        _this.tableData = resp.data.data

                    }
                }).catch(function (error) {
                    console.log(error)
                })
            },
            searchMap() {
                const _this = this
                const contours=[]
                //将区划名加到数组里面，往后端传递。
                contours.push(_this.contour)
                console.log(contours)
                axios.get("http://localhost:8080/getcontoursallinfo", {
                    params: {
                        contourYear: _this.year,
                        contourName: contours
                    }
                },).then(function (resp) {
                    //console.log(resp.data)
                    if (resp.data.code === 200) {
                        console.log(resp.data.data)
                        _this.tableData = resp.data.data
                        // _this.tableData[0].contourName = resp.data.data.contourName
                        // _this.tableData[0].contourYear = resp.data.data.contourYear
                        // _this.tableData[0].contourArea = resp.data.data.contourArea
                        // _this.tableData[0].contourPerimeter = resp.data.data.contourPerimeter
                        // _this.tableData[0].preContourYear = resp.data.data.preContourYear
                        // _this.tableData[0].preContour = resp.data.data.preContour
                        // _this.tableData[0].nextContourYear = resp.data.data.nextContourYear
                        // _this.tableData[0].nextContour = resp.data.data.nextContour
                    }
                }).catch(function (error) {
                    console.log(error)
                })
                _this.searchMapRele()
            },
            searchMapRele(){
                const _this = this
                _this.contourReleImg=[]
                axios.get("http://localhost:8080/getcontourrele", {
                    params: {
                        contourYear: _this.year,
                        contourName: _this.contour
                    }
                },).then(function (resp) {
                    //console.log(resp.data)
                    if (resp.data.code === 200) {
                        console.log(resp.data.data)
                        _this.contourReleImg = resp.data.data
                    }
                }).catch(function (error) {
                    console.log(error)
                })
            },

            //监听year的变化，当输入的年代变化时候，右侧的区划信息相应的清空。
            changeInput() {
                this.contour = ""
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
                        obj.contours = resp.data.data[i]
                        _this.formatData.push(obj)
                    }
                }
                //console.log(_this.formatData)
            })
            _this.tableData = []
        }
    }
</script>


<style scoped>

</style>
