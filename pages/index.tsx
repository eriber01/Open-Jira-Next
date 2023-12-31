import { NextPage } from 'next'
import { Grid, Card, CardHeader, CardContent } from "@mui/material";
import { Layouts } from '@/components/layouts'
import { EntryList, NewEntry } from '@/components/ui';

const HomePage: NextPage = () => {
  return (
    <>
      <Layouts title='Home - Open Jira'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 100px)' }}>
              <CardHeader title="Pendientes" />
              <NewEntry />
              <EntryList status='pending' />
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 100px)' }}>
              <CardHeader title="En Progreso" />
              <EntryList status='in-progress' />

            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 100px)' }}>
              <CardHeader title="Completadas" />
              <EntryList status='finished' />

            </Card>
          </Grid>
        </Grid>
      </Layouts>
    </>
  )
}

export default HomePage