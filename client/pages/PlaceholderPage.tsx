import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Sparkles, Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function PlaceholderPage({
  title,
  description,
  icon = <Construction className="w-12 h-12" />,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-gradient-wave" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-gradient-wave animation-delay-2000" />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 border-b border-white/10 glass">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Profyle</span>
          </Link>

          <Link to="/dashboard">
            <Button
              variant="outline"
              className="glass border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 max-w-md mx-auto px-4">
        <Card className="glass border-white/20 bg-transparent text-center">
          <CardHeader>
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center glow-effect">
              {icon}
            </div>
            <CardTitle className="text-2xl text-white">{title}</CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400">
              This feature is coming soon! We're working hard to bring you the
              best AI-powered career tools.
            </p>
            <div className="space-y-2">
              <Link to="/dashboard">
                <Button className="w-full gradient-bg glow-effect text-white border-0">
                  Return to Dashboard
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  className="w-full glass border-white/20 text-white hover:bg-white/10"
                >
                  Go to Homepage
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
