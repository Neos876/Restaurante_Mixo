'use client'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from "axios"
import * as yup from 'yup'


const defaultValuesBooking = {
  date: '',
  email: '',
  name: '',
  surname: '',
  amount: '',
  telf: '', 
}


const BookingSistem = () => {
  const [open, setOpen] = useState(false)
  const today = new Date().toISOString().split('T')[0]
  const [showTimeFields, setShowTimeFields] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false)

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time)
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowTimeFields(true)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClickClose = () => {
    reset()
    setShowTimeFields(false)
    setOpen(false)
    setIsLoadingButton(false)
  }

  const onSubmit = async () => {
    setIsLoadingButton(true);
    try {
      const atributte = {
        date: controlBooking._formValues.date,
        email: controlBooking._formValues.email,
        name: controlBooking._formValues.name,
        surname: controlBooking._formValues.surname,
        amount: controlBooking._formValues.amount,
        telf: controlBooking._formValues.telf, 
      }
      const attributeString = JSON.stringify(atributte)
      console.log(attributeString)
      const response = await axios.get('/api/createBooking', {
        params: { attributeString: attributeString }
      })
      console.log(response)
      if (response.status === 200) {
        toast.success('Datos recibidos')
        handleClickClose()
      }
        
    } catch (err) {
      setIsLoadingButton(false);
      toast.error('Error al cargar los datos. Por favor, recarga la página o intenta de nuevo más tarde.');
    }
  }
  

  const schemaBooking = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    date: yup.string().required('El campo debe contener una fecha válida'),
    amount: yup.string().required(),
    email: yup.string().email().required(),
    telf: yup.string().required('El número de teléfono es obligatorio').min(8, 'El número de teléfono debe tener al menos 8 dígitos').max(9, 'El número de teléfono no puede tener más de 9 dígitos'),
  })

  const {
    control: controlBooking,
    handleSubmit: handleSubmitBooking,
    formState: { errors: bookingErrors },
    reset: reset
  } = useForm({
    defaultValues: defaultValuesBooking,
    mode: 'onBlur',
    resolver: yupResolver(schemaBooking)
  })

  return (
    <Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        sx={{
          textTransform: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50px', 
          width: '100px',
        }}
      >
        Reservar
      </Button>
      <Dialog open={open} onClose={handleClickClose} fullWidth>
      <form onSubmit={handleSubmitBooking(onSubmit)}>
          <DialogTitle sx={{fontWeight: 600, mt: 2, fontSize: 24, textAlign: 'center', mb: 2}}>
            Reserva
            <IconButton aria-label='close' onClick={handleClickClose} sx={{position: 'absolute', right: 8, top: 8}}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{textAlign: 'left', borderColor: 'primary'}}>
                    Nombre: <span style={{color: 'red'}}>*</span>
                  </Typography>
                  <FormControl fullWidth>
                    <Controller
                      name='name'
                      control={controlBooking}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField 
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          error={Boolean(bookingErrors.name)}
                          type='text'
                          fullWidth
                          variant='outlined'
                        />
                      )}
                    />
                    {bookingErrors.name && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        Este campo es obligatorio.
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{textAlign: 'left', borderColor: 'primary'}}>
                    Apellido: <span style={{color: 'red'}}>*</span>
                  </Typography>
                  <FormControl fullWidth>
                  <Controller
                    name='surname'
                    control={controlBooking}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={Boolean(bookingErrors.surname)}
                        type='text'
                        fullWidth
                        variant='outlined'
                      />
                    )}
                  />
                    {bookingErrors.surname && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        Este campo es obligatorio.
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} style={{zIndex: 2}}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', marginBottom:'10px' }}>
                    Fecha de Reserva: <span style={{color:'red'}}> * </span>
                  </Typography>
                  <FormControl fullWidth>
                    <Controller
                      name='date'
                      control={controlBooking}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          type='date'
                          value={value}
                          label=''
                          onChange={(event) => {
                            const inputEvent = event as React.ChangeEvent<HTMLInputElement>; // Conversión de tipo
                            onChange(inputEvent);
                            handleDateChange(inputEvent)
                          }}
                          onBlur={onBlur}
                          error={Boolean(bookingErrors.date)}
                          aria-describedby='stepper-linear-personal-last-name'
                          inputProps={{ min: today }}
                        />
                      )}
                    />
                      {showTimeFields && (
                        <>
                          <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', marginTop: '10px' }}>
                            Comida:
                          </Typography>
                          <div style={{ display: 'flex', marginTop: '5px' }}>
                            {[13, 14, 15, 16].map((hour) => (
                              <Button
                                key={hour}
                                variant={selectedTime === `${hour}:00` ? 'contained' : 'outlined'}
                                onClick={() => handleTimeSelection(`${hour}:00`)}
                                style={{ marginRight: '5px' }}
                              >
                                {`${hour}:00`}
                              </Button>
                            ))}
                          </div>
                          <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', marginTop: '10px' }}>
                            Cena:
                          </Typography>
                          <div style={{ display: 'flex', marginTop: '5px' }}>
                            {[20, 21, 22, 23].map((hour) => (
                              <Button
                                key={hour}
                                variant={selectedTime === `${hour}:00` ? 'contained' : 'outlined'}
                                onClick={() => handleTimeSelection(`${hour}:00`)}
                                style={{ marginRight: '5px' }}
                              >
                                {`${hour}:00`}
                              </Button>
                            ))}
                          </div>
                        </>
                      )}  
                    {bookingErrors.date && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        Este campo es obligatorio, seleccione una flecha.
                      </FormHelperText>
                    )}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', marginTop: '10px' }}>
                    Número de Personas:<span style={{color:'red'}}> * </span>
                  </Typography>
                  <FormControl fullWidth>
                  <Controller
                    name='amount'
                    control={controlBooking}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Select
                      value={value}
                      onChange={onChange}
                        onBlur={onBlur}
                        fullWidth
                        error={Boolean(bookingErrors.amount)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Número de Personas' }}
                      >
                        <MenuItem value=''>Seleccionar</MenuItem>
                        <MenuItem value='1'>1 persona</MenuItem>
                        <MenuItem value='2'>2 personas</MenuItem>
                        <MenuItem value='4'>4 personas</MenuItem>
                        <MenuItem value='6'>6 personas</MenuItem>
                        <MenuItem value='8'>8 personas</MenuItem>
                      </Select>
                    )}
                  />
                    {bookingErrors.amount && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        Este campo es obligatorio, seleccione una cantidad
                      </FormHelperText>
                    )}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{textAlign: 'left', borderColor: 'primary'}}>
                    Email: <span style={{color: 'red'}}>*</span>
                  </Typography>
                  <Controller
                        name='email'
                        control={controlBooking}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            type='text'
                            fullWidth
                            error={Boolean(bookingErrors.email)}
                            onBlur={onBlur}
                            variant='outlined'
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    {bookingErrors.email && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        Este campo es obligatorio, escriba un email válido.
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                <Typography sx={{textAlign: 'left', borderColor: 'primary'}}>
                    Numero de teléfono: <span style={{color: 'red'}}>*</span>
                  </Typography>
                  <FormControl fullWidth>
                    <Controller
                      name='telf'
                      control={controlBooking}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          error={Boolean(bookingErrors.telf)}
                          type='text'
                          fullWidth
                          variant='outlined'
                        />
                      )}
                    />
                    {bookingErrors.telf && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {bookingErrors.telf.message || 'Este campo es obligatorio.'}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button onClick={handleClickClose} color="error" sx={{borderColor: 'red', border: 1, mb: 2}}>
                  Cancelar
                </Button>
              </Grid>
              <Grid item>
              <Button type="submit" variant="contained" color='primary' disabled={isLoadingButton} onClick={handleSubmitBooking(onSubmit)}>
                {isLoadingButton ? <CircularProgress size={24} /> : 'Reservar'}
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
)
}

export default BookingSistem
