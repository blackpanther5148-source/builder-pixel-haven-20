import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  LayoutDashboard,
  FileText, 
  MessageSquare, 
  Briefcase,
  Target,
  TrendingUp,
  User,
  Settings,
  Bell,
  Search,
  Plus,
  Sparkles,
  Brain,
  Zap,
  ChevronRight,
  Calendar,
  Award,
  Clock,
  CheckCircle2
} from "lucide-react";

export default function Dashboard() {
  const [jobReadinessScore, setJobReadinessScore] = useState(0);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Animate job readiness score
    const timer = setTimeout(() => {
      setJobReadinessScore(87);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const sidebarItems = [
    { id: "dashboard", icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard", active: true },
    { id: "resume", icon: <FileText className="w-5 h-5" />, label: "Resume Builder", count: 3 },
    { id: "cover-letter", icon: <MessageSquare className="w-5 h-5" />, label: "Cover Letter", count: 2 },
    { id: "portfolio", icon: <Briefcase className="w-5 h-5" />, label: "Portfolio" },
    { id: "interview", icon: <Target className="w-5 h-5" />, label: "Interview Prep" },
    { id: "career", icon: <TrendingUp className="w-5 h-5" />, label: "Career Tracker" },
  ];

  const quickActions = [
    {
      title: "Create Resume",
      description: "Build a new AI-optimized resume",
      icon: <FileText className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-500",
      action: "Create"
    },
    {
      title: "Generate Cover Letter",
      description: "AI-powered cover letter for any job",
      icon: <MessageSquare className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-500",
      action: "Generate"
    },
    {
      title: "Practice Interview",
      description: "Mock interview with AI feedback",
      icon: <Target className="w-6 h-6" />,
      gradient: "from-pink-500 to-rose-500",
      action: "Start"
    },
    {
      title: "Analyze Job Match",
      description: "See how well you match job postings",
      icon: <Brain className="w-6 h-6" />,
      gradient: "from-green-500 to-emerald-500",
      action: "Analyze"
    }
  ];

  const recentActivity = [
    {
      title: "Resume Updated",
      description: "Software Engineer Resume v2.1",
      time: "2 hours ago",
      icon: <FileText className="w-4 h-4" />,
      type: "success"
    },
    {
      title: "Cover Letter Generated",
      description: "For Google Software Engineer position",
      time: "1 day ago",
      icon: <MessageSquare className="w-4 h-4" />,
      type: "info"
    },
    {
      title: "Interview Practice",
      description: "Technical interview simulation completed",
      time: "2 days ago",
      icon: <Target className="w-4 h-4" />,
      type: "success"
    },
    {
      title: "Profile Optimized",
      description: "AI suggestions applied to resume",
      time: "3 days ago",
      icon: <Sparkles className="w-4 h-4" />,
      type: "info"
    }
  ];

  const upcomingTasks = [
    {
      title: "Apply to Google",
      description: "Software Engineer - Frontend",
      deadline: "Tomorrow",
      priority: "high"
    },
    {
      title: "Update LinkedIn",
      description: "Sync resume changes to profile",
      deadline: "This week",
      priority: "medium"
    },
    {
      title: "Practice Coding",
      description: "LeetCode problems for interviews",
      deadline: "Ongoing",
      priority: "low"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 glass backdrop-blur-md">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Profyle</span>
          </div>

          <div className="flex items-center space-x-3 mb-8 p-3 glass rounded-xl border border-white/10">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-medium">John Smith</div>
              <div className="text-gray-400 text-sm">Pro Member</div>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'gradient-bg glow-effect text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {item.count}
                  </Badge>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-white/10">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="border-b border-white/10 glass backdrop-blur-md">
          <div className="flex items-center justify-between p-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400">Welcome back! Here's your career progress overview.</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resumes, jobs..."
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <Button variant="outline" size="sm" className="glass border-white/20 text-white hover:bg-white/10">
                <Bell className="w-4 h-4" />
              </Button>
              <Button size="sm" className="gradient-bg glow-effect text-white border-0">
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
          {/* Job Readiness Score */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2 glass border-white/20 bg-transparent">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span>Job Readiness Score</span>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Your overall career preparation score based on AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-8">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        className="text-gray-700"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#gradient)"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - jobReadinessScore / 100)}`}
                        className="transition-all duration-2000 ease-out"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="50%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#EC4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold gradient-text">{jobReadinessScore}%</div>
                        <div className="text-xs text-gray-400">Ready</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Resume Strength</span>
                        <span className="text-gray-400">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Interview Skills</span>
                        <span className="text-gray-400">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Profile Optimization</span>
                        <span className="text-gray-400">91%</span>
                      </div>
                      <Progress value={91} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20 bg-transparent">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span>This Week</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Applications</span>
                  <span className="text-2xl font-bold gradient-text">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Interviews</span>
                  <span className="text-2xl font-bold gradient-text">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Responses</span>
                  <span className="text-2xl font-bold gradient-text">3</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Quick Actions</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Card key={index} className="glass border-white/20 bg-transparent glow-hover cursor-pointer">
                  <CardContent className="p-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.gradient} flex items-center justify-center mb-3 glow-effect`}>
                      {action.icon}
                    </div>
                    <h3 className="text-white font-medium mb-1">{action.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{action.description}</p>
                    <Button size="sm" variant="outline" className="w-full glass border-white/20 text-white hover:bg-white/10">
                      {action.action}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity & Upcoming Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass border-white/20 bg-transparent">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 glass rounded-lg border border-white/5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{activity.title}</h4>
                      <p className="text-gray-400 text-sm">{activity.description}</p>
                      <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass border-white/20 bg-transparent">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span>Upcoming Tasks</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 glass rounded-lg border border-white/5">
                    <div className={`w-2 h-2 rounded-full mt-3 ${
                      task.priority === 'high' ? 'bg-red-400' : 
                      task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`} />
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{task.title}</h4>
                      <p className="text-gray-400 text-sm">{task.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-gray-500 text-xs">{task.deadline}</p>
                        <Badge className={`text-xs ${
                          task.priority === 'high' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                          task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                          'bg-green-500/20 text-green-300 border-green-500/30'
                        }`}>
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <CheckCircle2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
