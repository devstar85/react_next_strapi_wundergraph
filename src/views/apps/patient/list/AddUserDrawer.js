// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { Checkbox } from '@mui/material'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addPatient } from 'src/store/apps/patient'

import { useMutation } from 'src/hooks/useWundergraph'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  username: yup.string().required(),
  country: yup.string().required(),
  origin: yup.string().required(),

})

const defaultValues = {
  username: '',
  origin: '',
  weightSegment: '',
  ageSegment: '',
  diet: '',
  ethnicity: '',
  country: '',
  PCP: '',
  sleep: false
}

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')
  const [creatorId, setCreatorId] = useState('')

  // ** Hooks
  const dispatch = useDispatch()

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const { mutate } = useMutation({
    operationName: 'CreatePatient'
  })
  useEffect(()=>{
    setCreatorId(JSON.parse(window.localStorage.getItem('userData'))?.id)
  },[])
  

  const onSubmit = data => {
    // dispatch(addPatient({ ...data}))
    mutate({
      ...data, creatorId
    })

    toggle()
    reset()
  }

  const handleClose = () => {
    setPlan('basic')
    setRole('subscriber')
    setValue('contact', Number(''))
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add User</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='username'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='User Name'
                  onChange={onChange}
                  placeholder='JohnDoe'
                  error={Boolean(errors.username)}
                />
              )}
            />
            {errors.username && <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='origin'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Origin'
                  onChange={onChange}
                  placeholder='origin'
                  error={Boolean(errors.origin)}
                />
              )}
            />
            {errors.origin && <FormHelperText sx={{ color: 'error.main' }}>{errors.origin.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='weightSegment'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Weight'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.weightSegment)}
                />
              )}
            />
            {errors.weightSegment && <FormHelperText sx={{ color: 'error.main' }}>{errors.seightSegment.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='ageSegment'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Age'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.ageSegment)}
                />
              )}
            />
            {errors.ageSegment && <FormHelperText sx={{ color: 'error.main' }}>{errors.ageSegment.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='diet'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Diet'
                  onChange={onChange}
                  placeholder='Australia'
                  error={Boolean(errors.diet)}
                />
              )}
            />
            {errors.diet && <FormHelperText sx={{ color: 'error.main' }}>{errors.diet.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='ethnicity'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Ethnicity'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.ethnicity)}
                />
              )}
            />
            {errors.ethnicity && <FormHelperText sx={{ color: 'error.main' }}>{errors.ethnicity.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='country'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Country'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.country)}
                />
              )}
            />
            {errors.country && <FormHelperText sx={{ color: 'error.main' }}>{errors.country.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='PCP'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='PCP'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.PCP)}
                />
              )}
            />
            {errors.PCP && <FormHelperText sx={{ color: 'error.main' }}>{errors.PCP.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='sleep'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  value={value}
                  label='Sleep'
                  onChange={onChange}

                  error={Boolean(errors.PCP)}
                />
              )}
            />
            {errors.sleep && <FormHelperText sx={{ color: 'error.main' }}>{errors.sleep.message}</FormHelperText>}
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
