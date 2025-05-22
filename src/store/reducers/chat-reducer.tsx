import { createSlice } from '@reduxjs/toolkit';

type Props = {
  conversation_list: any[];
};
const initialState: Props = {
  conversation_list: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversation_list = action.payload;
    },
  }
});
// Action creators are generated for each case reducer function
export const {
  setConversations,
} = chatSlice.actions;

export default chatSlice.reducer;
