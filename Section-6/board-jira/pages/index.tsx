
import { Card, CardHeader, Grid } from "@mui/material";
import { Inter } from "next/font/google";
import { EntryList, NewEntry } from "../components/ui";
import { Layout } from "../components/layouts";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  
  return (
    <Layout title="Home - Board Jira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pendientes"></CardHeader>

            {/* Agregar una nueva entrada */}
            {/* Listado de las entradas */}
            <NewEntry/>
            <EntryList status='pending' />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="En Progreso"></CardHeader>
            <EntryList status='in-progress' />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Completadas"></CardHeader>
            <EntryList status='finished' />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
