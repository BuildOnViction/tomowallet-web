import React from 'react';
import  { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#4B96CD', '#E4AE63'];

const Chart = (props) => {
    const data = [{name: 'Group A', value: 50}, {name: 'Group B', value: 300}];

  	return (
    	<PieChart width={140} height={140}>
            <Pie
                data={data} 
                cx={60} 
                cy={60} 
                innerRadius={35}
                outerRadius={65} 
                fill="#8884d8"
                dataKey="value"
            >
                {
                    data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                }
            </Pie>
        </PieChart>
    );
}

export default Chart