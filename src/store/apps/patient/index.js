import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// ** Axios Imports
import axios from 'axios'

// ** Fetch Patients
export const fetchData = createAsyncThunk('appPatients/fetchData', async params => {
  const response = await axios.get('/apps/users/list', {
    params
  })

  return response.data
})

// ** Add patient
export const addPatient = createAsyncThunk('appPatients/addPatient', async (data, { getState, dispatch }) => {
  const response = await axios.post('/apps/users/add-patient', {
    data
  })
  dispatch(fetchData(getState().patient.params))

  return response.data
  // console.log(data)
})

// ** Delete patient
export const deletePatient = createAsyncThunk('appPatients/deletePatient', async (id, { getState, dispatch }) => {
  const response = await axios.delete('/apps/users/delete', {
    data: id
  })
  dispatch(fetchData(getState().patient.params))

  return response.data
})

export const appPatientsSlice = createSlice({
  name: 'appPatients',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appPatientsSlice.reducer
