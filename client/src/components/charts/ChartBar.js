import "./Chart.css";
import {
  
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis
} from "recharts";


export default function ChartBar({ title, data, dataKey, grid }) {
     
  return ( 
    <div className="chart">     
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <BarChart data={data}>
         <Bar dataKey={dataKey} fill="#1189c9"/>
         <CartesianGrid   stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis/>
        </BarChart>
      </ResponsiveContainer> 
    </div>
  );
}
