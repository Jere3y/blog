var myChart = echarts.init(document.getElementById('tree'));
myChart.showLoading();

var data1 =
{
    "name": "软件",
    "children": [
        {
            "name": "语言工具",
            "children": [
                {
                    "name": "C",
                    "children": [
                        {
                            "name": "基本数据类型",
                            "children": [
                                {
                                    "name": "基本数据类型",
                                    "children": []
                                },]
                        },
                        {
                            "name": "变量",
                            "children": [{
                                "name": "声明",
                                "children": []
                            }, {
                                "name": "赋值",
                                "children": []
                            },]
                        },
                        {
                            "name": "常量",
                            "children": []
                        },
                        {
                            "name": "语法",
                            "children": [{
                                "name": "函数",
                                "children": [{
                                    "name": "函数定义",
                                    "children": []
                                },{
                                    "name": "返回值",
                                    "children": []
                                },]
                            }, {
                                "name": "流程控制",
                                "children": [{
                                    "name": "if/else",
                                    "children": []
                                },{
                                    "name": "for 循环",
                                    "children": []
                                },{
                                    "name": "while 循环",
                                    "children": []
                                },]
                            },]
                        }
                    ]
                },
                {
                    "name": "C++",
                    "children": []
                },
                {
                    "name": "Java",
                    "children": []
                },
                {
                    "name": "Dart",
                    "children": []
                },
                {
                    "name": "PHP",
                    "children": []
                },
                {
                    "name": "Python",
                    "children": []
                },
                {
                    "name": "Go",
                    "children": []
                },
                {
                    "name": "HTML",
                    "children": []
                },
                {
                    "name": "JavaScript",
                    "children": []
                },
                {
                    "name": "CSS",
                    "children": []
                },
                {
                    "name": "SQL",
                    "children": []
                },
                {
                    "name": "Object C",
                    "children": []
                },
                {
                    "name": "Json",
                    "children": []
                },
                {
                    "name": "XML",
                    "children": []
                }
            ]
        },
        {
            "name": "软件工具",
            "children": [
                {
                    "name": "converters",
                    "children": [
                        {
                            "name": "Converters",
                            "value": 721
                        },
                        {
                            "name": "DelimitedTextConverter",
                            "value": 4294
                        }
                    ]
                },
                {
                    "name": "DataUtil",
                    "value": 3322
                }
            ]
        }
    ]
};

myChart.hideLoading();

myChart.setOption(option = {
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
    },
    series: [
        {
            type: 'tree',
            name: '技能树',

            data: [data1],

            top: '5%',
            left: '7%',
            bottom: '2%',
            right: '60%',

            symbolSize: 6,

            label: {
                normal: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right'
                }
            },

            leaves: {
                label: {
                    normal: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                }
            },
            expandAndCollapse: false,
            animationDuration: 300,
            animationDurationUpdate: 400
        },
    ]
});