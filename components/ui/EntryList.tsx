import { FC, useContext, useMemo, DragEvent } from 'react';
import { Paper, List } from "@mui/material";
import { EntryCard } from "./";
import { EntryStatus } from "@/interfaces/entries";
import { EntriesContext } from "@/context/entries";
import { UiContext } from '@/context/ui';
import style from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries, updateEntry } = useContext(EntriesContext)
  const { isDragging, setIsDragging } = useContext(UiContext)

  const entriesFilter = useMemo(() => entries.filter(item => item.status === status), [entries, status])

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text')
    console.log(id);
    const entry = entries.find(item => item._id === id)!
    console.log(entry);
    entry.status = status
    updateEntry(entry)
    setIsDragging(false)
  }

  return (
    //aqui se hara el drop
    <div
      onDrop={onDrop}
      onDragOver={allowDrop}
      className={isDragging ? style.dragging : ''}
    >
      <Paper sx={{
        height: 'calc(100vh - 180px)',
        overflow: 'auto',
        backgroundColor: 'transparent',
        padding: '1px 4px',
      }}>
        {/*cambiara si se esta haciendo drap o no*/}
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
          {
            entriesFilter.map(item => (
              <EntryCard key={item._id} entry={item} />
            ))
          }
        </List>
      </Paper>
    </div>
  )
}
