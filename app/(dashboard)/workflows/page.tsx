"use client";

import GetWorkflowsForUser from "@/actions/workflows/getWorkflowsForUser";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

const WorkflowPage = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
      </div>

      <div className="h-full py-6">
        <UserWorkflows />
      </div>
    </div>
  );
};

const UserWorkflows = () => {
  const [workflows, setWorkflows] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetWorkflowsForUser();
        setWorkflows(data);
      } catch (error) {
        console.error("Error fetching workflows:", error);
        setWorkflows([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <UserWorkflowsSkeleton />;
  }

  if (!workflows || workflows.length === 0) {
    return (
      <Alert variant={"destructive"} className="flex items-center">
        <AlertCircle className="w-4 h-4 !left-0 !top-0 !relative" />
        <AlertTitle>No workflows found</AlertTitle>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {workflows.map((workflow, index) => (
        <div
          key={index}
          className="p-4 border rounded-md shadow-sm bg-background"
        >
          <h3 className="text-lg font-semibold">{workflow.name}</h3>
          <p className="text-muted-foreground">{workflow.description}</p>
        </div>
      ))}
    </div>
  );
};

const UserWorkflowsSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  );
};

export default WorkflowPage;
