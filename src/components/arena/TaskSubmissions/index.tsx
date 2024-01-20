import { useArenaStore } from "@/hooks/tournaments";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { TestResult } from "..";

interface TaskSubmissionsProps {
  tournamentId: string;
  taskId: number;
}
export function TaskSubmissions({
  tournamentId,
  taskId,
}: TaskSubmissionsProps) {
  const submitionResult = useArenaStore((state) => state.submitionResult);
  const executing = useArenaStore((state) => state.loadingSubmitionResult);

  if (!submitionResult || executing) {
    return (
      <Box height="calc(100% - 40px)" display="flex">
        <Typography
          width="100%"
          alignSelf="center"
          textAlign="center"
          variant="subtitle1"
        >
          {executing ? "Executing..." : "You didn't run the code yet"}
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" color={submitionResult.status.color}>
          {submitionResult.status.name}
        </Typography>
        <Typography variant="body2">
          {moment(submitionResult.date).format("MMMM Do YYYY, h:mm:ss a")}
        </Typography>
      </Box>
      {!!submitionResult.testCase && (
        <TestResult testCase={submitionResult.testCase} />
      )}
    </Box>
  );
}
