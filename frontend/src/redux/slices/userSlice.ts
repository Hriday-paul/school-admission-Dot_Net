import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'admin' | 'user' | null;

export interface UserState {
  role: UserRole;
  birthCertificateId: string | null;
  studentName: string | null;
}

const initialState: UserState = {
  role: null,
  birthCertificateId: null,
  studentName: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
    setBirthCertificateId: (state, action: PayloadAction<string>) => {
      state.birthCertificateId = action.payload.trim();
    },
    setStudentDetails: (
      state,
      action: PayloadAction<{ birthCertificateId: string; studentName?: string }>
    ) => {
      state.role = 'user';
      state.birthCertificateId = action.payload.birthCertificateId.trim();
      state.studentName = action.payload.studentName?.trim() || null;
    },
    logoutUser: (state) => {
      state.role = null;
      state.birthCertificateId = null;
      state.studentName = null;
    },
  },
});

export const { setRole, setBirthCertificateId, setStudentDetails, logoutUser } =
  userSlice.actions;

export default userSlice.reducer;
