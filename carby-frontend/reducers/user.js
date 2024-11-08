import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    username: null,
    _id: null,
    profile: null,
    tasks: [],
    xp: 0,
    lvl: 1,
    skins: [],
    imgProfil: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value._id = action.payload._id;
      state.value.lvl = action.payload.lvl;
      state.value.xp = action.payload.xp;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value._id = null;
      state.value.profile = null;
      state.value.tasks = [];
    },
    addLvl: (state, action) => {
      state.value.lvl += action.payload;
    },
    removeLvl: (state, action) => {
      state.value.lvl -= action.payload;
    },
    addXp: (state, action) => {
      state.value.xp += action.payload;
    },
    removeXp: (state, action) => {
      state.value.xp -= action.payload;
    },
    resetPreviousXp: (state, action) => {
      state.value.xp = action.payload;
    },
    resetXp: (state) => {
      state.value.xp = 0;
    },
    addSkin: (state, action) => {
      state.value.skins = action.payload;
    },
    removeSkin: (state, action) => {
      state.value.skins = action.payload;
    },
    addImgProfil: (state, action) => {
      state.value.imgProfil = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setProfile,
  setTasks,
  addLvl,
  removeLvl,
  addXp,
  removeXp,
  resetPreviousXp,
  resetXp,
  addSkin,
  removeSkin,
  addImgProfil,
} = userSlice.actions;
export default userSlice.reducer;
