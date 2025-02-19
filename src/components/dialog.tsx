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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative w-full h-64">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div>
            <h4 className="font-semibold">{role}</h4>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
