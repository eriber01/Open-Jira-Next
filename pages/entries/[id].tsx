import { Layouts } from "@/components/layouts"
import { validStatus } from "@/constants";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
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
  Radio,
  RadioGroup,
  TextField,
  capitalize
} from "@mui/material"


const EntryPage = () => {

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
              title="Entrada:"
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
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup
                  row
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
              // fullWidth
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layouts>
  )
}


export default EntryPage