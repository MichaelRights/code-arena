"use client";
import { Typography, Button, Box, SxProps } from "@mui/material";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className={styles.main}>
      <Typography variant="h4">Welcome to Code Arena!</Typography>
      <Typography variant="h5" my={2}>
        How would you like to get involved?
      </Typography>
      <Box my={2} display="flex" alignContent="center" alignItems="center">
        <Button
          onClick={() => router.push("/tournaments")}
          variant="contained"
          sx={joinBtn}
        >
          Participate
        </Button>
        <Typography variant="body1" px={1}>
          or
        </Typography>
        <Button variant="contained" sx={joinBtn}>
          Organize
        </Button>
      </Box>
    </main>
  );
}

const joinBtn: SxProps = {
  minWidth: 160,
};
