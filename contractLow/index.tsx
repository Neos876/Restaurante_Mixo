// ** React Imports
import { useState, useEffect, forwardRef, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'

// import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridRowId } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from 'src/store/apps/contract'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { ContractType } from 'src/types/apps/contractTypes'
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import TableHeader from 'src/views/apps/invoice/list/TableHeaderContract'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Link from 'next/link'
import { Button, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

interface CellType {
  row: ContractType
}

// ** renders client column
const renderClient = (row: ContractType) => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={(row.avatarColor as ThemeColor) || ('primary' as ThemeColor)}
        sx={{ mr: 3, fontSize: '1rem', width: 34, height: 34 }}
      >
        {getInitials(row.name || 'John Doe')}
      </CustomAvatar>
    )
  }
}

const renderEmployee = (row: ContractType) => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (

      <CustomAvatar
        skin='light'
        color={(row.avatarColor as ThemeColor) || ('primary' as ThemeColor)}
        sx={{ mr: 3, fontSize: '1rem', width: 34, height: 34 }}
      >
        {getInitials(row.employee || 'John Doe')}
      </CustomAvatar>

    )
  }
}

const defaultColumns = [
  {
    flex: 0.15,
    minWidth: 125,
    field: 'fecha',
    headerName: 'Fecha',
    renderCell: ({ row }: CellType) =>
      <Button component={Link} href={`/apps/manage/contract/${row.agreementToken}`}>
        <Tooltip title='Editar Contrato'>
          <Typography variant='body2'>{ format(new Date(row.issuedDate), 'dd-MM-yyyy')}</Typography>
        </Tooltip>
      </Button>
  },
  {
    flex: 0.15,
    minWidth: 480,
    field: 'balance',
    headerName: 'Contrato',
    renderCell: ({ row }: CellType) => {
      return row.balance !== 0 ? (
        <Box sx={{justifyContent: 'flex-start' }}>
          <Button component={Link} href={`/apps/manage/contract/${row.agreementToken}`}>
            <Tooltip title='Editar Contrato'>
              <Typography variant='body2' sx={{ color: 'text.primary', textTransform: 'none'  }}>
                {row.balance}
              </Typography>
            </Tooltip>
          </Button>
        </Box>
      ) : (
        <Button component={Link} href={`/apps/manage/contract/${row.agreementToken}`}>
          <Tooltip title='Editar Contrato'>
            <CustomChip size='small' skin='light' color='success' label='Paid' />
          </Tooltip>
        </Button>
      )
    }
  },
  {
    flex: 0.25,
    field: 'name',
    minWidth: 300,
    headerName: 'Empleador',
    renderCell: ({ row }: CellType) => {
      const { name } = row

      return (
        <Button component={Link} href={`/apps/manage/contract/${row.agreementToken}`}>
          <Tooltip title='Editar Contrato'>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {renderClient(row)}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  noWrap
                  variant='body2'
                  sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px', textTransform: 'none' }}
                >
                  {name}
                </Typography>
              </Box>
            </Box>
          </Tooltip>
        </Button>
      )
    }
  },
  {
    flex: 0.25,
    field: 'x',
    minWidth: 300,
    headerName: 'Trabajador/a',
    renderCell: ({ row }: CellType) => {
      const { employee } = row

      return (
        <Button component={Link} href={`/apps/manage/contract/${row.agreementToken}`}>
          <Tooltip title='Editar Contrato'>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {renderEmployee(row)}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  noWrap
                  variant='body2'
                  sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px', textTransform: 'none'}}
                >
                  {employee}
                </Typography>
              </Box>
            </Box>
          </Tooltip>
        </Button>
      )
    }
  },

]

/* eslint-disable */
const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const startDate = props.start !== null ? format(props.start, 'dd/MM/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'dd/MM/yyyy')}` : null

  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates

  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})
/* eslint-enable */

