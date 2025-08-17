import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Sparkles, 
  TrendingUp, 
  Plus,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Eye,
  Edit3,
  Trash2,
  Search,
  Filter,
  Download,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  Phone,
  Mail,
  FileText,
  BarChart3,
  Users,
  Briefcase,
  Star
} from "lucide-react";

export default function CareerTracker() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddJob, setShowAddJob] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const jobStatuses = [
    { id: "all", name: "All Applications", count: 24, color: "bg-gray-500" },
    { id: "applied", name: "Applied", count: 8, color: "bg-blue-500" },
    { id: "interview", name: "Interview", count: 5, color: "bg-yellow-500" },
    { id: "offer", name: "Offer", count: 2, color: "bg-green-500" },
    { id: "rejected", name: "Rejected", count: 9, color: "bg-red-500" }
  ];

  const applications = [
    {
      id: 1,
      company: "Google",
      position: "Senior Frontend Engineer",
      location: "Mountain View, CA",
      salary: "$160,000 - $180,000",
      appliedDate: "2024-01-15",
      status: "interview",
      stage: "Technical Interview",
      nextStep: "System Design Round",
      nextDate: "2024-01-22",
      priority: "high",
      notes: "Great company culture, excited about the role",
      contacts: [
        { name: "Sarah Johnson", role: "Recruiter", email: "sarah@google.com" },
        { name: "Mike Chen", role: "Hiring Manager", email: "mike@google.com" }
      ]
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Full Stack Developer",
      location: "Seattle, WA",
      salary: "$140,000 - $165,000",
      appliedDate: "2024-01-10",
      status: "applied",
      stage: "Application Review",
      nextStep: "Waiting for response",
      nextDate: null,
      priority: "high",
      notes: "Applied through LinkedIn, strong team match",
      contacts: [
        { name: "Alex Rodriguez", role: "Recruiter", email: "alex@microsoft.com" }
      ]
    },
    {
      id: 3,
      company: "Amazon",
      position: "Software Engineer II",
      location: "Austin, TX",
      salary: "$130,000 - $150,000",
      appliedDate: "2024-01-08",
      status: "offer",
      stage: "Offer Received",
      nextStep: "Negotiate terms",
      nextDate: "2024-01-20",
      priority: "high",
      notes: "Competitive offer, considering benefits package",
      contacts: [
        { name: "Lisa Wang", role: "Hiring Manager", email: "lisa@amazon.com" }
      ]
    },
    {
      id: 4,
      company: "Meta",
      position: "React Developer",
      location: "Menlo Park, CA",
      salary: "$150,000 - $170,000",
      appliedDate: "2024-01-05",
      status: "rejected",
      stage: "Final Interview",
      nextStep: "Feedback received",
      nextDate: null,
      priority: "medium",
      notes: "Great interview experience, good feedback for improvement",
      contacts: [
        { name: "David Kim", role: "Tech Lead", email: "david@meta.com" }
      ]
    },
    {
      id: 5,
      company: "Netflix",
      position: "Senior UI Engineer",
      location: "Los Gatos, CA",
      salary: "$170,000 - $190,000",
      appliedDate: "2024-01-12",
      status: "interview",
      stage: "First Round",
      nextStep: "Technical Assessment",
      nextDate: "2024-01-25",
      priority: "high",
      notes: "Innovative projects, great growth opportunities",
      contacts: [
        { name: "Emma Davis", role: "Senior Recruiter", email: "emma@netflix.com" }
      ]
    }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalApplications: applications.length,
    responseRate: Math.round((applications.filter(app => app.status !== "applied").length / applications.length) * 100),
    interviewRate: Math.round((applications.filter(app => app.status === "interview" || app.status === "offer").length / applications.length) * 100),
    offerRate: Math.round((applications.filter(app => app.status === "offer").length / applications.length) * 100)
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied": return <Send className="w-4 h-4" />;
      case "interview": return <Users className="w-4 h-4" />;
      case "offer": return <CheckCircle className="w-4 h-4" />;
      case "rejected": return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "interview": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "offer": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "rejected": return "bg-red-500/20 text-red-300 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-gradient-wave" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-gradient-wave animation-delay-2000" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 glass">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="glass border-white/20 text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Career Tracker</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              onClick={() => setShowAddJob(true)}
              className="gradient-bg glow-effect text-white border-0"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Application
            </Button>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass border-white/20 bg-transparent">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold gradient-text">{stats.totalApplications}</div>
              <div className="text-gray-400 text-sm">Total Applications</div>
            </CardContent>
          </Card>
          <Card className="glass border-white/20 bg-transparent">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold gradient-text">{stats.responseRate}%</div>
              <div className="text-gray-400 text-sm">Response Rate</div>
            </CardContent>
          </Card>
          <Card className="glass border-white/20 bg-transparent">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold gradient-text">{stats.interviewRate}%</div>
              <div className="text-gray-400 text-sm">Interview Rate</div>
            </CardContent>
          </Card>
          <Card className="glass border-white/20 bg-transparent">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold gradient-text">{stats.offerRate}%</div>
              <div className="text-gray-400 text-sm">Offer Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {jobStatuses.map((status) => (
              <button
                key={status.id}
                onClick={() => setStatusFilter(status.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  statusFilter === status.id
                    ? 'gradient-bg glow-effect text-white'
                    : 'glass border border-white/20 text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${status.color}`} />
                <span>{status.name}</span>
                <Badge className="bg-white/20 text-white border-white/30 ml-2">
                  {status.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search companies or positions..."
              className="pl-10 glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
            />
          </div>
          <Button variant="outline" className="glass border-white/20 text-white hover:bg-white/10">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="glass border-white/20 text-white hover:bg-white/10">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <Card key={app.id} className="glass border-white/20 bg-transparent glow-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Building className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">{app.company}</h3>
                          <p className="text-gray-300">{app.position}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{app.location}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{app.salary}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Applied {new Date(app.appliedDate).toLocaleDateString()}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(app.priority)}`} />
                        <Badge className={getStatusColor(app.status)}>
                          {getStatusIcon(app.status)}
                          <span className="ml-1 capitalize">{app.status}</span>
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="p-3 glass rounded-lg border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">Current Stage</div>
                        <div className="text-white font-medium">{app.stage}</div>
                      </div>
                      <div className="p-3 glass rounded-lg border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">Next Step</div>
                        <div className="text-white font-medium">{app.nextStep}</div>
                      </div>
                      <div className="p-3 glass rounded-lg border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">Next Date</div>
                        <div className="text-white font-medium">
                          {app.nextDate ? new Date(app.nextDate).toLocaleDateString() : "TBD"}
                        </div>
                      </div>
                    </div>

                    {app.notes && (
                      <div className="mb-4">
                        <div className="text-sm text-gray-400 mb-1">Notes</div>
                        <p className="text-gray-300 text-sm">{app.notes}</p>
                      </div>
                    )}

                    {app.contacts && app.contacts.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm text-gray-400 mb-2">Contacts</div>
                        <div className="flex flex-wrap gap-2">
                          {app.contacts.map((contact, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 glass rounded-lg border border-white/10">
                              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                <Mail className="w-3 h-3 text-white" />
                              </div>
                              <div>
                                <div className="text-white text-sm font-medium">{contact.name}</div>
                                <div className="text-gray-400 text-xs">{contact.role}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button size="sm" variant="outline" className="glass border-white/20 text-white hover:bg-white/10">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="glass border-white/20 text-white hover:bg-white/10">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="glass border-white/20 text-white hover:bg-red-500/20 hover:border-red-500/30">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Job Modal */}
        {showAddJob && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="glass border-white/20 bg-slate-900/80 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add Job Application</span>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Track a new job application and manage your career progress.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Company</label>
                    <Input
                      placeholder="Company name"
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Position</label>
                    <Input
                      placeholder="Job title"
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Location</label>
                    <Input
                      placeholder="City, State"
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Salary Range</label>
                    <Input
                      placeholder="$80,000 - $100,000"
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Status</label>
                    <select className="w-full p-2 glass border-white/20 rounded-lg text-white bg-transparent focus:ring-purple-500">
                      <option value="applied">Applied</option>
                      <option value="interview">Interview</option>
                      <option value="offer">Offer</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Priority</label>
                    <select className="w-full p-2 glass border-white/20 rounded-lg text-white bg-transparent focus:ring-purple-500">
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Notes</label>
                  <Textarea
                    placeholder="Add any notes about this application..."
                    className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                  />
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddJob(false)}
                    className="glass border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button className="gradient-bg glow-effect text-white border-0">
                    Add Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
