import { Gender } from "@prisma/client";
import {
  MutateUserPreferencesSchemaType,
  ReadUserPreferencesSchemaType,
} from "@/schemas/UserPreferences";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReadCircleSchemaType } from "@/schemas/Circle";

export interface UserSlice {
  preferences: ReadUserPreferencesSchemaType;
  isAuthed: boolean;
  isActive: boolean;
  isAdmin: boolean;
  isNew: boolean;
  notifications: number;
  username?: string;
  circles?: ReadCircleSchemaType[];
  userSex?: Gender;
  userId?: string;
}

const initialState: UserSlice = {
  preferences: {
    ageRange: [18, 99],
    searchCountries: [],
    searchContinents: [],
    searchStates: [],
    consumables: [],
    drinking: [],
    religion: [],
    politicalBeliefs: [],
    income: [],
    userId: "<RESOLVED_ON_SERVER>",
    sex: Gender.FEMALE,
  },
  isAuthed: false,
  isActive: false,
  isAdmin: false,
  isNew: false,
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
      state.preferences = action.payload?.preferences ?? state.preferences;
      state.isAuthed = !!action.payload?.isAuthed;
      state.isActive = !!action.payload?.isActive;
      state.notifications = action.payload?.notifications ?? 0;
      state.username = action.payload?.username;
      state.circles = action.payload?.circles ?? [];
    },
    setPreferences(
      state,
      action: PayloadAction<MutateUserPreferencesSchemaType | undefined>
    ) {
      state.preferences.ageRange =
        action.payload?.ageRange ?? state.preferences.ageRange;
      state.preferences.searchCountries =
        action.payload?.searchCountries ?? state.preferences.searchCountries;
      state.preferences.searchContinents =
        action.payload?.searchContinents ?? state.preferences.searchContinents;
      state.preferences.searchStates =
        action.payload?.searchStates ?? state.preferences.searchStates;
      state.preferences.consumables =
        action.payload?.consumables ?? state.preferences.consumables;
      state.preferences.drinking =
        action.payload?.drinking ?? state.preferences.drinking;
      state.preferences.religion =
        action.payload?.religion ?? state.preferences.religion;
      state.preferences.politicalBeliefs =
        action.payload?.politicalBeliefs ?? state.preferences.politicalBeliefs;
      state.preferences.income =
        action.payload?.income ?? state.preferences.income;
    },
    resetUser(state) {
      state.preferences = initialState.preferences;
      state.isAuthed = false;
      state.isActive = false;
      state.notifications = 0;
      state.username = undefined;
      state.circles = [];
    },
  },
});

export const { setUser, resetUser, setPreferences } = userSlice.actions;
export default userSlice.reducer;
