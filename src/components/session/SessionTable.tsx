import { Session } from "@/types/session.types";
import SessionCard from "./SessionCard";

interface SessionTableProps {
  sessions: Session[];
  onStartRecording: (sessionId: string) => void;
  onView: (sessionId: string) => void;
}

const SessionTable = ({
  sessions,
  onStartRecording,
  onView,
}: SessionTableProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Table Header (Hidden on Mobile) */}
      <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="col-span-5 text-sm font-medium text-gray-700">
          Session
        </div>
        <div className="col-span-3 text-sm font-medium text-gray-700">
          Event Name
        </div>
        <div className="col-span-2 text-sm font-medium text-gray-700">
          Status
        </div>
        <div className="col-span-2"></div>
      </div>

      {/* Table Rows / Cards */}
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          onStartRecording={onStartRecording}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default SessionTable;