import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "./ui/dialog";
import Image from "next/image";

interface profileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  role: string;
  image: string;
  description?: string;
}
const ProfileDialog = ({
  isOpen,
  onClose,
  name,
  role,
  image,
  description,
}: profileDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <h4 className="font-semibold text-lg text-primary">{role}</h4>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full sm:w-[350px] h-[300px] sm:h-auto">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
