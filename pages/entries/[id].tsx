import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from "next";

import { Layouts } from "@/components/layouts"
import { validStatus } from "@/constants";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize
} from "@mui/material"
import { Entry, EntryStatus } from "@/interfaces/entries";
import { manageEntries } from "@/database";
import { entriesApi } from "@/apis";
import { useRouter } from "next/router";
import { EntriesContext } from "@/context/entries";
import { onMessage } from "@/utils/onMessage";
import { formatDate } from "@/utils/formatDate";


interface Props {
  entry: Entry
}
interface PropsInterface {
  inputValue: string
  status: EntryStatus
  touched: boolean
}


const EntryPage: FC<Props> = ({ entry }) => {
  const [state, setState] = useState<PropsInterface>({
    inputValue: entry.description || '',
    status: entry.status || 'pending',
    touched: false
  })

  const { refreshEntries, updateEntry } = useContext(EntriesContext)
  const { push } = useRouter()

  const isNotValid = useMemo(() => state.inputValue.length <= 0 && state.touched, [state.inputValue, state.touched])

  const onChangeState = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, path: string) => {
    setState(prev => ({
      ...prev,
      [path]: path === 'status' ? event.target.value as EntryStatus : event.target.value
    }))
  }

  const onSave = async () => {
    const payload: Entry = {
      _id: entry._id,
      description: state.inputValue,
      status: state.status,
      createdAt: entry.createdAt,
    }
    updateEntry(payload)
    onMessage({ message: 'Entrada Actualizada', type: 'success' })
    push('/')
  }

  const deleteEntry = async () => {
    await entriesApi.delete<Entry>(`/entries/${entry._id}`)
    refreshEntries()
    push('/')
    onMessage({ message: 'Entrada Borrada', type: 'success' })
  }

  return (
    <Layouts title={state.inputValue.substring(0, 20) + '...'}>
      <Grid
        container
        justifyContent={"center"}
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={8} md={6}
        >
          <Card>
            <CardHeader
              title={`Entrada: `}
              subheader={`Creada hace: ${formatDate(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva Entrada"
                autoFocus
                multiline
                label='Nueva Entrada'
                value={state.inputValue}
                onChange={(event) => onChangeState(event, 'inputValue')}
                onBlur={() => setState(prev => ({
                  ...prev,
                  touched: true
                }))}
                helperText={isNotValid && 'Ingrese un valor'}
                error={isNotValid}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup
                  row
                  value={state.status}
                  onChange={(event) => onChangeState(event, 'status')}
                >
                  {
                    validStatus.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={capitalize(option)}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>

            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                onClick={onSave}
                disabled={state.inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark'
        }}
        onClick={() => deleteEntry()}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layouts>
  )
};


export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { id } = params as { id: string }

  const entry = await manageEntries.getEntryById(id)

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}


export default EntryPage