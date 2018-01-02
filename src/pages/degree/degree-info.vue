<template>
  <div class="degree-info">
      <el-tabs type="border-card" v-model="activeTabsName" >
        <el-tab-pane label="基本概况" name="first">
          <Express :edit="form.baseForm"></Express>
        </el-tab-pane>

        <!--目标与标准-->
        <el-tab-pane label="目标与标准" name="second">
          <TargetStandard :edit="form.targetAndStandard"></TargetStandard>
        </el-tab-pane>

        <!--基本条件-->
        <el-tab-pane label="基本条件" name="third">
          <el-tabs v-model="secondActiveName">
            <el-tab-pane label="培养方向" name="secFirst">
              <TrainDirection :edit="form.baseCondition.trainDirection"></TrainDirection>
            </el-tab-pane>
            <el-tab-pane label="师资队伍" name="secSecond">
              <Trainer :edit="form.baseCondition.trainer"></Trainer>
            </el-tab-pane>
            <el-tab-pane label="科学研究" name="secThird">科学研究</el-tab-pane>
            <el-tab-pane label="教学科研支撑" name="secFourth">教学科研支撑</el-tab-pane>
            <el-tab-pane label="奖助体系" name="secFifth">奖助体系</el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="人才培养" name="fourth">
          <el-tabs v-model="thirdActiveName">
            <el-tab-pane label="招生选拔" name="thirdFirst">招生选拔</el-tab-pane>
            <el-tab-pane label="课程教学" name="thirdSecond">课程教学</el-tab-pane>
            <el-tab-pane label="导师指导" name="thirdThird">导师指导</el-tab-pane>
            <el-tab-pane label="学术训练" name="thirdFourth">学术训练</el-tab-pane>
            <el-tab-pane label="学术交流" name="thirdFifth">学术交流</el-tab-pane>
            <el-tab-pane label="分流淘汰" name="thirdSixth">分流淘汰</el-tab-pane>
            <el-tab-pane label="创新能力与学位论文质量" name="thirdSeventh">创新能力与学位论文质量</el-tab-pane>
            <el-tab-pane label="学风教育" name="thirdEighth">学风教育</el-tab-pane>
            <el-tab-pane label="管理服务" name="thirdNinth">管理服务</el-tab-pane>
            <el-tab-pane label="就业发展" name="thirdTenth">就业发展</el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>

  </div>
</template>

<script>
  import { confirm ,solve_res ,getParams} from '@/tool/utils';
  import api from '@/api/restful-api'
  import Express from '../../components/baseForm/express.vue';
  import TargetStandard from '../../components/targetAndStandard/target-standard.vue';
  import TrainDirection from '../../components/baseConditon/train-direction.vue';
  import Trainer from '../../components/baseConditon/trainer.vue';
  export default {
    name:'',
    components: {
      Express,
      TargetStandard,
      TrainDirection,
      Trainer,
    },
    created(){

    },
    data(){
      return {
        formLabelWidth:'250px',
        labelPosition:'left',
        activeTabsName: 'first',
        secondActiveName:'secFirst',
        thirdActiveName:'thirdFirst',
        form:{
          baseForm: {
            //第一部分
            authTime:'',
            takeStudentType:1,
            //第二部分
            dr5degreeNum:'',
            dr5num:'',
            dr5teacherNum:'',
            dr5rate:'',
            mr5degreeNum:'',
            mr5num:'',
            mr5teacherNum:'',
            mr5rate:'',
            //第三部分
            secTackStu:[
              {
                codeAndName:'1',
                autnDrTime:'1',
                dr5degreeNum:'1',
                dr5num:'1',
                autnMrTime:'1',
                mr5degreeNum:'1',
                mr5num:'1',
              }
            ]
          },
          targetAndStandard:{
            target:'',
            standard:'',
          },
          baseCondition:{
            //2-1培养方向
            trainDirection:{
              subjectIntro:'good',
              subjectsInfo:[
                {
                  direction:'',
                  intro:''
                }
              ]
            },
            //2-2师资队伍
            trainer:{
              experts:[
                {
                  id:'',
                  type:'',
                  name:'',
                  birthday:'',
                  accessTime:'',
                  remark:'',
                }
              ],
              teams:[
                {
                  id:'',
                  type:'',
                  leader:'',
                  leaderBirthady:'',
                  start:'',
                  end:''
                }
              ]
            }

          },
        },
        rules: {
          authTime: [
            { required: true, message: '请选择授权时间', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "degree-info";
</style>
