import { useState, useRef } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Sparkles,
  FileText,
  Upload,
  Download,
  Eye,
  Plus,
  Minus,
  Save,
  RefreshCw,
  Zap,
  Brain,
  Target,
  Award,
  Building,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github,
  Edit3,
  Trash2,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  AlertCircle,
  CheckCircle,
  Star,
  Move,
  GripVertical,
  BookOpen,
  Code,
  Trophy,
  Briefcase,
  GraduationCap,
  Share2,
  User,
  Loader2,
} from "lucide-react";

interface ResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    summary: string;
    profileImage: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
    technologies: string[];
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa: string;
    honors: string;
    coursework: string[];
    thesis: string;
  }>;
  skills: Array<{
    id: string;
    category: string;
    items: string[];
    level: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link: string;
    github: string;
    startDate: string;
    endDate: string;
    current: boolean;
    achievements: string[];
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    expiryDate: string;
    credentialId: string;
    verificationUrl: string;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    organization: string;
  }>;
  languages: Array<{
    id: string;
    language: string;
    proficiency: string;
  }>;
  publications: Array<{
    id: string;
    title: string;
    publisher: string;
    date: string;
    url: string;
    description: string;
  }>;
  volunteering: Array<{
    id: string;
    organization: string;
    role: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
}

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState("upload");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      website: "johnsmi.th",
      linkedin: "linkedin.com/in/johnsmith",
      github: "github.com/johnsmith",
      summary: "Experienced software engineer with 5+ years in full-stack development. Passionate about creating scalable web applications and leading technical teams.",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    experience: [
      {
        id: "1",
        company: "Tech Corp",
        position: "Senior Software Engineer",
        location: "San Francisco, CA",
        startDate: "2021-01",
        endDate: "",
        current: true,
        description: "Lead development of scalable web applications using React and Node.js",
        achievements: [
          "Improved application performance by 40% through optimization",
          "Led a team of 4 developers on critical product features",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
        ],
        technologies: ["React", "Node.js", "TypeScript", "AWS"],
      },
    ],
    education: [
      {
        id: "1",
        institution: "University of California",
        degree: "Bachelor of Science",
        field: "Computer Science",
        location: "Berkeley, CA",
        startDate: "2015-09",
        endDate: "2019-05",
        gpa: "3.8",
        honors: "Magna Cum Laude",
        coursework: ["Data Structures", "Algorithms", "Software Engineering", "Database Systems"],
        thesis: "Machine Learning Applications in Web Development",
      },
    ],
    skills: [
      {
        id: "1",
        category: "Programming Languages",
        items: ["JavaScript", "TypeScript", "Python", "Java"],
        level: "Advanced",
      },
      {
        id: "2",
        category: "Frameworks & Libraries",
        items: ["React", "Node.js", "Express", "Next.js"],
        level: "Advanced",
      },
      {
        id: "3",
        category: "Tools & Technologies",
        items: ["AWS", "Docker", "Git", "MongoDB"],
        level: "Intermediate",
      },
    ],
    projects: [
      {
        id: "1",
        name: "E-commerce Platform",
        description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
        link: "https://demo.com",
        github: "https://github.com/user/project",
        startDate: "2023-01",
        endDate: "2023-06",
        current: false,
        achievements: [
          "Handled 10,000+ concurrent users",
          "Integrated payment processing with 99.9% uptime",
          "Implemented real-time inventory management",
        ],
      },
    ],
    certifications: [
      {
        id: "1",
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023-03",
        expiryDate: "2026-03",
        credentialId: "AWS-CSA-123456",
        verificationUrl: "https://aws.amazon.com/verification",
      },
    ],
    achievements: [
      {
        id: "1",
        title: "Employee of the Year",
        description: "Recognized for outstanding performance and leadership in software development",
        date: "2023-12",
        organization: "Tech Corp",
      },
    ],
    languages: [
      {
        id: "1",
        language: "English",
        proficiency: "Native",
      },
      {
        id: "2",
        language: "Spanish",
        proficiency: "Conversational",
      },
    ],
    publications: [
      {
        id: "1",
        title: "Modern Web Development Practices",
        publisher: "Tech Journal",
        date: "2023-08",
        url: "https://techjournal.com/article",
        description: "A comprehensive guide to modern web development techniques and best practices",
      },
    ],
    volunteering: [
      {
        id: "1",
        organization: "Code for America",
        role: "Volunteer Developer",
        startDate: "2022-01",
        endDate: "",
        current: true,
        description: "Developing civic technology solutions for local communities",
      },
    ],
  });

  const portfolioImages = [
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600",
    "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600",
  ];

  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and contemporary design",
      preview: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400",
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional professional layout",
      preview: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Unique design for creative roles",
      preview: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and clean aesthetic",
      preview: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=400",
    },
  ];

  const suggestions = [
    "Consider adding quantified achievements to your experience",
    "Include relevant keywords from the job description",
    "Add a professional summary at the top",
    "List your most relevant skills first",
    "Use action verbs to start bullet points",
    "Add certifications to boost credibility",
    "Include volunteer work to show character",
    "Showcase your personal projects",
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const file = files[0];

    if (
      file &&
      (file.type === "application/pdf" ||
        file.name.endsWith(".docx") ||
        file.name.endsWith(".doc"))
    ) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setActiveSection("build");
      setAiSuggestions(suggestions);
    }, 3000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      // In a real app, this would call your backend API
      const response = await fetch("/api/resumes/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          resumeData,
          template: selectedTemplate,
          format: "pdf",
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        // Fallback: simulate download
        alert("PDF download would be generated here in production");
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("PDF download would be generated here in production");
    } finally {
      setIsDownloading(false);
    }
  };

  // Helper functions for adding/removing items
  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [""],
      technologies: [],
    };
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExp],
    });
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
      honors: "",
      coursework: [],
      thesis: "",
    };
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEdu],
    });
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      link: "",
      github: "",
      startDate: "",
      endDate: "",
      current: false,
      achievements: [""],
    };
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject],
    });
  };

  const addCertification = () => {
    const newCert = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      expiryDate: "",
      credentialId: "",
      verificationUrl: "",
    };
    setResumeData({
      ...resumeData,
      certifications: [...resumeData.certifications, newCert],
    });
  };

  const sectionNavigation = [
    {
      id: "upload",
      name: "Upload Resume",
      icon: <Upload className="w-4 h-4" />,
    },
    { id: "build", name: "Build Resume", icon: <Edit3 className="w-4 h-4" /> },
    {
      id: "templates",
      name: "Choose Template",
      icon: <Eye className="w-4 h-4" />,
    },
    {
      id: "preview",
      name: "Preview & Download",
      icon: <Download className="w-4 h-4" />,
    },
  ];

  const renderUploadSection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Upload Your Existing Resume
        </h2>
        <p className="text-gray-300 text-lg">
          Let AI analyze and optimize your resume, or start building from
          scratch
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
          isDragging
            ? "border-purple-500 bg-purple-500/10"
            : "border-gray-600 glass"
        }`}
      >
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">
          Drop your resume here
        </h3>
        <p className="text-gray-400 mb-6">
          Supports PDF, DOC, and DOCX files up to 10MB
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="gradient-bg glow-effect text-white border-0"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </Button>
          <Button
            onClick={() => setActiveSection("build")}
            variant="outline"
            className="glass border-white/20 text-white hover:bg-white/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Start from Scratch
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Portfolio Images Gallery */}
      <Card className="glass border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span>Portfolio Inspiration</span>
          </CardTitle>
          <CardDescription className="text-gray-300">
            Browse professional portfolios for inspiration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolioImages.map((image, index) => (
              <div
                key={index}
                className="aspect-video rounded-lg overflow-hidden glass border border-white/10 glow-hover cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {isProcessing && (
        <Card className="glass border-white/20 bg-transparent">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              AI Processing Your Resume
            </h3>
            <p className="text-gray-300 mb-4">
              Analyzing content, extracting information, and preparing
              optimizations...
            </p>
            <div className="max-w-md mx-auto">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"
                  style={{ width: "70%" }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {uploadedFile && !isProcessing && (
        <Card className="glass border-white/20 bg-transparent">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">{uploadedFile.name}</h4>
                <p className="text-gray-400 text-sm">
                  {(uploadedFile.size / 1024 / 1024).toFixed(1)} MB • Uploaded
                  successfully
                </p>
              </div>
              <Button
                onClick={() => setActiveSection("build")}
                className="gradient-bg glow-effect text-white border-0"
              >
                Continue Building
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderBuildSection = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Personal Information */}
        <Card className="glass border-white/20 bg-transparent">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">
                  First Name
                </label>
                <Input
                  value={resumeData.personalInfo.firstName}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personalInfo: {
                        ...resumeData.personalInfo,
                        firstName: e.target.value,
                      },
                    })
                  }
                  className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">
                  Last Name
                </label>
                <Input
                  value={resumeData.personalInfo.lastName}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personalInfo: {
                        ...resumeData.personalInfo,
                        lastName: e.target.value,
                      },
                    })
                  }
                  className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personalInfo: {
                        ...resumeData.personalInfo,
                        email: e.target.value,
                      },
                    })
                  }
                  className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">
                  Phone
                </label>
                <Input
                  value={resumeData.personalInfo.phone}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personalInfo: {
                        ...resumeData.personalInfo,
                        phone: e.target.value,
                      },
                    })
                  }
                  className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-white font-medium mb-2">
                Professional Summary
              </label>
              <Textarea
                value={resumeData.personalInfo.summary}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    personalInfo: {
                      ...resumeData.personalInfo,
                      summary: e.target.value,
                    },
                  })
                }
                className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                placeholder="Brief summary of your professional background and key strengths..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card className="glass border-white/20 bg-transparent">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center space-x-2">
                <GraduationCap className="w-5 h-5" />
                <span>Education</span>
              </CardTitle>
              <Button
                onClick={addEducation}
                size="sm"
                className="gradient-bg glow-effect text-white border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {resumeData.education.map((edu) => (
              <div
                key={edu.id}
                className="p-4 glass rounded-lg border border-white/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Institution
                    </label>
                    <Input
                      value={edu.institution}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          education: resumeData.education.map((item) =>
                            item.id === edu.id 
                              ? { ...item, institution: e.target.value }
                              : item
                          ),
                        })
                      }
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Degree
                    </label>
                    <Input
                      value={edu.degree}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          education: resumeData.education.map((item) =>
                            item.id === edu.id 
                              ? { ...item, degree: e.target.value }
                              : item
                          ),
                        })
                      }
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Field of Study
                    </label>
                    <Input
                      value={edu.field}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          education: resumeData.education.map((item) =>
                            item.id === edu.id 
                              ? { ...item, field: e.target.value }
                              : item
                          ),
                        })
                      }
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      GPA
                    </label>
                    <Input
                      value={edu.gpa}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          education: resumeData.education.map((item) =>
                            item.id === edu.id 
                              ? { ...item, gpa: e.target.value }
                              : item
                          ),
                        })
                      }
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                      placeholder="3.8/4.0"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Honors
                    </label>
                    <Input
                      value={edu.honors}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          education: resumeData.education.map((item) =>
                            item.id === edu.id 
                              ? { ...item, honors: e.target.value }
                              : item
                          ),
                        })
                      }
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                      placeholder="Magna Cum Laude"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card className="glass border-white/20 bg-transparent">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>Projects</span>
              </CardTitle>
              <Button
                onClick={addProject}
                size="sm"
                className="gradient-bg glow-effect text-white border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {resumeData.projects.map((project) => (
              <div
                key={project.id}
                className="p-4 glass rounded-lg border border-white/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Project Name
                    </label>
                    <Input
                      value={project.name}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          projects: resumeData.projects.map((item) =>
                            item.id === project.id 
                              ? { ...item, name: e.target.value }
                              : item
                          ),
                        })
                      }
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Live Demo URL
                    </label>
                    <Input
                      value={project.link}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          projects: resumeData.projects.map((item) =>
                            item.id === project.id 
                              ? { ...item, link: e.target.value }
                              : item
                          ),
                        })
                      }
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                      placeholder="https://project-demo.com"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-white font-medium mb-2">
                    Description
                  </label>
                  <Textarea
                    value={project.description}
                    onChange={(e) =>
                      setResumeData({
                        ...resumeData,
                        projects: resumeData.projects.map((item) =>
                          item.id === project.id 
                            ? { ...item, description: e.target.value }
                            : item
                        ),
                      })
                    }
                    className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                    placeholder="Describe what this project does and your role in building it..."
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Certifications Section */}
        <Card className="glass border-white/20 bg-transparent">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Certifications</span>
              </CardTitle>
              <Button
                onClick={addCertification}
                size="sm"
                className="gradient-bg glow-effect text-white border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Certification
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {resumeData.certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-4 glass rounded-lg border border-white/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Certification Name
                    </label>
                    <Input
                      value={cert.name}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          certifications: resumeData.certifications.map((item) =>
                            item.id === cert.id 
                              ? { ...item, name: e.target.value }
                              : item
                          ),
                        })
                      }
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Issuing Organization
                    </label>
                    <Input
                      value={cert.issuer}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          certifications: resumeData.certifications.map((item) =>
                            item.id === cert.id 
                              ? { ...item, issuer: e.target.value }
                              : item
                          ),
                        })
                      }
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Date Issued
                    </label>
                    <Input
                      type="month"
                      value={cert.date}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          certifications: resumeData.certifications.map((item) =>
                            item.id === cert.id 
                              ? { ...item, date: e.target.value }
                              : item
                          ),
                        })
                      }
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Credential ID
                    </label>
                    <Input
                      value={cert.credentialId}
                      onChange={(e) =>
                        setResumeData({
                          ...resumeData,
                          certifications: resumeData.certifications.map((item) =>
                            item.id === cert.id 
                              ? { ...item, credentialId: e.target.value }
                              : item
                          ),
                        })
                      }
                      className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                      placeholder="ABC123456"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Suggestions Sidebar */}
      <div className="space-y-6">
        <Card className="glass border-white/20 bg-transparent">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <span>AI Suggestions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-3 glass rounded-lg border border-white/10"
              >
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">{suggestion}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass border-white/20 bg-transparent">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-400" />
              <span>Resume Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">94%</div>
              <p className="text-gray-400 text-sm mb-4">Optimization Score</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Content Quality</span>
                  <span className="text-green-400">95%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">ATS Compatibility</span>
                  <span className="text-green-400">92%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Keywords</span>
                  <span className="text-green-400">96%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTemplatesSection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Choose Your Template
        </h2>
        <p className="text-gray-300 text-lg">
          Select a professional template that matches your industry and style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`glass border-white/20 bg-transparent cursor-pointer transition-all ${
              selectedTemplate === template.id
                ? "border-purple-500/50 scale-105 glow-effect"
                : "hover:border-white/40 glow-hover"
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <CardContent className="p-4">
              <div className="aspect-[3/4] bg-gray-700 rounded-lg mb-4 overflow-hidden">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {template.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {template.description}
              </p>
              {selectedTemplate === template.id && (
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 w-full justify-center">
                  <Check className="w-3 h-3 mr-1" />
                  Selected
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => setActiveSection("preview")}
          className="gradient-bg glow-effect text-white border-0 text-lg px-8 py-3"
        >
          <Eye className="w-5 h-5 mr-2" />
          Preview Resume
        </Button>
      </div>
    </div>
  );

  const renderPreviewSection = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Preview */}
      <div className="lg:col-span-2">
        <Card className="glass border-white/20 bg-transparent">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Resume Preview</CardTitle>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="glass border-white/20 text-white hover:bg-white/10"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="glass border-white/20 text-white hover:bg-white/10"
                  onClick={() => setActiveSection("build")}
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-lg p-8 text-black min-h-[800px]">
              {/* Header */}
              <div className="text-center border-b border-gray-200 pb-6 mb-6">
                <div className="flex items-center justify-center space-x-6 mb-4">
                  <img
                    src={resumeData.personalInfo.profileImage}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
                  />
                  <div>
                    <h1 className="text-3xl font-bold">
                      {resumeData.personalInfo.firstName}{" "}
                      {resumeData.personalInfo.lastName}
                    </h1>
                    <div className="flex justify-center space-x-4 mt-2 text-gray-600 text-sm">
                      <span>{resumeData.personalInfo.email}</span>
                      <span>{resumeData.personalInfo.phone}</span>
                      <span>{resumeData.personalInfo.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3 text-gray-800 border-l-4 border-blue-500 pl-3">
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {resumeData.personalInfo.summary}
                </p>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  Professional Experience
                </h2>
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">
                          {exp.position}
                        </h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right text-gray-600 text-sm">
                        <p className="font-medium">
                          {exp.startDate} -{" "}
                          {exp.current ? "Present" : exp.endDate}
                        </p>
                        <p>{exp.location}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{exp.description}</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {exp.achievements
                        .filter((ach) => ach)
                        .map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                    </ul>
                    {exp.technologies.length > 0 && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  Education
                </h2>
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {edu.degree} in {edu.field}
                        </h3>
                        <p className="text-blue-600">{edu.institution}</p>
                        {edu.honors && (
                          <p className="text-gray-600 italic">{edu.honors}</p>
                        )}
                      </div>
                      <div className="text-right text-gray-600 text-sm">
                        <p>{edu.startDate} - {edu.endDate}</p>
                        {edu.gpa && <p>GPA: {edu.gpa}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Projects */}
              {resumeData.projects.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                    Projects
                  </h2>
                  {resumeData.projects.map((project) => (
                    <div key={project.id} className="mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800">
                          {project.name}
                        </h3>
                        {project.link && (
                          <a
                            href={project.link}
                            className="text-blue-600 text-sm hover:underline"
                          >
                            View Project
                          </a>
                        )}
                      </div>
                      <p className="text-gray-700 mb-2">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications */}
              {resumeData.certifications.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                    Certifications
                  </h2>
                  {resumeData.certifications.map((cert) => (
                    <div key={cert.id} className="mb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {cert.name}
                          </h3>
                          <p className="text-blue-600">{cert.issuer}</p>
                          {cert.credentialId && (
                            <p className="text-gray-600 text-sm">
                              ID: {cert.credentialId}
                            </p>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{cert.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  Technical Skills
                </h2>
                <div className="space-y-3">
                  {resumeData.skills.map((skillGroup) => (
                    <div key={skillGroup.id}>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {skillGroup.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Download Options */}
      <div className="space-y-6">
        <Card className="glass border-white/20 bg-transparent">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Download Options</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="w-full gradient-bg glow-effect text-white border-0"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full glass border-white/20 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Download DOCX
            </Button>
            <Button
              variant="outline"
              className="w-full glass border-white/20 text-white hover:bg-white/10"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
            </Button>
          </CardContent>
        </Card>

        <Card className="glass border-white/20 bg-transparent">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span>Final Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">97%</div>
              <p className="text-gray-400 mb-4">Resume Ready!</p>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                ATS Optimized
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/20 bg-transparent">
          <CardHeader>
            <CardTitle className="text-white">Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/cover-letter">
              <Button
                variant="outline"
                className="w-full glass border-white/20 text-white hover:bg-white/10"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Cover Letter
              </Button>
            </Link>
            <Link to="/job-match">
              <Button
                variant="outline"
                className="w-full glass border-white/20 text-white hover:bg-white/10"
              >
                <Target className="w-4 h-4 mr-2" />
                Analyze Job Match
              </Button>
            </Link>
            <Link to="/interview-prep">
              <Button
                variant="outline"
                className="w-full glass border-white/20 text-white hover:bg-white/10"
              >
                <Star className="w-4 h-4 mr-2" />
                Practice Interview
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case "upload":
        return renderUploadSection();
      case "build":
        return renderBuildSection();
      case "templates":
        return renderTemplatesSection();
      case "preview":
        return renderPreviewSection();
      default:
        return renderUploadSection();
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
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">
                Resume Builder
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="glass border-white/20 text-white hover:bg-white/10"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Navigation */}
      <div className="relative z-10 border-b border-white/10 glass">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-8 overflow-x-auto">
            {sectionNavigation.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeSection === section.id
                    ? "gradient-bg glow-effect text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {section.icon}
                <span>{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        {renderActiveSection()}
      </div>
    </div>
  );
}
