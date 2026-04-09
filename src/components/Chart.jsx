import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({ income, expense }) => {
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Finance",
        data: [income || 0, expense || 0],
        backgroundColor: ["#4CAF50", "#F44336"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "300px", margin: "20px auto" }}>
      <h3>Income vs Expense</h3>
      <Pie data={data} />
    </div>
  );
};

export default ChartComponent;