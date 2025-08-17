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
  Brain, 
  Search,
  Upload,
  Zap,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
  FileText,
  Building,
  MapPin,
  DollarSign,
  Clock,
  Star,
  Eye,
  Download,
  RefreshCw,
  Lightbulb,
  Award,
  Users,
  Code,
  Layers,
  Shield,
  Globe,
  Smartphone,
  Palette,
  Database,
  Coffee,
  ChevronRight,
  Plus,
  Minus
} from "lucide-react";

export default function JobMatchAnalyzer() {
  const [jobUrl, setJobUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [matchScore, setMatchScore] = useState(0);
  const [activeTab, setActiveTab] = useState("url");

  const sampleJobDescription = `We are seeking a Senior Frontend Engineer to join our dynamic team. The ideal candidate will have 5+ years of experience in React, TypeScript, and modern JavaScript frameworks.

Key Responsibilities:
• Develop and maintain scalable web applications using React and TypeScript
• Collaborate with design and backend teams to implement user interfaces
• Optimize applications for maximum speed and scalability
• Write clean, maintainable, and well-documented code
• Participate in code reviews and mentor junior developers

Required Qualifications:
• Bachelor's degree in Computer Science or related field
• 5+ years of professional frontend development experience
• Expert knowledge of React, TypeScript, HTML5, CSS3
• Experience with modern build tools (Webpack, Vite)
• Familiarity with testing frameworks (Jest, React Testing Library)
• Experience with version control systems (Git)
• Strong problem-solving and communication skills

Preferred Qualifications:
• Experience with Next.js or similar frameworks
• Knowledge of state management libraries (Redux, Zustand)
• Familiarity with cloud platforms (AWS, Azure)
• Experience with CI/CD pipelines
• Contributions to open-source projects

Benefits:
• Competitive salary ($130,000 - $160,000)
• Health, dental, and vision insurance
• 401(k) with company matching
• Flexible work arrangements
• Professional development budget`;

  const analysisResults = {
    overallMatch: 87,
    skillsMatch: 92,
    experienceMatch: 85,
    educationMatch: 90,
    requirementsMatch: 88,
    
    matchedSkills: [
      { skill: "React", level: "Expert", match: 100, required: true },
      { skill: "TypeScript", level: "Advanced", match: 95, required: true },
      { skill: "JavaScript", level: "Expert", match: 100, required: true },
      { skill: "HTML5", level: "Expert", match: 100, required: true },
      { skill: "CSS3", level: "Advanced", match: 95, required: true },
      { skill: "Git", level: "Advanced", match: 90, required: true },
      { skill: "Jest", level: "Intermediate", match: 80, required: false },
      { skill: "Webpack", level: "Intermediate", match: 75, required: false }
    ],

    missingSkills: [
      { skill: "Next.js", importance: "Preferred", impact: "Low" },
      { skill: "Redux", importance: "Preferred", impact: "Medium" },
      { skill: "AWS", importance: "Preferred", impact: "Low" }
    ],

    suggestions: [
      {
        category: "Skills",
        priority: "High",
        suggestion: "Consider adding Next.js experience to your resume - it's mentioned as a preferred qualification",
        action: "Take an online course or build a project with Next.js"
      },
      {
        category: "Experience",
        priority: "Medium", 
        suggestion: "Highlight your 6 years of frontend experience more prominently",
        action: "Update your resume summary to emphasize senior-level experience"
      },
      {
        category: "Keywords",
        priority: "High",
        suggestion: "Include more specific keywords like 'scalable web applications' and 'code reviews'",
        action: "Update your job descriptions to include these exact phrases"
      },
      {
        category: "Certifications",
        priority: "Low",
        suggestion: "Consider getting AWS certification for cloud platform knowledge",
        action: "Explore AWS certification programs"
      }
    ],

    salaryInsights: {
      yourRange: "$125,000 - $145,000",
      jobRange: "$130,000 - $160,000",
      marketAverage: "$140,000",
      competitiveness: "Competitive"
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    // Simulate analysis process
    setTimeout(() => {
      setMatchScore(analysisResults.overallMatch);
      setAnalysisComplete(true);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleUrlAnalyze = () => {
    if (jobUrl) {
      setJobDescription(sampleJobDescription);
      handleAnalyze();
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-yellow-400";
    if (score >= 60) return "text-orange-400";
    return "text-red-400";
  };

  const getMatchBgColor = (score: number) => {
    if (score >= 90) return "bg-green-500/20 border-green-500/30";
    if (score >= 75) return "bg-yellow-500/20 border-yellow-500/30";
    if (score >= 60) return "bg-orange-500/20 border-orange-500/30";
    return "bg-red-500/20 border-red-500/30";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "bg-red-500/20 text-red-300 border-red-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "low": return "bg-green-500/20 text-green-300 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
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
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Job Match Analyzer</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Zap className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-6">
        {!analysisComplete ? (
          // Input Section
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">Analyze Your Job Match</h1>
              <p className="text-gray-300 text-lg">
                Discover how well your profile matches any job posting with AI-powered analysis
              </p>
            </div>

            <Card className="glass border-white/20 bg-transparent">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <button
                    onClick={() => setActiveTab("url")}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      activeTab === "url"
                        ? "gradient-bg glow-effect text-white"
                        : "glass border border-white/20 text-gray-300 hover:text-white"
                    }`}
                  >
                    <Globe className="w-4 h-4 mr-2 inline" />
                    Job URL
                  </button>
                  <button
                    onClick={() => setActiveTab("text")}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      activeTab === "text"
                        ? "gradient-bg glow-effect text-white"
                        : "glass border border-white/20 text-gray-300 hover:text-white"
                    }`}
                  >
                    <FileText className="w-4 h-4 mr-2 inline" />
                    Job Description
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {activeTab === "url" ? (
                  <div>
                    <label className="block text-white font-medium mb-2">Job Posting URL</label>
                    <div className="flex space-x-4">
                      <Input
                        value={jobUrl}
                        onChange={(e) => setJobUrl(e.target.value)}
                        placeholder="https://company.com/careers/job-posting"
                        className="flex-1 glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                      />
                      <Button
                        onClick={handleUrlAnalyze}
                        disabled={!jobUrl || isAnalyzing}
                        className="gradient-bg glow-effect text-white border-0 px-8"
                      >
                        {isAnalyzing ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Search className="w-4 h-4 mr-2" />
                            Analyze
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      Enter the URL of any job posting from LinkedIn, Indeed, or company career pages
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-white font-medium mb-2">Job Description</label>
                    <Textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the complete job description here..."
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500 min-h-40"
                    />
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-gray-400 text-sm">
                        Copy and paste the job description for accurate analysis
                      </p>
                      <Button
                        onClick={handleAnalyze}
                        disabled={!jobDescription || isAnalyzing}
                        className="gradient-bg glow-effect text-white border-0"
                      >
                        {isAnalyzing ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Brain className="w-4 h-4 mr-2" />
                            Analyze Match
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">AI Analysis in Progress</h3>
                    <p className="text-gray-300 mb-4">
                      Analyzing job requirements against your profile...
                    </p>
                    <div className="max-w-md mx-auto">
                      <Progress value={66} className="h-2" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sample Analysis Button */}
            <div className="text-center mt-8">
              <Button
                onClick={() => {
                  setJobDescription(sampleJobDescription);
                  handleAnalyze();
                }}
                variant="outline"
                className="glass border-white/20 text-white hover:bg-white/10"
              >
                <Eye className="w-4 h-4 mr-2" />
                Try Sample Analysis
              </Button>
            </div>
          </div>
        ) : (
          // Results Section
          <div className="space-y-6">
            {/* Overall Match Score */}
            <Card className="glass border-white/20 bg-transparent">
              <CardHeader>
                <CardTitle className="text-white text-center text-2xl">Overall Job Match</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-gray-700"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#gradient)"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - matchScore / 100)}`}
                        className="transition-all duration-2000 ease-out"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10B981" />
                          <stop offset="50%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={`text-5xl font-bold ${getMatchColor(matchScore)}`}>
                          {matchScore}%
                        </div>
                        <div className="text-gray-400 text-lg">Match</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <Badge className={`text-lg px-4 py-2 ${getMatchBgColor(matchScore)}`}>
                    <Award className="w-5 h-5 mr-2" />
                    Excellent Match
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="glass border-white/20 bg-transparent">
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${getMatchColor(analysisResults.skillsMatch)}`}>
                    {analysisResults.skillsMatch}%
                  </div>
                  <div className="text-gray-400 text-sm">Skills Match</div>
                  <Progress value={analysisResults.skillsMatch} className="h-2 mt-2" />
                </CardContent>
              </Card>
              <Card className="glass border-white/20 bg-transparent">
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${getMatchColor(analysisResults.experienceMatch)}`}>
                    {analysisResults.experienceMatch}%
                  </div>
                  <div className="text-gray-400 text-sm">Experience</div>
                  <Progress value={analysisResults.experienceMatch} className="h-2 mt-2" />
                </CardContent>
              </Card>
              <Card className="glass border-white/20 bg-transparent">
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${getMatchColor(analysisResults.educationMatch)}`}>
                    {analysisResults.educationMatch}%
                  </div>
                  <div className="text-gray-400 text-sm">Education</div>
                  <Progress value={analysisResults.educationMatch} className="h-2 mt-2" />
                </CardContent>
              </Card>
              <Card className="glass border-white/20 bg-transparent">
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${getMatchColor(analysisResults.requirementsMatch)}`}>
                    {analysisResults.requirementsMatch}%
                  </div>
                  <div className="text-gray-400 text-sm">Requirements</div>
                  <Progress value={analysisResults.requirementsMatch} className="h-2 mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Skills Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass border-white/20 bg-transparent">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Matched Skills</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analysisResults.matchedSkills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 glass rounded-lg border border-white/10">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${skill.required ? 'bg-red-400' : 'bg-blue-400'}`} />
                        <div>
                          <div className="text-white font-medium">{skill.skill}</div>
                          <div className="text-gray-400 text-sm">{skill.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`text-lg font-bold ${getMatchColor(skill.match)}`}>
                          {skill.match}%
                        </div>
                        {skill.required && (
                          <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass border-white/20 bg-transparent">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                    <span>Missing Skills</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analysisResults.missingSkills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 glass rounded-lg border border-white/10">
                      <div className="flex items-center space-x-3">
                        <XCircle className="w-5 h-5 text-red-400" />
                        <div>
                          <div className="text-white font-medium">{skill.skill}</div>
                          <div className="text-gray-400 text-sm">{skill.importance}</div>
                        </div>
                      </div>
                      <Badge className={`text-xs ${
                        skill.impact === 'High' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                        skill.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                        'bg-green-500/20 text-green-300 border-green-500/30'
                      }`}>
                        {skill.impact} Impact
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Improvement Suggestions */}
            <Card className="glass border-white/20 bg-transparent">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <span>Improvement Suggestions</span>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  AI-powered recommendations to improve your job match score
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisResults.suggestions.map((suggestion, index) => (
                  <div key={index} className="p-4 glass rounded-lg border border-white/10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {suggestion.category}
                        </Badge>
                        <Badge className={getPriorityColor(suggestion.priority)}>
                          {suggestion.priority} Priority
                        </Badge>
                      </div>
                      <Target className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-gray-300 mb-2">{suggestion.suggestion}</p>
                    <div className="flex items-center space-x-2 text-sm">
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-400">{suggestion.action}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Salary Insights */}
            <Card className="glass border-white/20 bg-transparent">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span>Salary Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 glass rounded-lg border border-white/10">
                    <div className="text-lg font-bold text-blue-400">{analysisResults.salaryInsights.yourRange}</div>
                    <div className="text-gray-400 text-sm">Your Range</div>
                  </div>
                  <div className="text-center p-4 glass rounded-lg border border-white/10">
                    <div className="text-lg font-bold text-green-400">{analysisResults.salaryInsights.jobRange}</div>
                    <div className="text-gray-400 text-sm">Job Range</div>
                  </div>
                  <div className="text-center p-4 glass rounded-lg border border-white/10">
                    <div className="text-lg font-bold text-purple-400">{analysisResults.salaryInsights.marketAverage}</div>
                    <div className="text-gray-400 text-sm">Market Average</div>
                  </div>
                  <div className="text-center p-4 glass rounded-lg border border-white/10">
                    <div className="text-lg font-bold text-yellow-400">{analysisResults.salaryInsights.competitiveness}</div>
                    <div className="text-gray-400 text-sm">Your Position</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="gradient-bg glow-effect text-white border-0">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Link to="/resume-builder">
                <Button variant="outline" className="glass border-white/20 text-white hover:bg-white/10">
                  <FileText className="w-4 h-4 mr-2" />
                  Update Resume
                </Button>
              </Link>
              <Link to="/cover-letter">
                <Button variant="outline" className="glass border-white/20 text-white hover:bg-white/10">
                  <Target className="w-4 h-4 mr-2" />
                  Generate Cover Letter
                </Button>
              </Link>
              <Button
                onClick={() => {
                  setAnalysisComplete(false);
                  setJobDescription("");
                  setJobUrl("");
                }}
                variant="outline"
                className="glass border-white/20 text-white hover:bg-white/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Analyze Another Job
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
