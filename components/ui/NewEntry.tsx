import { ChangeEvent, useState, useContext } from 'react';
import { EntriesContext } from '@/context/entries';
import { Button, Box, TextField, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { UiContext } from '@/context/ui';

export const NewEntry = () => {

  const { addNewEntry } = useContext(EntriesContext)
  const { setIsAddingEntry, isAddingEntry } = useContext(UiContext)

  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onSave = async () => {
    if (inputValue.length === 0) return;

    addNewEntry(inputValue)
    setIsAddingEntry(false)
    setInputValue('')
    setTouched(false)
  }

  return (
    <Box sx={{ paddingX: 2 }}>

      {

        isAddingEntry ?

          <>
            <TextField
              fullWidth
              sx={{ marginTop: 2, marginBottom: 1 }}
              placeholder='Nueva Entrada'
              autoFocus
              multiline
              label='Nueva entrada'
              helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
              value={inputValue}
              error={inputValue.length <= 0 && touched}
              onChange={onTextFieldChanged}
              onBlur={() => setTouched(true)}
            />
            <Box padding={1} display={'flex'} justifyContent={'space-between'}>
              <Button
                variant='text'
                onClick={() => setIsAddingEntry(false)}
              >
                Cancelar
              </Button>

              <Button
                variant='outlined'
                color='secondary'
                endIcon={<SaveOutlinedIcon />}
                onClick={() => onSave()}
                disabled={inputValue.length ? false : true}
              >
                Guardar
              </Button>
            </Box>
          </> :

          <Button
            startIcon={<AddCircleOutlineOutlinedIcon />}
            fullWidth
            variant='outlined'
            onClick={() => setIsAddingEntry(true)}
          >
            Agregar Tarea
          </Button>

      }



    </Box>

  )
}
