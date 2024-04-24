import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    weatherData: null, 
    status: 'idle', 
    error: null, 
  };


const WEATHER_API_KEY = '6edb4b308443e3bd6d906ed6d93764fa';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;


export const WeatherFetchData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}?q=${city}&appid=${WEATHER_API_KEY}` 
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); 
      } else {
        return rejectWithValue({ message: 'Network or server error' }); 
      }
    }
  }
);



const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {}, // No additional reducers for now
  extraReducers: (builder) => {
    builder
      .addCase(WeatherFetchData.pending, (state) => {
        state.status = 'loading'; // Indicate data is being fetched
        state.error = null; // Clear previous errors
      })
      .addCase(WeatherFetchData.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Fetching succeeded
        state.weatherData = action.payload; // Store the fetched weather data
      })
      .addCase(WeatherFetchData.rejected, (state, action) => {
        state.status = 'failed'; // Fetching failed
        state.error = action.payload.message || 'Unknown error occurred'; // Store the error message
      });
  },
});

export default weatherSlice.reducer; // Export the reducer to be added to the Redux store
export const getCityNames = (state) => state.weather.weatherData;
export const getWeatherStatus = (state) => state.weather.status; // Selector for Redux status
