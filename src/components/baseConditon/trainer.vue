<template>
  <!--teams:{-->
  <!--id:'',-->
  <!--type:'',-->
  <!--leader:'',-->
  <!--leaderBirthady:'',-->
  <!--start:'',-->
  <!--end:''-->
  <!--}-->
  <div class="trainer">
    <el-form :model="edit"  :label-position="labelPosition" label-width="formLabelWidth" >
      <h3 class="title">专家</h3>
      <el-table :data="edit.experts" style="width: 100%">
        <el-table-column prop="id" label="序号" width="80">
          <template slot-scope="scope">
           {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column label="专家类别">
            <template slot-scope="scope">
              <el-select size="mini" v-model="scope.row.type" placeholder="请选择">
                <el-option
                        v-for="item in expertsOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="专家姓名">
          <template slot-scope="scope">
            <el-input size="mini" placeholder="专家姓名" v-model="scope.row.name">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="birthday" label="出生年月">
          <template slot-scope="scope">
            <el-date-picker size="mini" type="date" placeholder="出生年月" v-model="scope.row.birthday" style="max-width: 100%;"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="获批年月">
          <template slot-scope="scope">
            <el-date-picker size="mini" type="date" placeholder="获批年月" v-model="scope.row.accessTime" style="max-width: 100%;"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template slot-scope="scope">
            <el-input size="mini" placeholder="备注" v-model="scope.row.remark">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="delExpert(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="add">
        <el-button type="primary" size="small" @click="addExpert">新增</el-button>
      </div>
      <div class="remind">
        <p>说明：1.“专家类别”栏中，限填“两院院士，千人计划入选者、长江学者特聘/讲座教授、国家杰青基金获得者、国家级教学名师、百千万人才工程国家级人选、教育部跨世纪/新世纪人才”。同一专家有多种称谓时，最多填写两项.</p>
        <p>2.长江学者应依据其设岗学科进行填报。“聘期”内的长江学者，由聘任单位填写（若人事关系不在聘任单位，应在“备注”栏注明人事关系所在单位名称）；不在“聘期”内的长江学者，由人事关系所在单位填写.</p>
        <p>3.国家杰青基金获得者需在“备注”栏中注明申请时的学科代码.</p>
      </div>
      <!---->
      <h3 class="title">团队</h3>
      <el-table :data="edit.teams" style="width: 100%">
        <el-table-column prop="id" label="序号" width="80">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column label="团队类别">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.type" placeholder="请选择">
              <el-option
                      v-for="item in teamsOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="学术带头人姓名">
          <template slot-scope="scope">
            <el-input size="mini" placeholder="学术带头人姓名" v-model="scope.row.leader">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="leaderBirthady" label="带头人出生年月">
          <template slot-scope="scope">
            <el-date-picker size="mini" type="date" placeholder="带头人出生年月" v-model="scope.row.leaderBirthady" style="max-width: 100%;"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="start" label="资助期限开始">
          <template slot-scope="scope">
            <el-date-picker size="mini" type="date" placeholder="资助期限" v-model="scope.row.start" style="max-width: 100%;"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="end" label="资助期限结束">
          <template slot-scope="scope">
            <el-date-picker size="mini" type="date" placeholder="资助期限" v-model="scope.row.end" style="max-width: 100%;"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template slot-scope="scope">
            <el-input size="mini" placeholder="备注" v-model="scope.row.remark">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="delTeam(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="add">
        <el-button type="primary" size="small" @click="addTeam">新增</el-button>
      </div>
      <div class="remind">
        <p>说明：1.本表填写2017年12月31日前获批的“团队”；“团队类别”栏中填写国家级、省部级“创新群体、创新团队、教学团队”，如“国家自然基金委创新群体、国家级教学团队、教育部创新团队、国防科技创新团队、省级教学团队（请注明省份）”等.</p>
        <p>2.若同一团队获得多次资助，“资助期限/年度”可依据实际资助情况填写历次资助时间.</p>
        <p>3.本表填写的所有团队需提供证书或批文的复印件.</p>
      </div>
      <div class="btns t-center">
        <el-button type="primary" size="small" @click="submitForm('baseForm')">保存线上草稿箱</el-button>
        <el-button type="primary" size="small" @click="submitForm('baseForm')">提交</el-button>
        <el-button  size="small" @click="resetForm('baseForm')">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      edit: Object,
    },
    data(){
      return {
        formLabelWidth:'250px',
        labelPosition:'left',
        expertsOptions:[
          {value:0,label:'长江学者讲座教授'},
          {value:1,label:'长江学者特聘教授'},
          {value:2,label:'国家杰青基金获得者'},
        ],
        teamsOptions:[
          {value:0,label:'长江学者讲座教授'},
          {value:1,label:'长江学者特聘教授'},
          {value:2,label:'国家杰青基金获得者'}
        ]
      }
    },
    methods: {
      addExpert(){
        console.log('enter')
        var tempInfos = {
          id:'',
          type:'',
          name:'',
          birthday:'',
          accessTime:'',
          remark:'',
        }
        this.edit.experts.push(tempInfos);
      },
      delExpert(index,row){
        console.log(index,row);
        this.edit.experts.splice(index,1);
      },
      addTeam(){
        console.log('enter')
        var tempInfos = {
          id:'',
          type:'',
          leader:'',
          leaderBirthady:'',
          start:'',
          end:''
        }
        this.edit.teams.push(tempInfos);
      },
      delTeam(index,row){
        console.log(index,row);
        this.edit.teams.splice(index,1);
      },
    }
  }
</script>

<style scoped>
</style>