import { Inter } from "next/font/google";
import Typography from '@mui/material/Typography'
import { Layout } from "@/components/layouts";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
      <Layout>
        	<Typography variant="h1" component="h1" sx={{ fontFamily: inter }}>
        Welcome to Board Jira
      </Typography>                   
      </Layout>
  )
}
