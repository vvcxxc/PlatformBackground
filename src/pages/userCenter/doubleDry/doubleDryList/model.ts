import moment from 'moment';
const Model = {
  namespace: 'doubleDryList',
  state: {
    start_date: undefined,  // 开始时间
    start_date_moment: undefined,
    end_date: undefined,    // 结束时间
    end_date_moment: undefined,
    // created: undefined,
    mobile: undefined,      // 手机号
    categoryType: undefined,  // 角色类型
    doubledryStatus: undefined, // 双乾状态
    currentPage: 1, // 当前页
    currentPageSize: 10, // 每页数量
  },
  reducers: {
    setFussyForm(state: any, action: any) {
      let start_date_moment = undefined
      if (action.payload.start_date) {
        start_date_moment = moment(action.payload.start_date).format('YYYY-MM-DD')
      }
      let end_date_moment = undefined
      if (action.payload.end_date) {
        end_date_moment = moment(action.payload.end_date).format('YYYY-MM-DD')
      }
      return {
        ...state,
        start_date: action.payload.start_date,
        start_date_moment,
        end_date: action.payload.end_date,
        end_date_moment,
        // created,
        mobile: action.payload.mobile,
        categoryType: action.payload.categoryType,
        doubledryStatus: action.payload.doubledryStatus,
        currentPage: 1,
      };
    },
    resetFussySearch(state: any) {
      return {
        ...state,
        start_date: undefined,
        start_date_moment: undefined,
        end_date: undefined,
        end_date_moment: undefined,
        // created: undefined,
        mobile: undefined,
        categoryType: undefined,
        doubledryStatus: undefined,
      };
    },
    setPaginationCurrent(state: any, action: any) {
      return {
        ...state,
        currentPage: action.payload.currentPage,
        currentPageSize: action.payload.currentPageSize,
      };
    },
  }
}

export default Model
