<template>
    <div style="width:1200px;height:600px;border:1px solid red;">
        我是父组件<br/><br/>
        中午我们吃 {{foodName}}, 价格是 {{foodPrice}}
        <br/><br/>
        <div style="margin-left:20px;float:left;width:400px;height:500px;border:1px solid green;">
            <child1 :list="dashenList" @sendFood="getFoodValue"></child1>
            <!-- <child1></child1> -->
        </div>
        <div style="margin-right:20px;float:right;width:400px;height:500px;border:1px solid blue;">
            <child2></child2>  
        </div>
    </div>
</template>

<script>
import child1 from './child1'
import child2 from './child2'
export default {
    name: 'Parent',
    components: {
        child1,
        child2
    },
    data() {
        return {
            foodName: '',
            foodPrice: '',
            dashenList: [
                {id:1,name:'郑千里',address:'河南南阳'},
                {id:2,name:'王子丰',address:'湖南浏阳'},
                {id:3,name:'唐波',address:'湖南长沙'}
            ]
        }
    },
    methods: {
        getFoodValue(obj) {
            // console.log('parent ',obj)
            this.foodName = obj.name
            this.foodPrice = obj.price
        }
    }
}
</script>