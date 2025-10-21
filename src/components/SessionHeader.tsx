import { ChevronDown } from "lucide-react";

interface SessionHeaderProps {
  title: string;
  date: string;
  time: string;
}

const SessionHeader = ({ title, date, time }: SessionHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-foreground mb-2">{title}</h1>
      <p className="text-muted-foreground">
        {date} | {time}
      </p>
      <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-lg border border-border">
        <span className="text-sm text-foreground">English</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
};

export default SessionHeader;
