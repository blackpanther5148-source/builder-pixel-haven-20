import PlaceholderPage from "./PlaceholderPage";
import { FileText } from "lucide-react";

export default function ResumeBuilder() {
  return (
    <PlaceholderPage
      title="Resume Builder"
      description="AI-powered resume builder with drag-and-drop sections, live preview, and smart suggestions."
      icon={<FileText className="w-12 h-12 text-white" />}
    />
  );
}
