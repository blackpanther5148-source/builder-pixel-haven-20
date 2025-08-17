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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  CreditCard,
  Download,
  Upload,
  Trash2,
  Edit3,
  Save,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Link as LinkIcon,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Crown,
  Star,
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  const settingsTabs = [
    { id: "profile", name: "Profile", icon: <User className="w-5 h-5" /> },
    {
      id: "notifications",
      name: "Notifications",
      icon: <Bell className="w-5 h-5" />,
    },
    {
      id: "privacy",
      name: "Privacy & Security",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: "billing",
      name: "Billing & Plan",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "data",
      name: "Data Management",
      icon: <Download className="w-5 h-5" />,
    },
  ];

  const socialLinks = [
    {
      platform: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://linkedin.com/in/johndoe",
      connected: true,
    },
    {
      platform: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/johndoe",
      connected: true,
    },
    {
      platform: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      url: "",
      connected: false,
    },
    {
      platform: "Portfolio",
      icon: <Globe className="w-5 h-5" />,
      url: "https://johndoe.dev",
      connected: true,
    },
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card className="glass border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Basic Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="glass border-white/20 text-white hover:bg-white/10"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="glass border-white/20 text-white hover:bg-white/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">
                First Name
              </label>
              <Input
                defaultValue="John"
                className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">
                Last Name
              </label>
              <Input
                defaultValue="Smith"
                className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Email</label>
            <Input
              defaultValue="john.smith@email.com"
              type="email"
              className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Phone</label>
              <Input
                defaultValue="+1 (555) 123-4567"
                className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">
                Location
              </label>
              <Input
                defaultValue="San Francisco, CA"
                className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Professional Summary
            </label>
            <Textarea
              defaultValue="Experienced software engineer with 5+ years in full-stack development. Passionate about creating scalable web applications and leading technical teams."
              className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="glass border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <LinkIcon className="w-5 h-5" />
            <span>Social Links</span>
          </CardTitle>
          <CardDescription className="text-gray-300">
            Connect your professional profiles to enhance your applications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {socialLinks.map((link, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 glass rounded-lg border border-white/10"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                {link.icon}
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">{link.platform}</div>
                <Input
                  defaultValue={link.url}
                  placeholder={`https://${link.platform.toLowerCase()}.com/username`}
                  className="mt-2 glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                {link.connected && (
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="glass border-white/20 text-white hover:bg-white/10"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="gradient-bg glow-effect text-white border-0">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <Card className="glass border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notification Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Email Notifications</div>
              <div className="text-gray-400 text-sm">
                Receive updates via email
              </div>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Push Notifications</div>
              <div className="text-gray-400 text-sm">
                Browser and mobile notifications
              </div>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Job Alerts</div>
              <div className="text-gray-400 text-sm">
                Get notified about matching jobs
              </div>
            </div>
            <Switch checked={jobAlerts} onCheckedChange={setJobAlerts} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">
                Weekly Progress Report
              </div>
              <div className="text-gray-400 text-sm">
                Weekly summary of your activity
              </div>
            </div>
            <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Dark Mode</div>
              <div className="text-gray-400 text-sm">
                Toggle dark/light theme
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-gray-400" />
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              <Moon className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <Card className="glass border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Password & Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">
              Current Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500 pr-10"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              New Password
            </label>
            <Input
              type="password"
              placeholder="Enter new password"
              className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Confirm New Password
            </label>
            <Input
              type="password"
              placeholder="Confirm new password"
              className="glass border-white/20 text-white placeholder-gray-400 focus:ring-purple-500"
            />
          </div>

          <Button className="gradient-bg glow-effect text-white border-0">
            Update Password
          </Button>
        </CardContent>
      </Card>

      <Card className="glass border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="text-white">
            Two-Factor Authentication
          </CardTitle>
          <CardDescription className="text-gray-300">
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Enable 2FA</div>
              <div className="text-gray-400 text-sm">
                Secure your account with SMS or authenticator app
              </div>
            </div>
            <Button
              variant="outline"
              className="glass border-white/20 text-white hover:bg-white/10"
            >
              Setup 2FA
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <Card className="glass border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span>Current Plan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-2xl font-bold gradient-text">Pro Plan</div>
              <div className="text-gray-400">
                $9.99/month • Renews on Jan 25, 2024
              </div>
            </div>
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
              <Star className="w-3 h-3 mr-1" />
              Active
            </Badge>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Unlimited resumes and cover letters</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>AI-powered content optimization</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Premium templates and designs</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Interview preparation tools</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="glass border-white/20 text-white hover:bg-white/10"
            >
              Change Plan
            </Button>
            <Button
              variant="outline"
              className="glass border-white/20 text-white hover:bg-white/10"
            >
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="text-white">Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 glass rounded-lg border border-white/10">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-medium">
                  •••• •••• •••• 4242
                </div>
                <div className="text-gray-400 text-sm">Expires 12/25</div>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="glass border-white/20 text-white hover:bg-white/10"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="text-white">Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "Jan 25, 2024", amount: "$9.99", status: "Paid" },
              { date: "Dec 25, 2023", amount: "$9.99", status: "Paid" },
              { date: "Nov 25, 2023", amount: "$9.99", status: "Paid" },
            ].map((invoice, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 glass rounded-lg border border-white/10"
              >
                <div>
                  <div className="text-white font-medium">
                    ${invoice.amount}
                  </div>
                  <div className="text-gray-400 text-sm">{invoice.date}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    {invoice.status}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="glass border-white/20 text-white hover:bg-white/10"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDataTab = () => (
    <div className="space-y-6">
      <Card className="glass border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export Data</span>
          </CardTitle>
          <CardDescription className="text-gray-300">
            Download your data in various formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full glass border-white/20 text-white hover:bg-white/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Export All Resumes (PDF)
          </Button>
          <Button
            variant="outline"
            className="w-full glass border-white/20 text-white hover:bg-white/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Cover Letters (DOCX)
          </Button>
          <Button
            variant="outline"
            className="w-full glass border-white/20 text-white hover:bg-white/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Application Data (JSON)
          </Button>
        </CardContent>
      </Card>

      <Card className="glass border-white/20 bg-transparent border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Danger Zone</span>
          </CardTitle>
          <CardDescription className="text-gray-300">
            Irreversible actions that will permanently affect your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="text-red-300 font-medium mb-2">Delete Account</div>
            <div className="text-gray-400 text-sm mb-4">
              This will permanently delete your account and all associated data.
              This action cannot be undone.
            </div>
            <Button
              variant="outline"
              className="border-red-500/30 text-red-300 hover:bg-red-500/20"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "notifications":
        return renderNotificationsTab();
      case "privacy":
        return renderPrivacyTab();
      case "billing":
        return renderBillingTab();
      case "data":
        return renderDataTab();
      default:
        return renderProfileTab();
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
              <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-slate-500 rounded-lg flex items-center justify-center">
                <SettingsIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Settings</span>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64">
            <Card className="glass border-white/20 bg-transparent">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {settingsTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? "gradient-bg glow-effect text-white"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">{renderActiveTab()}</main>
        </div>
      </div>
    </div>
  );
}
