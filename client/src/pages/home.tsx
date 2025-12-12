import { MediaUpload } from "@/components/MediaUpload";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();

  const handleCancel = () => {
    toast({
      title: "Cancelled",
      description: "Upload cancelled",
    });
  };

  const handleBack = () => {
    toast({
      title: "Back",
      description: "Going back to previous step",
    });
  };

  const handleNext = (images: any[], coverId: string | null) => {
    toast({
      title: "Next",
      description: `Proceeding with ${images.length} images. Cover: ${coverId ? "set" : "not set"}`,
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <MediaUpload
        currentStep={8}
        totalSteps={9}
        onCancel={handleCancel}
        onBack={handleBack}
        onNext={handleNext}
      />
    </div>
  );
}
