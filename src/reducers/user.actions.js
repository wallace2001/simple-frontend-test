import { createAsyncAction } from "../utils/actionCreators";

export const actions = {
  loadUser: createAsyncAction("@user/LOAD"),
  saveUser: createAsyncAction("@user/SAVE"),
  deleteUser: createAsyncAction("@user/DELETE"),
};
