import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Sparkles,
  MessageSquare,
  Download,
  Copy,
  RefreshCw,
  Wand2,
  FileText,
  Building,
  User,
  Target,
  CheckCircle,
  Clock,
  Eye,
} from "lucide-react";

export default function CoverLetter() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");

  const templates = [
    {
      id: "professional",
      name: "Professional",
      description: "Clean and formal for corporate positions",
      preview:
        "Dear Hiring Manager,\n\nI am writing to express my strong interest in the [Position] role at [Company]...",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Engaging and unique for creative roles",
      preview:
        "Hello [Company] Team,\n\nI'm excited to apply for the [Position] opportunity and bring my passion...",
    },
    {
      id: "technical",
      name: "Technical",
      description: "Skills-focused for technical positions",
      preview:
        "Dear [Hiring Manager],\n\nWith [X] years of experience in [Field], I am eager to contribute...",
    },
  ];

  const recentLetters = [
    {
      id: 1,
      company: "Google",
      position: "Frontend Engineer",
      date: "2 hours ago",
      status: "draft",
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Software Developer",
      date: "1 day ago",
      status: "sent",
    },
    {
      id: 3,
      company: "Amazon",
      position: "Full Stack Developer",
      date: "3 days ago",
      status: "sent",
    },
  ];

  const generateLetter = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedLetter(`Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle} position at ${company}. With my background in software development and passion for creating innovative solutions, I am excited about the opportunity to contribute to your team.

In my previous roles, I have developed expertise in modern web technologies including React, TypeScript, and Node.js. I have successfully delivered multiple projects that improved user experience and system performance. My experience aligns well with the requirements outlined in your job posting, particularly in:

• Frontend development with modern JavaScript frameworks
• Building scalable and maintainable applications
• Collaborating with cross-functional teams
• Implementing best practices for code quality and testing

What particularly attracts me to ${company} is your commitment to innovation and the impact your products have on millions of users worldwide. I am eager to bring my technical skills and creative problem-solving approach to help drive your mission forward.

I would welcome the opportunity to discuss how my experience and enthusiasm can contribute to ${company}'s continued success. Thank you for considering my application.

Sincerely,
[Your Name]`);
      setIsGenerating(false);
    }, 2000);
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
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">
                AI Cover Letter
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              2 Letters Generated
            </Badge>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex h-[calc(100vh-80px)]">
        {/* Sidebar - Recent Letters */}
        <aside className="w-80 border-r border-white/10 glass backdrop-blur-md p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Recent Letters</span>
            </h2>
            <Button className="w-full gradient-bg glow-effect text-white border-0">
              <Wand2 className="w-4 h-4 mr-2" />
              New Cover Letter
            </Button>
          </div>

          <div className="space-y-3">
            {recentLetters.map((letter) => (
              <Card
                key={letter.id}
                className="glass border-white/20 bg-transparent cursor-pointer glow-hover"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white font-medium text-sm">
                        {letter.company}
                      </h3>
                      <p className="text-gray-400 text-xs">{letter.position}</p>
                    </div>
                    <Badge
                      className={`text-xs ${
                        letter.status === "sent"
                          ? "bg-green-500/20 text-green-300 border-green-500/30"
                          : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                      }`}
                    >
                      {letter.status}
                    </Badge>
                  </div>
                  <p className="text-gray-500 text-xs">{letter.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="text-white font-medium mb-3">Templates</h3>
            <div className="space-y-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedTemplate === template.id
                      ? "gradient-bg glow-effect text-white"
                      : "glass border border-white/10 text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="font-medium text-sm">{template.name}</div>
                  <div className="text-xs opacity-80">
                    {template.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex">
          {/* Input Section */}
          <div className="w-1/2 p-6 border-r border-white/10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Generate Your Cover Letter
                </h2>
                <p className="text-gray-300 text-sm mb-6">
                  Our AI will create a personalized cover letter based on the
                  job details you provide.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    Company Name
                  </label>
                  <Input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Enter company name"
                    className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    <Target className="w-4 h-4 inline mr-2" />
                    Job Title
                  </label>
                  <Input
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Enter job title"
                    className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Job Description (Optional)
                  </label>
                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here for better personalization..."
                    className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500 min-h-32"
                  />
                </div>

                <Button
                  onClick={generateLetter}
                  disabled={!company || !jobTitle || isGenerating}
                  className="w-full gradient-bg glow-effect text-white border-0 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Cover Letter
                    </>
                  )}
                </Button>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h3 className="text-white font-medium mb-3">AI Writing Tips</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>Be specific about your relevant experience</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>Include job description for better matching</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>Customize for each company and role</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="w-1/2 p-6">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Preview</h2>
                {generatedLetter && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass border-white/20 text-white hover:bg-white/10"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass border-white/20 text-white hover:bg-white/10"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>

              <Card className="flex-1 glass border-white/20 bg-transparent">
                <CardContent className="p-6 h-full">
                  {generatedLetter ? (
                    <div className="h-full overflow-y-auto">
                      <pre className="text-gray-300 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                        {generatedLetter}
                      </pre>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center">
                      <div>
                        <Eye className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">
                          Your generated cover letter will appear here
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          Fill in the company and job details to get started
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
