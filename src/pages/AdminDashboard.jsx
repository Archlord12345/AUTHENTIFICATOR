import React from 'react';
import AdminLayout from '../components/AdminLayout';
import StatsCard from '../components/StatsCard';
import VehicleTable from '../components/VehicleTable';
import {
  Truck, AlertCircle, CheckCircle, XCircle,
  TrendingUp, BarChart3
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <AdminLayout activeTab="logistics">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back to</h1>
          <p className="text-lg text-gray-600">Logistics Dashboard</p>
        </div>

        {/* Stats Cards - First Row */}
        <div className="flex gap-4 flex-wrap">
          <StatsCard
            icon={Truck}
            label="Total Shipments"
            value="869"
            color="blue"
          />
          <StatsCard
            icon={AlertCircle}
            label="Pending"
            value="562"
            color="red"
          />
          <StatsCard
            icon={CheckCircle}
            label="Delivered"
            value="624"
            color="purple"
          />
          <StatsCard
            icon={XCircle}
            label="Cancelled"
            value="47"
            color="dark"
          />
        </div>

        {/* Stats Cards - Second Row */}
        <div className="flex gap-4 flex-wrap">
          <StatsCard
            icon={Truck}
            label="In Transit"
            value="365"
            color="green"
          />
          <StatsCard
            icon={BarChart3}
            label="On Hold"
            value="26"
            color="yellow"
          />
          <StatsCard
            icon={CheckCircle}
            label="On Hold"
            value="78"
            color="teal"
          />
          <StatsCard
            icon={AlertCircle}
            label="Alert"
            value="15"
            color="orange"
          />
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Total Value</p>
                <p className="text-3xl font-bold text-gray-900">$5836M</p>
              </div>
              <TrendingUp className="text-green-500" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">Total Routes</p>
                <p className="text-3xl font-bold text-gray-900">$6829M</p>
              </div>
              <TrendingUp className="text-green-500" size={32} />
            </div>
          </div>
        </div>

        {/* Vehicle List */}
        <VehicleTable />

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Vehicle Status</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700">Active</span>
                  <span className="text-sm font-semibold text-gray-900">35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700">Idle</span>
                  <span className="text-sm font-semibold text-gray-900">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700">Maintenance</span>
                  <span className="text-sm font-semibold text-gray-900">28%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700">Other</span>
                  <span className="text-sm font-semibold text-gray-900">12%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-300 h-2 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Orders by Country</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Sandor</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">Kate Coleman</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">USA</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">142 orders</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Europe</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">89 orders</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
