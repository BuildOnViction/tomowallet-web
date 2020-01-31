import React from 'react';
import  { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#4B96CD', '#E4AE63'];

const Chart = (props) => {
    // const data = [{value: 9580.362}, {value: 61.996}];
    const data = props.data

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