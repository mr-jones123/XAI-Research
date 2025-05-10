import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog";
import Image from "next/image";

interface profileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  role: string;
  image: string;
  description?: string;
  linkedinURL: string;
  githubURL: string;
}
const ProfileDialog = ({
  isOpen,
  onClose,
  name,
  role,
  image,
  description,
  linkedinURL,
  githubURL,
}: profileDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden aspect-square">
        <div className="flex flex-col h-full">
          <div className="relative w-full h-1/2">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="flex-1 p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <h4 className="font-semibold text-lg text-primary">{role}</h4>
                <div className="flex gap-2 mt-2">
                  <a
                    href={linkedinURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/linkedin.svg"
                      alt="LinkedIn"
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </a>

                  <a href={githubURL} target="_blank" rel="noopener noreferrer">
                    <Image
                      src="/github.svg"
                      alt="GitHub"
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
