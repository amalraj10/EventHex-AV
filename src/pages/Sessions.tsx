import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowUpDown, Grid2X2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { sessions } from "@/data/sessions";

const Sessions = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: string) => {
    if (status === "pending") {
      return (
        <Badge variant="secondary" className="bg-warning/10 text-warning hover:bg-warning/20 border-0">
          <span className="w-2 h-2 rounded-full bg-warning mr-1.5" />
          Pending
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20 border-0">
        <span className="w-2 h-2 rounded-full bg-success mr-1.5" />
        Processed
      </Badge>
    );
  };

  const handleStartRecording = (sessionId: string) => {
    navigate(`/session/${sessionId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Assigned Sessions
          </h1>
          <p className="text-muted-foreground">
            Manage and monitor your active recording sessions.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="default">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="default">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Sort by
          </Button>
        </div>

        {/* Sessions Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-muted/30 border-b border-border text-sm font-medium text-muted-foreground">
            <div className="col-span-5">Session</div>
            <div className="col-span-3">Event Name</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2"></div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-border">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-accent/50 transition-colors"
              >
                <div className="col-span-5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Grid2X2 className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      {session.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {session.date} | {session.time}
                    </p>
                  </div>
                </div>

                <div className="col-span-3">
                  <span className="text-foreground">{session.eventName}</span>
                </div>

                <div className="col-span-2">
                  {getStatusBadge(session.status)}
                </div>

                <div className="col-span-2 flex justify-end">
                  {session.status === "pending" ? (
                    <Button
                      onClick={() => handleStartRecording(session.id)}
                      className="font-medium"
                    >
                      Start Recording
                    </Button>
                  ) : (
                    <Button variant="ghost" className="text-primary">
                      View
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sessions;
