import { Gender } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { ReadUserPreferencesSchemaType } from "@/schemas/UserPreferences";

export interface UserSlice {
  preferences?: ReadUserPreferencesSchemaType;
  isAuthed: boolean;
  isActive: boolean;
  notifications: number;
  username?: string;
  circles?: ReadCircleSchemaType[];
  userSex?: Gender;
  userId?: string;
}

const initialState: UserSlice = {
  preferences: undefined,
  isAuthed: false,
  isActive: false,
  notifications: 0,
  username: undefined,
  userSex: undefined,
  userId: undefined,
  circles: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserSlice | undefined>) {
      state.preferences = action.payload?.preferences;
      state.isAuthed = !!action.payload?.isAuthed;
      state.isActive = !!action.payload?.isActive;
      state.notifications = action.payload?.notifications ?? 0;
      state.username = action.payload?.username;
      state.circles = action.payload?.circles ?? [];
    },
    resetUser(state) {
      state.preferences = undefined;
      state.isAuthed = false;
      state.isActive = false;
      state.notifications = 0;
      state.username = undefined;
      state.circles = [];
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