const ContractListLow = () => {
  // ** State
  const [dates, setDates] = useState<Date[]>([])
  const [value, setValue] = useState<string>('')
  const [enterValue, setEnterValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [statusValue, setStatusValue] = useState<string>('')
  const [endDateRange, setEndDateRange] = useState<DateType>(null)
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [startDateRange, setStartDateRange] = useState<DateType>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [filter, setFilter] = useState<boolean>(false)
  const [updateForce, setUpdateForce] = useState<boolean>(false)
  const prevStatus = useRef(statusValue)
  const prevEnterValue = useRef(enterValue)
  const prevDates = useRef(dates)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.contract)
  const router = useRouter()

  useEffect(() => {

    const tokenMatch = router.asPath.match(/\/client\/([^\/]*)\//)
    let tokenUrl = "" 
    if (tokenMatch) {
      const token = tokenMatch[1]
      if (token) {
        tokenUrl = token
      }
    }
    
    if (store.data.length == 0 || filter || enterValue || statusValue || dates.length > 0) {
      setFilter(true)
      setLoading(true)
      setUpdateForce(true)
    }

    if (Array.isArray(store.data) && store.data.length > 0) {
      const dateExpire = (store.data[0] as any)?.dateExpire
      const tokenUser = (store.data[0] as any)?.tokenUser
      
      if (tokenUser && tokenUser !== tokenUrl) {
        setFilter(true)
        setLoading(true)
      } else {
        const currentDate = new Date(new Date().getTime()).toLocaleString()
        if (tokenUser == tokenUrl && dateExpire > currentDate && updateForce == false) {      
          return
        } else {
          setLoading(true)
          setUpdateForce(false)
        }
      }
    }

    prevStatus.current = statusValue
    prevEnterValue.current = enterValue
    prevDates.current = dates

    dispatch(
      fetchData({
        status: statusValue,
        dates,
        q: enterValue
      })
    ).then(() => {
      if (prevStatus.current == statusValue && prevEnterValue.current == enterValue && prevDates.current == dates) {
        setLoading(false)
      }
    }).catch(() => {
      setLoading(false)
    })

    if (!enterValue && !statusValue && dates.length == 0) {
      setFilter(false)
      setUpdateForce(false)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, statusValue, enterValue, dates])

  const handleFilter = (val: string) => {
    setValue(val)
    if (!val) {
      setEnterValue('')
      setUpdateForce(true)
    }
  }

  const handleFilterEnter = (val: string) => {
    if (val == 'Enter') {
      setEnterValue(value)
      setUpdateForce(true)
    }
  }

  const handleStatusValue = (e: SelectChangeEvent) => {
    setStatusValue(e.target.value)
    setUpdateForce(true)
  }

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
      setUpdateForce(true)
    }
    setStartDateRange(start)
    setEndDateRange(end)
    setUpdateForce(true)
  }

  const columns = [
    ...defaultColumns,

    // {
    //   flex: 0.1,
    //   minWidth: 130,
    //   sortable: false,
    //   field: 'editar',
    //   headerName: 'Editar',
    //   renderCell: ({ row }: CellType) => (
    //     <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //       <Tooltip title='Editar'>
    //         <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/apps/manage/contract/${row.id}`}>
    //           <Icon icon='material-symbols:edit-document' />
    //         </IconButton>
    //       </Tooltip>
    //     </Box>
    //   )
    // }
  ]

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Filtros' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='invoice-status-select'>Tipos de contratos</InputLabel>

                    <Select
                      fullWidth
                      value={statusValue}
                      sx={{ mr: 4, mb: 2 }}
                      label='Tipos de contratos'
                      onChange={handleStatusValue}
                      labelId='invoice-status-select'
                    >
                      <MenuItem value=''>Todos</MenuItem>
                      <MenuItem value='icompleto'>Indefinido a tiempo completo</MenuItem>
                      <MenuItem value='iparcial'>Indefinido a tiempo parcial</MenuItem>
                      <MenuItem value='tcompleto'>De duración determinada a tiempo completo</MenuItem>
                      <MenuItem value='tparcial'>De duración determinada a tiempo parcial</MenuItem>
                      <MenuItem value='scompleto'>Sustitución a tiempo completo</MenuItem>
                      <MenuItem value='sparcial'>Sustitución a tiempo parcial</MenuItem>
                      <MenuItem value='tpcompleto'>Temporal por circunstancias de la producción a tiempo completo</MenuItem>
                      <MenuItem value='tpparcial'>Temporal por circunstancias de la producción a tiempo parcial</MenuItem>
                      <MenuItem value='incompleto'>Interinidad a tiempo completo</MenuItem>
                      <MenuItem value='inparcial'>Interinidad a tiempo parcial</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id='date-range-picker-months'
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput
                        dates={dates}
                        setDates={setDates}
                        label='Filtrar por fecha'
                        end={endDateRange as number | Date}
                        start={startDateRange as number | Date}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} selectedRows={selectedRows} handleFilterEnter={handleFilterEnter} handleFilter={handleFilter} />
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                <CircularProgress />
              </Box>
            ) : (
              <DataGrid
                autoHeight
                pagination
                rows={store.data}
                columns={columns}
                disableSelectionOnClick
                pageSize={Number(pageSize)}
                rowsPerPageOptions={[4, 10, 25]}
                onSelectionModelChange={rows => setSelectedRows(rows)}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                sx={{mx: 5, mb: 5}}
              />
            )}
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default ContractListLow
