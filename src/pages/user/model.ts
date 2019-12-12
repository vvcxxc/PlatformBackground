import { Model } from 'dva';
import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;
const model: Model = {
  namespace: 'userLogin',
  state: {
    username: '',
    password: ''
  },
  reducers: {
    setLogin: (state, { payload } ) => {
      return {
        ...state
      }
    }
  },
  effects: {
    *login ({payload}, {call, put}){
      console.log(payload)
    }
  }
}
export default model;
