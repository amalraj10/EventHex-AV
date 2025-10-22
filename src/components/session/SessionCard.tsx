import { Session } from "@/types/session.types";
import Button from "@/components/common/Button";
import { STATUS_COLORS, STATUS_DOT_COLORS, STATUS_LABELS } from "@/constants/colors";

interface SessionCardProps {
  session: Session;
  onStartRecording: (sessionId: string) => void;
  onView: (sessionId: string) => void;
}

const SessionCard = ({
  session,
  onStartRecording,
  onView,
}: SessionCardProps) => {
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-12 gap-4 px-4 sm:px-6 py-5 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Session Info */}
      <div className="col-span-5 flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 mb-0.5 text-sm sm:text-base">
            {session.title}
          </h3>
          <p className="text-sm text-gray-500">{`${session.date} | ${session.time}`}</p>
        </div>
      </div>

      {/* Event Name */}
      <div className="col-span-3">
        <p className="text-gray-700 text-sm sm:text-base">
          <span className="sm:hidden font-medium">Event: </span>
          {session.eventName}
        </p>
      </div>

      {/* Status */}
      <div className="col-span-2">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${STATUS_COLORS[session.status]}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT_COLORS[session.status]}`}
          ></span>
          {STATUS_LABELS[session.status]}
        </span>
      </div>

      {/* Action Button */}
      <div className="col-span-2 w-full sm:w-auto flex sm:justify-end mt-2 sm:mt-0">
        {session.status === "pending" ? (
          <Button
            variant="primary"
            onClick={() => onStartRecording(session.id)}
            className="!rounded-lg !min-w-0 w-full sm:!w-36 !py-2 !px-3 !text-sm sm:!text-base whitespace-nowrap"
          >
            Start Recording
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={() => onView(session.id)}
            className="!rounded-lg !min-w-0 w-full sm:!w-36 !py-2 !px-3 !text-sm sm:!text-base whitespace-nowrap"
          >
            View
          </Button>
        )}
      </div>
    </div>
  );
};

export default SessionCard;