// BarChartComp.jsx
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function BarChartComp({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
                <XAxis type="number" axisLine={false} display="none" />
                <YAxis type="category" width={100} dataKey="name" axisLine={false} />
                <Bar dataKey="value" fill="#8884d8" barSize={25} />
            </BarChart>
        </ResponsiveContainer>
    );
}
