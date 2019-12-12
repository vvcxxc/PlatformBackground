import { Model } from 'dva';
import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import request from '@/utils/request'
import axios from 'axios'
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state:any) => T) => T },
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
      // console.log(payload)
      let res = yield request('/api/auth/login', { method: 'POST', data: payload,})
      // console.log(res,'1232')
      // axios({
      //   url: 'http://192.168.2.112:8890/api/auth/login',
      //   method: 'post',
      //   data:payload
      // }).then(res => {
      //   console.log(res)
      // })
    }
  }
}
export default model;
