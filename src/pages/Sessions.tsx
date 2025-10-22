import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Calendar } from "lucide-react";
import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import SessionTable from "@/components/session/SessionTable";
import { sessions } from "@/data/sessions";
import { ROUTES } from "@/constants/routes";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

const Sessions = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleStartRecording = (sessionId: string) => {
    navigate(ROUTES.LIVE_SESSION(sessionId));
  };

  const handleView = (sessionId: string) => {
    navigate(ROUTES.SESSION_VIEW(sessionId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <PageContainer>
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
              Assigned Sessions
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Manage and monitor your active recording sessions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 !py-2" // Only add left padding for icon and adjust height
              />
            </div>

            {/* Filter */}
            <Button
              size="sm"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center sm:justify-start"
            >
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 text-sm sm:text-base">Filter</span>
            </Button>

            {/* Sort by */}
            <Button
              size="sm"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center sm:justify-start"
            >
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 text-sm sm:text-base">
                Sort by
              </span>
            </Button>
          </div>
        </div>

        {/* Session Table */}
        <SessionTable
          sessions={sessions}
          onStartRecording={handleStartRecording}
          onView={handleView}
        />
      </PageContainer>
    </div>
  );
};

export default Sessions;
