// "use client"
// import React, { useEffect } from 'react';
// import * as echarts from 'echarts';

// const Statistics = () => {
//   useEffect(() => {
//     const chartDom = document.getElementById('completionStatistics');
//     const myChart = echarts.init(chartDom, null)

//     const option = {
//       backgroundColor: 'transparent',
//       tooltip: {
//         trigger: 'item'
//       },
//       visualMap: {
//         show: false,
//         min: 80,
//         max: 600,
//         inRange: {
//           colorLightness: [0, 1]
//         }
//       },
//       color: "red",
//       series: [
//         {
//           name: 'Total tasks',
//           type: 'pie',
//           radius: '55%',
//           center: ['50%', '50%'],
//           textStyle: {
//             color: 'red'
//           },
//           data: [
//             { value: 335, name: 'Completed' },
//             { value: 310, name: 'Missed' },
//             { value: 274, name: 'En going' },
//           ].sort(function (a, b) {
//             return a.value - b.value;
//           }),
//           roseType: 'radius',
//           label: {
//             color: 'indigo'
//           },
//           labelLine: {
//             lineStyle: {
//               color: 'indigo'
//             },
//             smooth: 0.2,
//             length: 10,
//             length2: 20
//           },
//           itemStyle: {
//             color: 'indigo',
//             shadowColor: 'rgba(0, 0, 0, 0.5)'
//           },
//           animationType: 'scale',
//           animationEasing: 'elasticOut',
//           animationDelay: function (idx) {
//             return Math.random() * 200;
//           }
//         }
//       ]
//     };

//     myChart.setOption(option);
//   }, []);

//   return (
//     <div className="w-full h-full flex items-center justify-center flex-col gap-8 p-4" >
//       <h2
//         className='text-2xl flex font-bold flex-col gap-3 items-start'
//       >
//         Upcoming next week
//         <span
//           className="w-32 h-2 bg-yellow-300 rounded-full block"
//         />
//       </h2>
//       <div
//         id="completionStatistics"
//         className=' w-full h-60'
//       >
//       </div>
//     </div>
//   );
// };

// export default Statistics;
import React from 'react'

function Statistics() {
  return (
    <div>Statistics</div>
  )
}

export default Statistics
