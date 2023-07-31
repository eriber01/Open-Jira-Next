import { ChangeEvent, FC, useMemo, useState } from "react";
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
import { EntryStatus } from "@/interfaces/entries";
import { isValidObjectId } from "mongoose";


interface Props {
  id: string
}
interface PropsInterface {
  inputValue: string
  status: EntryStatus
  touched: boolean
}

const initialState: PropsInterface = {
  inputValue: '',
  status: 'pending',
  touched: false
}

const EntryPage: FC<Props> = (props) => {
  const [state, setState] = useState(initialState)
  console.log({ props });

  const isNotValid = useMemo(() => state.inputValue.length <= 0 && state.touched, [state.inputValue, state.touched])

  const onChangeState = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, path: string) => {
    setState(prev => ({
      ...prev,
      [path]: path === 'status' ? event.target.value as EntryStatus : event.target.value
    }))
  }


  const onSave = () => {
    console.log({ inputValue: state.inputValue, status: state.status });
  }

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
              title={`Entrada: ${state.inputValue}`}
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
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layouts>
  )
};


export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { id } = params as { id: string }

  if (!isValidObjectId(id)) {
    console.log('No es un Id Valido');
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      id
    }
  }
}


export default EntryPage