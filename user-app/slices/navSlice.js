import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  home: null,
  destination: null,
  kioskcenters: null,
  payment_id:null,
  points:100,
  streaks:0,
  stulog: false,
  challenge:21,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setHome(state, action) {
      state.home = action.payload;
    },
    setDestination(state, action) {
      state.destination = action.payload;
    },
    setKioskcenters(state, action) {
      state.kioskcenters = action.payload;
    },
    setPaymentID(state, action) {
      state.payment_id = action.payload;
    },
    setPoints(state, action) {
      state.points = action.payload;
    },
  
  setStreaks(state,action)
  {
    state.streaks=action.payload;
  },
  setStuLog(state, action)
  {
    state.stulog=action.payload;
  },
  setChallenge(state,action)
  {
    state.challenge=action.payload;
  }
  },
});

export const { setHome, setDestination, setKioskcenters,setPaymentID,setPoints,setStreaks,setStuLog,setChallenge} = navSlice.actions;
// Export the selectors
export const selectHome = (state) => state.nav.home;
export const selectDestination = (state) => state.nav.destination;
export const selectKioskcenters = (state) => state.nav.kioskcenters;
export const selectPaymentID = (state) => state.nav.payment_id;
export const selectPoints = (state) => state.nav.points;
export const selectStreaks = (state) => state.nav.streaks;
export const selectStuLog = (state) => state.nav.stulog;
export const selectChallenge = (state) => state.nav.challenge;
// Export the reducer as default
export default navSlice.reducer;
