import { useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend, AreaChart, Area
} from 'recharts'
import {
  DollarSign, ShoppingCart, Users, TrendingUp, TrendingDown,
  ArrowUpRight, ArrowDownRight, Package, Star
} from 'lucide-react'
import {
  salesData, orderStatusData, categorySalesData,
  customerActivityData, topProductsData, sampleOrders
} from '../data/sampleData'
import { formatPrice } from '../utils'

export default function AdminAnalytics() {
  const stats = useMemo(() => {
    const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0)
    const totalOrders = salesData.reduce((sum, d) => sum + d.orders, 0)
    const avgOrderValue = totalRevenue / totalOrders
    const conversionRate = 3.2

    return { totalRevenue, totalOrders, avgOrderValue, conversionRate }
  }, [])

  const dailyData = salesData.slice(-7)
  const weeklyData = [
    { week: 'Week 1', revenue: 12400, orders: 58 },
    { week: 'Week 2', revenue: 15600, orders: 72 },
    { week: 'Week 3', revenue: 18900, orders: 85 },
    { week: 'Week 4', revenue: 21300, orders: 98 },
  ]
  const monthlyData = [
    { month: 'Jan', revenue: 16150, orders: 75 },
    { month: 'Feb', revenue: 20000, orders: 84 },
    { month: 'Mar', revenue: 29600, orders: 123 },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-bold">Analytics Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Real-time insights and performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Revenue',
            value: formatPrice(stats.totalRevenue),
            change: '+18.2%',
            trend: 'up',
            icon: DollarSign,
            color: 'bg-gold-500',
            subtitle: 'vs last period'
          },
          {
            title: 'Total Orders',
            value: stats.totalOrders.toString(),
            change: '+12.5%',
            trend: 'up',
            icon: ShoppingCart,
            color: 'bg-blue-500',
            subtitle: 'vs last period'
          },
          {
            title: 'Avg Order Value',
            value: formatPrice(stats.avgOrderValue),
            change: '+5.3%',
            trend: 'up',
            icon: TrendingUp,
            color: 'bg-green-500',
            subtitle: 'vs last period'
          },
          {
            title: 'Conversion Rate',
            value: `${stats.conversionRate}%`,
            change: '-0.8%',
            trend: 'down',
            icon: Users,
            color: 'bg-purple-500',
            subtitle: 'vs last period'
          },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon size={22} className="text-white" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Revenue Charts - Daily/Weekly/Monthly */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-lg font-bold">Revenue Trends</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-medium bg-gold-500 text-white rounded-lg">Daily</button>
            <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">Weekly</button>
            <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">Monthly</button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c9a227" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#c9a227" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={(val) => `$${val}`} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                formatter={(value: number) => [formatPrice(value), 'Revenue']}
                labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              />
              <Area type="monotone" dataKey="revenue" stroke="#c9a227" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Status Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-serif text-lg font-bold mb-6">Order Status Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {orderStatusData.map((status, i) => (
              <div key={i} className="text-center p-2 rounded-lg" style={{ backgroundColor: `${status.color}15` }}>
                <p className="font-bold" style={{ color: status.color }}>{status.value}</p>
                <p className="text-xs text-gray-500">{status.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-serif text-lg font-bold mb-6">Category Performance</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categorySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={(val) => `$${val}`} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  formatter={(value: number, name: string) => [name === 'sales' ? formatPrice(value) : value, name === 'sales' ? 'Revenue' : 'Orders']}
                />
                <Legend />
                <Bar dataKey="sales" fill="#c9a227" name="Revenue" radius={[4, 4, 0, 0]} />
                <Bar dataKey="orders" fill="#2d2d2d" name="Orders" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New vs Returning */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-serif text-lg font-bold mb-6">New vs Returning Customers</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Bar dataKey="newCustomers" fill="#c9a227" name="New Customers" radius={[4, 4, 0, 0]} />
                <Bar dataKey="returningCustomers" fill="#2d2d2d" name="Returning" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-serif text-lg font-bold mb-6">Top Selling Products</h2>
          <div className="space-y-4">
            {topProductsData.map((product, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center text-gold-700 font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{product.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold-500 rounded-full"
                        style={{ width: `${(product.sales / 312) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 shrink-0">{product.sales} sold</span>
                  </div>
                </div>
                <p className="font-semibold text-sm shrink-0">{formatPrice(product.revenue)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Volume Trend */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="font-serif text-lg font-bold mb-6">Order Volume Over Time</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                formatter={(value: number) => [value, 'Orders']}
                labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#2d2d2d"
                strokeWidth={2}
                dot={{ fill: '#2d2d2d', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#2d2d2d' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-charcoal rounded-xl p-6 shadow-sm">
        <h2 className="font-serif text-lg font-bold text-white mb-6">Performance Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-gold-400">98.2%</p>
            <p className="text-sm text-white/70 mt-1">Order Fulfillment Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gold-400">4.8</p>
            <p className="text-sm text-white/70 mt-1">Avg Customer Rating</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gold-400">2.3 days</p>
            <p className="text-sm text-white/70 mt-1">Avg Processing Time</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gold-400">$245</p>
            <p className="text-sm text-white/70 mt-1">Avg Order Value</p>
          </div>
        </div>
      </div>
    </div>
  )
}
