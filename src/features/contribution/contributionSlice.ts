import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchContributions,
  addContribution,
} from "../../api/contirbutionService";

export const getContributions = createAsyncThunk(
  "contributions/getContributions",
  async () => await fetchContributions()
);

export const createContribution = createAsyncThunk(
  "contributions/createContribution",
  async (contribution: any) => await addContribution(contribution)
);

const contributionSlice = createSlice({
  name: "contributions",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContributions.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createContribution.fulfilled, (state, action) => {
        state.list.push(action?.payload);
      });
  },
});

export default contributionSlice.reducer;
