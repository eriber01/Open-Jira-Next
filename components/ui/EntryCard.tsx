import { FC, DragEvent, useContext } from 'react';
import { useRouter } from 'next/router';
import { Entry } from '@/interfaces/entries';
import { UiContext } from '@/context/ui';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions
} from '@mui/material';

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { push } = useRouter()
  const { setIsDragging } = useContext(UiContext)

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', entry._id)
    setIsDragging(true)
  }  

  const onDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      //eventos del drag
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={()=> push(`/entries/${entry._id}`)      }
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>Hace 30 Minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
};
