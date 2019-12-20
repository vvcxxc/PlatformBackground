import { Model } from 'dva';
import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { fakeAccountLogin } from './service';
import { notification } from 'antd';
import { router } from 'umi';
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
      let res = yield call(fakeAccountLogin, payload)
      if(res.status_code == 200){
        localStorage.setItem('token',res.data.token_type + ' ' + res.data.token)
        router.push('/marketingActivity/activityinfo/cardlist')
      }else{
        notification.error({
          message: res.message,
        });
      }
    }
  }
}
export default model;
