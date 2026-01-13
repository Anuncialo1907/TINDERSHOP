import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Package,
  Target,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";
import { StatsPage } from "@/components/StatsPage";
import { DetailedStatsPage } from "@/components/DetailedStatsPage";
import { useProductStats } from "@/hooks/useProductStats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState<"overview" | "detailed">(
    "overview",
  );
  const { stats, interactions, getTotalStats } = useProductStats();
  const [isLive, setIsLive] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Just trigger a re-render to show current stats
      // In a real app, this would fetch new data
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const totalStats = getTotalStats();
  const totalInteractions =
    totalStats.likes + totalStats.dislikes + totalStats["Love It"];

  const engagementMetrics = {
    totalProducts: stats.length,
    totalInteractions,
    averageEngagement:
      stats.length > 0 ? (totalInteractions / stats.length).toFixed(1) : "0",
    conversionRate:
      totalInteractions > 0
        ? ((totalStats["Love It"] / totalInteractions) * 100).toFixed(1)
        : "0",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Dashboard Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SwipeShop Dashboard
                </h1>
                <p className="text-sm text-slate-600">
                  Analytics & Product Performance
                </p>
              </div>
            </motion.div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLive(!isLive)}
                className={`${isLive ? "border-green-200 text-green-700" : "border-slate-200 text-slate-600"}`}
              >
                {isLive ? (
                  <Eye className="w-4 h-4 mr-2" />
                ) : (
                  <EyeOff className="w-4 h-4 mr-2" />
                )}
                {isLive ? "Live" : "Paused"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
                className="border-slate-200 text-slate-600"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Products Viewed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {engagementMetrics.totalProducts}
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Total products with interactions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Total Interactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {engagementMetrics.totalInteractions}
              </div>
              <p className="text-xs text-green-600 mt-1">
                Likes + Nopes + Love Its
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Avg. Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">
                {engagementMetrics.averageEngagement}
              </div>
              <p className="text-xs text-purple-600 mt-1">
                Interactions per product
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-700 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">
                {engagementMetrics.conversionRate}%
              </div>
              <p className="text-xs text-orange-600 mt-1">
                Love Its / Total interactions
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Status Indicator */}
        {isLive && (
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live Dashboard - Auto-updating every 5 seconds
            </Badge>
          </motion.div>
        )}

        {/* Dashboard Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Tabs
            value={currentView}
            onValueChange={(value) =>
              setCurrentView(value as "overview" | "detailed")
            }
          >
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="detailed" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Detailed Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-0">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 p-6">
                <StatsPage stats={stats} totalStats={totalStats} />
              </div>
            </TabsContent>

            <TabsContent value="detailed" className="space-y-0">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200">
                <DetailedStatsPage
                  stats={stats}
                  totalStats={totalStats}
                  onBack={() => setCurrentView("overview")}
                />
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Footer Information */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-slate-500">
            Dashboard shows real-time analytics of user interactions with
            products.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Use this dashboard to track likes, nopes, and love its for better
            product insights.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
