"use client"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function AnalyticsDashboard() {
  // Exact data for Selling Rate and Buying Rate by SKU_ID from the first image
  const skuData = [
    { SKU_ID: "GRO008", SellingRate: 50, BuyingRate: 40 },
    { SKU_ID: "GRO009", SellingRate: 150, BuyingRate: 120 },
    { SKU_ID: "GRO010", SellingRate: 380, BuyingRate: 350 },
    { SKU_ID: "GRO011", SellingRate: 70, BuyingRate: 60 },
    { SKU_ID: "GRO012", SellingRate: 200, BuyingRate: 180 },
    { SKU_ID: "GRO013", SellingRate: 250, BuyingRate: 210 },
    { SKU_ID: "GRO014", SellingRate: 100, BuyingRate: 90 },
    { SKU_ID: "HOM015", SellingRate: 450, BuyingRate: 420 },
    { SKU_ID: "HOM016", SellingRate: 500, BuyingRate: 450 },
    { SKU_ID: "HOM017", SellingRate: 180, BuyingRate: 170 },
    { SKU_ID: "HOM018", SellingRate: 200, BuyingRate: 180 },
    { SKU_ID: "HOM019", SellingRate: 180, BuyingRate: 170 },
    { SKU_ID: "HOM020", SellingRate: 80, BuyingRate: 70 },
    { SKU_ID: "HOM021", SellingRate: 150, BuyingRate: 140 },
    { SKU_ID: "PER001", SellingRate: 400, BuyingRate: 320 },
    { SKU_ID: "PER002", SellingRate: 120, BuyingRate: 110 },
    { SKU_ID: "PER003", SellingRate: 90, BuyingRate: 80 },
    { SKU_ID: "PER004", SellingRate: 100, BuyingRate: 90 },
    { SKU_ID: "PER005", SellingRate: 130, BuyingRate: 120 },
    { SKU_ID: "PER006", SellingRate: 350, BuyingRate: 320 },
    { SKU_ID: "PER007", SellingRate: 410, BuyingRate: 340 },
  ]

  // Data for the revenue donut chart from the second image
  const revenueData = [
    // GROCERY (orange shades)
    { name: "Basmati Rice", value: 4.5, category: "GROCERY", color: "#FF8A00" },
    { name: "Ghee", value: 3.5, category: "GROCERY", color: "#FFA333" },
    { name: "Masala", value: 6.5, category: "GROCERY", color: "#FFBB66" },
    { name: "Paneer", value: 7.4, category: "GROCERY", color: "#FFCC99" },
    { name: "Bread", value: 2.8, category: "GROCERY", color: "#FFD9B3" },
    { name: "Moong Dal", value: 2.0, category: "GROCERY", color: "#FFE6CC" },
    { name: "Papad", value: 1.5, category: "GROCERY", color: "#FFF2E6" },

    // HOME UTILITIES (green shades)
    { name: "Clock", value: 12.3, category: "HOME UTILITIES", color: "#00A86B" },
    { name: "Utensils", value: 4.2, category: "HOME UTILITIES", color: "#33B77E" },
    { name: "Bedsheet", value: 3.7, category: "HOME UTILITIES", color: "#66C591" },
    { name: "Bath Towel", value: 3.2, category: "HOME UTILITIES", color: "#99D4A4" },
    { name: "Water Bottle", value: 7.7, category: "HOME UTILITIES", color: "#CCE2B7" },
    { name: "Blender", value: 5.4, category: "HOME UTILITIES", color: "#E6F0CA" },
    { name: "Pillow", value: 4.5, category: "HOME UTILITIES", color: "#F2F7DD" },

    // PERSONAL CARE (red/pink shades)
    { name: "Razor", value: 6.2, category: "PERSONAL CARE", color: "#D81B60" },
    { name: "Moisturizer", value: 6.4, category: "PERSONAL CARE", color: "#E13F79" },
    { name: "Serum", value: 5.3, category: "PERSONAL CARE", color: "#E76493" },
    { name: "Deodorant", value: 6.5, category: "PERSONAL CARE", color: "#ED88AC" },
    { name: "Lotion", value: 2.9, category: "PERSONAL CARE", color: "#F3ADC6" },
    { name: "Toothbrush", value: 2.0, category: "PERSONAL CARE", color: "#F9D1DF" },
    { name: "Handwash", value: 7.5, category: "PERSONAL CARE", color: "#FCE8F1" },
  ]

  // Data for item sales by day of week from the third image
  const weekdaySalesData = [
    { day: "Monday", GRO: 9000, HOM: 13000, PER: 16000 },
    { day: "Tuesday", GRO: 8500, HOM: 12000, PER: 9500 },
    { day: "Wednesday", GRO: 8000, HOM: 14000, PER: 6000 },
    { day: "Thursday", GRO: 7000, HOM: 8000, PER: 11000 },
    { day: "Friday", GRO: 7000, HOM: 8000, PER: 6000 },
    { day: "Saturday", GRO: 8000, HOM: 13000, PER: 7000 },
    { day: "Sunday", GRO: 9500, HOM: 8000, PER: 13000 },
  ]

  // Data for item sales by date (similar to the day of week chart)
  const dateSalesData = [
    { date: "01/04", GRO: 8500, HOM: 12000, PER: 14000 },
    { date: "02/04", GRO: 9000, HOM: 11000, PER: 13000 },
    { date: "03/04", GRO: 8700, HOM: 13000, PER: 12000 },
    { date: "04/04", GRO: 7500, HOM: 10000, PER: 15000 },
    { date: "05/04", GRO: 8200, HOM: 9000, PER: 11000 },
    { date: "06/04", GRO: 9500, HOM: 14000, PER: 10000 },
    { date: "07/04", GRO: 10000, HOM: 15000, PER: 16000 },
    { date: "08/04", GRO: 9200, HOM: 13000, PER: 14000 },
    { date: "09/04", GRO: 8800, HOM: 12000, PER: 13500 },
    { date: "10/04", GRO: 9300, HOM: 14000, PER: 12500 },
  ]

  // Total revenue calculation for the center of the donut chart
  const totalRevenue = 203670

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Selling Rate and Buying Rate by SKU_ID</h2>
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={skuData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="SKU_ID" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
                <YAxis
                  label={{ value: "Value", angle: -90, position: "insideLeft" }}
                  domain={[0, 500]}
                  ticks={[0, 100, 200, 300, 400, 500]}
                />
                <Tooltip />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: "10px" }} />
                <Line
                  type="monotone"
                  dataKey="SellingRate"
                  stroke="#0066CC"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Selling Rate"
                />
                <Line type="monotone" dataKey="BuyingRate" stroke="#99CCFF" strokeWidth={2} name="Buying Rate" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Item Sales by Day of Week</h2>
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekdaySalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis
                  label={{ value: "Amount", angle: -90, position: "insideLeft" }}
                  domain={[0, 40000]}
                  ticks={[0, 10000, 20000, 30000, 40000]}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="GRO" stackId="a" fill="#8BC34A" name="Grocery" />
                <Bar dataKey="HOM" stackId="a" fill="#2196F3" name="Home Utilities" />
                <Bar dataKey="PER" stackId="a" fill="#F48FB1" name="Personal Care" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Item Sales by Date</h2>
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dateSalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                  label={{ value: "Amount", angle: -90, position: "insideLeft" }}
                  domain={[0, 40000]}
                  ticks={[0, 10000, 20000, 30000, 40000]}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="GRO" stackId="a" fill="#8BC34A" name="Grocery" />
                <Bar dataKey="HOM" stackId="a" fill="#2196F3" name="Home Utilities" />
                <Bar dataKey="PER" stackId="a" fill="#F48FB1" name="Personal Care" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Revenue Distribution by Category</h2>
          <div className="h-[600px] w-full flex justify-center">
            <div className="relative" style={{ width: "600px", height: "600px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={200}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, ""]} labelFormatter={(name) => `${name}`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: "none" }}>
                <div className="text-center bg-blue-500 text-white p-4 rounded-md">
                  <div className="text-sm">Total Revenue</div>
                  <div className="text-2xl font-bold">₹{totalRevenue}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
