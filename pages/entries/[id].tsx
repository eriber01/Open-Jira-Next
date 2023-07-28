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
import { ChangeEvent, useState } from "react";
import { EntryStatus } from "@/interfaces/entries";


const EntryPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [status, setStatus] = useState<EntryStatus>('pending')
  const [touched, setTouched] = useState(false)

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setStatus(event.target.value as EntryStatus)
  }

  const onSave = () => {
    console.log({ inputValue, status });
  }
console.log(touched);


  return (
    <Layouts title=".........">
      <Grid
        container
        justifyContent={"center"}
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={8} md={6}
        >
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader={'Creada hace: .... minutos'}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva Entrada"
                autoFocus
                multiline
                label='Nueva Entrada'
                value={inputValue}
                onChange={onInputValueChanged}
                onBlur={() => setTouched(true)}
                helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
                
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={onStatusChanged}
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
                disabled={!inputValue.trim().length ? true : false}
                onClick={onSave}
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
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layouts>
  )
}


export default EntryPage