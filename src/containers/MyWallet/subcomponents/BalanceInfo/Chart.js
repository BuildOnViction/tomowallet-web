import React from 'react';
import  { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#4B96CD', '#E4AE63'];

const Chart = (props) => {
    const data = props.data

  	return (
        <div style={{height: '140px', width: '100%'}}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data} 
                        innerRadius="60%"
                        outerRadius="100%" 
                        dataKey="value"
                    >
                        {
                            data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart