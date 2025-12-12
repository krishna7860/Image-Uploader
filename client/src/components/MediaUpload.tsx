import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Upload, 
  Check, 
  Trash2, 
  GripVertical, 
  Star, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  name: string;
}

interface MediaUploadProps {
  currentStep?: number;
  totalSteps?: number;
  onCancel?: () => void;
  onBack?: () => void;
  onNext?: (images: UploadedImage[], coverId: string | null) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export function MediaUpload({
  currentStep = 8,
  totalSteps = 9,
  onCancel,
  onBack,
  onNext,
}: MediaUploadProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [coverId, setCoverId] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, []);

  const validateFile = (file: File): boolean => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      return false;
    }
    return true;
  };

  const processFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(validateFile);

    const newImages: UploadedImage[] = validFiles.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages((prev) => {
      const updated = [...prev, ...newImages];
      if (updated.length > 0 && !coverId) {
        setCoverId(updated[0].id);
      }
      return updated;
    });
  }, [coverId]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
    e.target.value = "";
  };

  const handleDeleteImage = (id: string) => {
    const imageToDelete = images.find((img) => img.id === id);
    if (imageToDelete) {
      URL.revokeObjectURL(imageToDelete.preview);
    }
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      if (coverId === id && updated.length > 0) {
        setCoverId(updated[0].id);
      } else if (updated.length === 0) {
        setCoverId(null);
      }
      return updated;
    });
  };

  const handleDeleteAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    setCoverId(null);
  };

  const handleSetCover = (id: string) => {
    setCoverId(id);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleImageDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    setImages((prev) => {
      const updated = [...prev];
      const [removed] = updated.splice(draggedIndex, 1);
      updated.splice(index, 0, removed);
      setDraggedIndex(index);
      return updated;
    });
  };

  const handleNext = () => {
    onNext?.(images, coverId);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6" data-testid="media-upload-container">
      <div className="flex items-start justify-between mb-2 gap-4">
        <h1 className="text-xl font-bold text-foreground" data-testid="text-title">
          Media Upload
        </h1>
        <span className="text-sm text-primary whitespace-nowrap" data-testid="text-step-indicator">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      <p className="text-sm text-muted-foreground mb-6" data-testid="text-description">
        Add your property photos here. Please upload at least 5 images to give guests a good idea what your property is like!
      </p>

      {images.length > 0 && (
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm text-emerald-600 underline" data-testid="text-upload-count">
              {images.length} photo{images.length !== 1 ? "s" : ""} uploaded
            </span>
          </div>
          <button
            onClick={handleDeleteAll}
            className="flex items-center gap-1.5 text-sm text-destructive hover:text-destructive/80 transition-colors"
            data-testid="button-delete-all"
          >
            <Trash2 className="w-4 h-4" />
            Delete All
          </button>
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-lg p-8 mb-4 transition-colors
          flex flex-col items-center justify-center gap-2
          ${isDragOver 
            ? "border-primary bg-primary/5" 
            : "border-gray-300 dark:border-gray-600"
          }
        `}
        data-testid="dropzone"
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <Upload className="w-6 h-6 text-primary" />
        </div>
        <p className="text-sm text-foreground">
          Drag your file(s) or{" "}
          <button
            onClick={handleBrowseClick}
            className="text-primary hover:underline font-medium"
            data-testid="button-browse"
          >
            Browse
          </button>
        </p>
        <p className="text-xs text-muted-foreground">
          Max 10 MB files are allowed
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleFileChange}
          className="hidden"
          data-testid="input-file"
        />
      </div>

      <p className="text-sm text-muted-foreground text-center mb-6" data-testid="text-supported-formats">
        Only support .jpg, .png, .jpeg, .webp files
      </p>

      {images.length > 0 && (
        <div className="space-y-3 mb-8" data-testid="image-list">
          {images.map((image, index) => (
            <Card
              key={image.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleImageDragOver(e, index)}
              className={`
                p-4 flex items-center gap-4 cursor-move transition-opacity
                ${draggedIndex === index ? "opacity-50" : "opacity-100"}
              `}
              data-testid={`card-image-${image.id}`}
            >
              <div className="flex items-center gap-3 shrink-0">
                <GripVertical 
                  className="w-5 h-5 text-muted-foreground" 
                  data-testid={`icon-drag-handle-${image.id}`}
                />
                <span className="text-sm text-primary font-medium w-4 text-center">
                  {index + 1}
                </span>
              </div>

              <div className="w-20 h-14 rounded-md overflow-hidden shrink-0 border border-primary">
                <img
                  src={image.preview}
                  alt={image.name}
                  className="w-full h-full object-cover"
                  data-testid={`img-preview-${image.id}`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate" data-testid={`text-filename-${image.id}`}>
                  {image.name}
                </p>
                <p className="text-xs text-muted-foreground" data-testid={`text-image-count-${image.id}`}>
                  Image {index + 1} of {images.length}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {coverId === image.id ? (
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-1.5"
                    data-testid={`button-cover-${image.id}`}
                  >
                    <Star className="w-4 h-4" />
                    Cover
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetCover(image.id)}
                    className="gap-1.5"
                    data-testid={`button-set-cover-${image.id}`}
                  >
                    <Star className="w-4 h-4" />
                    Set as Cover
                  </Button>
                )}

                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="text-destructive hover:text-destructive/80 transition-colors p-1"
                  data-testid={`button-delete-${image.id}`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-4 pt-4 border-t flex-wrap">
        <Button
          variant="secondary"
          onClick={onCancel}
          className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700"
          data-testid="button-cancel"
        >
          Cancel
        </Button>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="gap-1"
            data-testid="button-back"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            variant="default"
            onClick={handleNext}
            className="gap-1 bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700"
            data-testid="button-next"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
