import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchContributions,
  addContribution,
} from "../../api/contributionService";

export interface Contribution {
  id: number;
  amount: number;
  date: string;
  type: string;
  status: string;
}

interface CreateContributionPayload {
  amount: number;
  date: string;
}

interface ContributionsState {
  list: Contribution[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

export const getContributions = createAsyncThunk(
  "contributions/getContributions",
  async () => await fetchContributions()
);

export const createContribution = createAsyncThunk(
  "contributions/createContribution",
  async (contribution: CreateContributionPayload) =>
    await addContribution(contribution)
);

const initialState: ContributionsState = {
  list: [],
  status: "idle",
};

const contributionSlice = createSlice({
  name: "contributions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getContributions.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })

      .addCase(createContribution.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.status = "succeeded";
      })

      .addCase(getContributions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createContribution.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getContributions.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createContribution.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default contributionSlice.reducer;
