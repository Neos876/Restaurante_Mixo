// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import StepperLinearWithValidationLow from 'src/views/forms/form-wizard/ContractFormLow'
import { useRouter } from 'next/router'

//FIX: Loader
const ContractViewLow = () => {
  const router = useRouter()
  const { id } = router.query
  const token = String(id)

  if (token == 'undefined') {
    return null
  }

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='DATOS DE BAJA' />
            <CardContent>
              <StepperLinearWithValidationLow token={token} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default ContractViewLow
