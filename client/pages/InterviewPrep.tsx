import { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Sparkles,
  Target,
  Play,
  Pause,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Clock,
  Brain,
  TrendingUp,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Zap,
  Book,
  Users,
  Award,
  Calendar,
  RefreshCw,
} from "lucide-react";

export default function InterviewPrep() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [confidenceScore, setConfidenceScore] = useState(75);
  const [toneScore, setToneScore] = useState(82);
  const [fillerWords, setFillerWords] = useState(12);

  const interviewTypes = [
    {
      id: "technical",
      name: "Technical Interview",
      description: "Coding problems and system design questions",
      duration: "45-60 min",
      difficulty: "Advanced",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      id: "behavioral",
      name: "Behavioral Interview",
      description: "Soft skills and past experience questions",
      duration: "30-45 min",
      difficulty: "Intermediate",
      icon: <Users className="w-6 h-6" />,
    },
    {
      id: "leadership",
      name: "Leadership Interview",
      description: "Management and decision-making scenarios",
      duration: "45-60 min",
      difficulty: "Advanced",
      icon: <Award className="w-6 h-6" />,
    },
  ];

  const questions = [
    {
      id: 1,
      type: "behavioral",
      question:
        "Tell me about a challenging project you worked on and how you overcame the obstacles.",
      category: "Problem Solving",
      difficulty: "Medium",
      timeLimit: 3,
    },
    {
      id: 2,
      type: "technical",
      question:
        "How would you design a scalable system to handle millions of users?",
      category: "System Design",
      difficulty: "Hard",
      timeLimit: 5,
    },
    {
      id: 3,
      type: "behavioral",
      question:
        "Describe a time when you had to work with a difficult team member.",
      category: "Teamwork",
      difficulty: "Medium",
      timeLimit: 3,
    },
  ];

  const practiceHistory = [
    {
      id: 1,
      type: "Technical Interview",
      date: "2024-01-15",
      score: 85,
      duration: "45 min",
      questions: 8,
      status: "completed",
    },
    {
      id: 2,
      type: "Behavioral Interview",
      date: "2024-01-10",
      score: 78,
      duration: "30 min",
      questions: 5,
      status: "completed",
    },
    {
      id: 3,
      type: "Leadership Interview",
      date: "2024-01-08",
      score: 72,
      duration: "60 min",
      questions: 10,
      status: "completed",
    },
  ];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setSessionTime((seconds) => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isActive) {
      setIsActive(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
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
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">
                Interview Prep
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              <CheckCircle className="w-3 h-3 mr-1" />3 Sessions Completed
            </Badge>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Interview Type Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Choose Interview Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {interviewTypes.map((type) => (
              <Card
                key={type.id}
                className="glass border-white/20 bg-transparent glow-hover cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center glow-effect">
                      {type.icon}
                    </div>
                    <Badge
                      className={`${
                        type.difficulty === "Advanced"
                          ? "bg-red-500/20 text-red-300 border-red-500/30"
                          : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                      }`}
                    >
                      {type.difficulty}
                    </Badge>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {type.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {type.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{type.duration}</span>
                    </span>
                  </div>
                  <Button className="w-full gradient-bg glow-effect text-white border-0">
                    <Play className="w-4 h-4 mr-2" />
                    Start Practice
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mock Interview Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Interview Panel */}
          <div className="lg:col-span-2">
            <Card className="glass border-white/20 bg-transparent">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Mock Interview</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      Question {currentQuestion + 1} of {questions.length}
                    </Badge>
                    <span className="text-white font-mono text-lg">
                      {formatTime(sessionTime)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Question */}
                <div className="p-6 glass rounded-xl border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {questions[currentQuestion].category}
                    </Badge>
                    <Badge
                      className={`${
                        questions[currentQuestion].difficulty === "Hard"
                          ? "bg-red-500/20 text-red-300 border-red-500/30"
                          : questions[currentQuestion].difficulty === "Medium"
                            ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                            : "bg-green-500/20 text-green-300 border-green-500/30"
                      }`}
                    >
                      {questions[currentQuestion].difficulty}
                    </Badge>
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2">
                    {questions[currentQuestion].question}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Recommended time: {questions[currentQuestion].timeLimit}{" "}
                    minutes
                  </p>
                </div>

                {/* Recording Controls */}
                <div className="flex items-center justify-center space-x-6 p-6 glass rounded-xl border border-white/10">
                  <Button
                    size="lg"
                    onClick={toggleRecording}
                    className={`w-16 h-16 rounded-full ${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "gradient-bg glow-effect text-white border-0"
                    }`}
                  >
                    {isRecording ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </Button>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      size="lg"
                      className={`glass border-white/20 text-white hover:bg-white/10 ${
                        isRecording ? "bg-red-500/20 border-red-500/30" : ""
                      }`}
                    >
                      {isRecording ? (
                        <Mic className="w-5 h-5" />
                      ) : (
                        <MicOff className="w-5 h-5" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className={`glass border-white/20 text-white hover:bg-white/10 ${
                        isSpeaking ? "bg-blue-500/20 border-blue-500/30" : ""
                      }`}
                      onClick={() => setIsSpeaking(!isSpeaking)}
                    >
                      {isSpeaking ? (
                        <Volume2 className="w-5 h-5" />
                      ) : (
                        <VolumeX className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    className="glass border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
                  >
                    Previous Question
                  </Button>
                  <Button
                    onClick={nextQuestion}
                    disabled={currentQuestion === questions.length - 1}
                    className="gradient-bg glow-effect text-white border-0 disabled:opacity-50"
                  >
                    Next Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Panel */}
          <div className="space-y-6">
            {/* Real-time Feedback */}
            <Card className="glass border-white/20 bg-transparent">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Live Feedback</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Confidence</span>
                    <span className="text-white">{confidenceScore}%</span>
                  </div>
                  <Progress value={confidenceScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Tone Quality</span>
                    <span className="text-white">{toneScore}%</span>
                  </div>
                  <Progress value={toneScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Filler Words</span>
                    <span className="text-red-300">{fillerWords}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    "um", "uh", "like" detected
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="glass border-white/20 bg-transparent">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span>Quick Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">
                    Use the STAR method for behavioral questions
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">
                    Speak clearly and at a moderate pace
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">
                    Reduce filler words like "um" and "uh"
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Practice History */}
        <Card className="glass border-white/20 bg-transparent">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Book className="w-5 h-5" />
              <span>Practice History</span>
            </CardTitle>
            <CardDescription className="text-gray-300">
              Track your progress and see improvement over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {practiceHistory.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 glass rounded-lg border border-white/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{session.type}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(session.date).toLocaleDateString()}
                          </span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{session.duration}</span>
                        </span>
                        <span>{session.questions} questions</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold gradient-text">
                        {session.score}%
                      </div>
                      <div className="text-sm text-gray-400">Score</div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass border-white/20 text-white hover:bg-white/10"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Retry
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
