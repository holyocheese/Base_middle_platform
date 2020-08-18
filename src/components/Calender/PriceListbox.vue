<template>
		<div class="weeklist">
			<p v-for="(item,index) in weekData">
           {{item}}
			</p>
			<div class="monthDayList">
				<div v-for="(item,index) in daysData" class="dayList" @click="selectDate(index)">
          <el-card v-if="item.day>0" shadow="hover" style="height: 95px;" v-bind:class="{selectDay:isSelect == index,unData:item.day == ' '}">
            <p>{{item.day}}</p>
            <p v-if="item.price" style="color:#ff3300">{{item.price}}</p>
            <p v-if="item.breakfast" style="color:#ff3300">{{item.breakfast}}</p>
          </el-card>
			   </div>
			</div>
		</div>
</template>

<script>
	export default{

		props:{
			dateData: Array,
			day:String,
		},

		data(){

		return{
			weekData:['日','一','二','三','四','五','六'],
			currentDay: this.day,
			DaysInMonth:[],
			daysData:[],
			priceData:this.dateData,
	    	  	isSelect :-1,
	    	  	undate :1,

		 }

		},

		methods:{
			getYearMonthDay(){
			 let currentYear = this.$data.currentDay.substring(0,4); //当前年份
			 let currentMonth = this.$data.currentDay.substring(5,7); //当前月份

			//判断是否是闰年
			  if (this.isleapYears(currentYear)) {
			  	this.$data.DaysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			  }else{

			  	this.$data.DaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			  }

             let monthDay = this.$data.DaysInMonth[Number(currentMonth)-1];//当前月的天数

             let daysData = [];

              //给数据源赋值
             for (var i = 0 ;i < Number(monthDay) ;i++) {

             	var priceDict = {'day':String(i+1),'price':0};
             	daysData.push(priceDict);
             }
             this.$data.daysData = daysData;

             var currentDay = `${currentYear}-${currentMonth}-01`;

              var dateObject = new Date(currentDay);
              var firstDay = dateObject.getDay();//得到每个月1号是周几

              for (var i  in this.$data.priceData) {
              	var price = this.$data.priceData[i];
              	var dayIndex = price.dateStr.substring(price.dateStr.length-2,price.dateStr.length);
              	var dayDict = daysData[Number(dayIndex)-1];
              	dayDict.price = price.price;
              }
             if (firstDay > 0) {
             	var firstDayData = [];
             	for (var i=0; i< firstDay;i++) {
             		var dict = {'day':' ',price:' '};
             		firstDayData.push(dict);
             	}

             	this.$data.daysData = firstDayData.concat(daysData);

             }else{
             	this.$data.daysData = daysData;
             }

			},

			isleapYears(year){
				if (((year % 4)==0) && ((year % 100)!=0) || ((year % 400)==0)) {
					return true;
				} else{

					return false;
				}
			},
			selectDate(index){
				if (this.$data.daysData[index].day == 0) {
					return;
				}
				this.$data.isSelect = index;
				this.back();
			},

		},

		created(){
			this.getYearMonthDay();

		}

	}
</script>

<style lang="scss">
	.weeklist{

		//background-color: #66ccff;
		p{
			float: left;
			width: 14%;
			padding-left: 10px;
			padding-right: 10px;
			color: #666666;
			text-align: center;
		}
	}

	.dayList{
		position: relative;
		float: left;
		width: 14%;
		height: 100px;
		padding-left: 10px;
		padding-right: 10px;

		padding-bottom: 5px;
		padding-top: 5px;
		p{
	       float: initial;
	       width: 100%;
			text-align: center;
			padding: 0px 0px 0px 0px;
			/*border-style: solid;*/
		}

	}
	.monthDayList{
		background-color: red;
	}

	.selectDay{
		background-color: #E8E8E8;
		p{
			color: black;
		}
	}

	.unData{
		p{
			color: white;
		}
	}


</style>
