"use client";

import { useState } from "react";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog";

interface FeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
}

export default function FeedbackDialog({
  isOpen,
  onClose,
  onSubmit,
}: FeedbackDialogProps) {
  const [feedback, setFeedback] = useState<string>("");
}
