import { ChevronDown, Languages } from "lucide-react";
import { SessionHeaderProps } from "@/types/session.types";

const SessionHeader = ({ title, date, time }: SessionHeaderProps) => {
  return (
    <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          {date} | {time}
        </p>
      </div>

      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
        <Languages className="w-4 h-4 text-gray-600" />
        <span className="text-sm text-gray-700 font-medium">English</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};

export default SessionHeader;