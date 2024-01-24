import { Task } from "@/models/tasks";
import { Button, Drawer, List, ListItemButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface TaskListDrawer {
  tasks: Task[];
  tournamentId: string;
}

export function TaskListDrawer({ tournamentId, tasks }: TaskListDrawer) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <Button onClick={() => setOpen((prev) => !prev)}>Tasks</Button>
      <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
        <List sx={{ minWidth: 320 }}>
          {tasks.map((task) => {
            const path = `/tournaments/${tournamentId}/arena/${task.id}`;

            return (
              <Link key={task.id} href={path}>
                <ListItemButton
                  selected={router.asPath == path}
                  onClick={() => setOpen(false)}
                >
                  {task.title}
                </ListItemButton>
              </Link>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
