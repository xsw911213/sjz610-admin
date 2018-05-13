<template>
	<section>
		<div id="echart-sign">

		</div>
		<div>
			<h3>已签到人员详情</h3>
			<el-table :data="signin" height="250" border style="width: 600px">
				<el-table-column prop="name" label="姓名" width="180">
				</el-table-column>
				<el-table-column prop="phone" label="电话" width="180">
				</el-table-column>
				<el-table-column prop="part" label="部门">
				</el-table-column>
			</el-table>
		</div>
		<div>
			<h3>未签到人员详情</h3>
			<el-table :data="notsignin" height="250" border style="width: 600px">
				<el-table-column prop="name" label="姓名" width="180">
				</el-table-column>
				<el-table-column prop="phone" label="电话" width="180">
				</el-table-column>
				<el-table-column prop="part" label="部门">
				</el-table-column>
			</el-table>
		</div>
	</section>
</template>

<script>
export default {
  data() {
    return {
      signin: [],
      notsignin: []
    };
  },
  methods: {
    makedata(data) {
      data.forEach(item => {
        if (item.singin) {
          this.signin.push(item);
        } else {
          this.notsignin.push(item);
        }
      });
      console.log(this.signin, this.notsignin);
      this.makeEcharts(this.signin, this.notsignin);
    },
    makeEcharts(signin, notsignin) {
      let option = {
        title: {
					text: "参会人员签到情况",
					subtext: '参会总人数 ' + (signin.length + notsignin.length) + " 人",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["已签到人数", "未签到人数"]
        },
        series: [
          {
            name: "签到情况",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: signin.length, name: "已签到人数" },
              { value: notsignin.length, name: "未签到人数" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
			let myChart = this.Echart.init(document.getElementById("echart-sign"));
			myChart.setOption(option)
    }
  },
  mounted() {
		// console.log(this.Echart)
    let getData = [
      {
        name: "张三",
				phone: "1",
				part:'政法部门',
        singin: false
      },
      {
        name: "李四",
				phone: "2",
				part:'组织部门',
        singin: true
      },
      {
        name: "王五",
				phone: "3",
				part:'审计部门',
        singin: true
      },
      {
        name: "赵柳",
				phone: "4",
				part:'公安部门',
        singin: false
      },
      {
        name: "张三",
				phone: "5",
				part:'交通部门',
        singin: true
      }
    ];

    this.makedata(getData);
  }
};
</script>

<style>
#echart-sign {
  width: 600px;
  height: 400px;
	margin-top: 20px;
}
</style>