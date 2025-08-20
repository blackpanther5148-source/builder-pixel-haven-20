import { useState } from "react";
import { usePortfolio } from "@/hooks/useApi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Sparkles,
  Briefcase,
  Plus,
  ExternalLink,
  Github,
  Globe,
  Calendar,
  Edit3,
  Trash2,
  Image,
  Code,
  Palette,
  Smartphone,
  Database,
  Eye,
  Heart,
  Share2,
} from "lucide-react";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("gallery");
  const [showAddProject, setShowAddProject] = useState(false);
  
  // API integration
  const { data: portfolioData, loading, error } = usePortfolio();
  const projects = portfolioData?.projects || [];

  const projectCategories = [
    {
      id: "all",
      name: "All Projects",
      count: 12,
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: "web",
      name: "Web Development",
      count: 6,
      icon: <Globe className="w-4 h-4" />,
    },
    {
      id: "mobile",
      name: "Mobile Apps",
      count: 3,
      icon: <Smartphone className="w-4 h-4" />,
    },
    {
      id: "ui",
      name: "UI/UX Design",
      count: 2,
      icon: <Palette className="w-4 h-4" />,
    },
    {
      id: "backend",
      name: "Backend",
      count: 1,
      icon: <Database className="w-4 h-4" />,
    },
  ];

  // Handle loading states
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your portfolio...</div>
      </div>
    );
  }

  // Handle errors
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error loading portfolio: {error}</div>
      </div>
    );
  }

  const mockProjects = [
    {
      id: 2,
      title: "Task Management Mobile App",
      description: "React Native app for productivity and task management",
      category: "mobile",
      image: "/placeholder.svg",
      technologies: ["React Native", "Firebase", "TypeScript"],
      liveUrl: "https://app-store.com/example",
      githubUrl: "https://github.com/example",
      date: "2024-02-10",
      likes: 18,
      views: 89,
      featured: false,
    },
    {
      id: 3,
      title: "Design System",
      description: "Complete design system with reusable components",
      category: "ui",
      image: "/placeholder.svg",
      technologies: ["Figma", "Storybook", "CSS", "Design Tokens"],
      liveUrl: "https://storybook.example.com",
      githubUrl: "https://github.com/example",
      date: "2024-01-30",
      likes: 32,
      views: 203,
      featured: true,
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "Real-time weather dashboard with data visualization",
      category: "web",
      image: "/placeholder.svg",
      technologies: ["Vue.js", "Chart.js", "OpenWeather API"],
      liveUrl: "https://weather.example.com",
      githubUrl: "https://github.com/example",
      date: "2023-12-05",
      likes: 15,
      views: 78,
      featured: false,
    },
    {
      id: 5,
      title: "API Gateway Service",
      description:
        "Microservices API gateway with authentication and rate limiting",
      category: "backend",
      image: "/placeholder.svg",
      technologies: ["Node.js", "Docker", "Redis", "JWT"],
      liveUrl: null,
      githubUrl: "https://github.com/example",
      date: "2024-03-01",
      likes: 8,
      views: 45,
      featured: false,
    },
    {
      id: 6,
      title: "Fitness Tracking App",
      description:
        "iOS and Android app for fitness tracking and health monitoring",
      category: "mobile",
      image: "/placeholder.svg",
      technologies: ["Flutter", "Firebase", "HealthKit"],
      liveUrl: "https://app-store.com/fitness",
      githubUrl: "https://github.com/example",
      date: "2024-02-20",
      likes: 21,
      views: 134,
      featured: true,
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const stats = {
    totalProjects: projects.length,
    totalViews: projects.reduce((sum, project) => sum + project.views, 0),
    totalLikes: projects.reduce((sum, project) => sum + project.likes, 0),
    featuredProjects: projects.filter((project) => project.featured).length,
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
              <Button
                variant="outline"
                size="sm"
                className="glass border-white/20 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Portfolio</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setShowAddProject(true)}
              className="gradient-bg glow-effect text-white border-0"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass border-white/20 bg-transparent">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold gradient-text">
                {stats.totalProjects}
              </div>
              <div className="text-gray-400 text-sm">Total Projects</div>
            </CardContent>
          </Card>
          <Card className="glass border-white/20 bg-transparent">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold gradient-text">
                {stats.totalViews}
              </div>
              <div className="text-gray-400 text-sm">Total Views</div>
            </CardContent>
          </Card>
          <Card className="glass border-white/20 bg-transparent">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold gradient-text">
                {stats.totalLikes}
              </div>
              <div className="text-gray-400 text-sm">Total Likes</div>
            </CardContent>
          </Card>
          <Card className="glass border-white/20 bg-transparent">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold gradient-text">
                {stats.featuredProjects}
              </div>
              <div className="text-gray-400 text-sm">Featured</div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? "gradient-bg glow-effect text-white"
                    : "glass border border-white/20 text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
                <Badge className="bg-white/20 text-white border-white/30 ml-2">
                  {category.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="glass border-white/20 bg-transparent glow-hover group"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 left-4">
                  {project.featured && (
                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-2">
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        className="glass border-white/20 text-white hover:bg-white/10"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        size="sm"
                        className="glass border-white/20 text-white hover:bg-white/10"
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-semibold text-lg">
                    {project.title}
                  </h3>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-white p-1"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge
                      key={tech}
                      className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30 text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{project.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{project.likes}</span>
                    </span>
                  </div>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(project.date).toLocaleDateString()}</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Project Modal Placeholder */}
        {showAddProject && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="glass border-white/20 bg-slate-900/80 w-full max-w-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add New Project</span>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Showcase your work by adding a new project to your portfolio.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Project Title
                    </label>
                    <Input
                      placeholder="Enter project title"
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Category
                    </label>
                    <select className="w-full p-2 glass border-white/20 rounded-lg text-white bg-transparent focus:ring-purple-500">
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile Apps</option>
                      <option value="ui">UI/UX Design</option>
                      <option value="backend">Backend</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Description
                  </label>
                  <Textarea
                    placeholder="Describe your project..."
                    className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Live URL
                    </label>
                    <Input
                      placeholder="https://example.com"
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      GitHub URL
                    </label>
                    <Input
                      placeholder="https://github.com/username/repo"
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddProject(false)}
                    className="glass border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button className="gradient-bg glow-effect text-white border-0">
                    Add Project
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
