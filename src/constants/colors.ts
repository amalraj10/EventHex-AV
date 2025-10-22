import { SessionStatus } from "@/types/session.types";

export const STATUS_COLORS: Record<SessionStatus, string> = {
  pending: "bg-orange-100 text-orange-600",
  processed: "bg-green-100 text-green-600",
  recording: "bg-red-100 text-red-600",
  checking: "bg-blue-100 text-blue-600",
};

export const STATUS_DOT_COLORS: Record<SessionStatus, string> = {
  pending: "bg-orange-600",
  processed: "bg-green-600",
  recording: "bg-red-600",
  checking: "bg-blue-600",
};

export const STATUS_LABELS: Record<SessionStatus, string> = {
  pending: "Pending",
  processed: "Processed",
  recording: "Recording",
  checking: "Checking",
};