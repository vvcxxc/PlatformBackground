const Model = {
  namespace: 'prizesList',
  state: {
    prizeName: undefined, // 活动名称
    activityStatus: undefined, // 活动状态
    currentPage: 1, // 当前页
    currentPageSize: 10, // 每页数量
  },
  reducers: {
    setFussyForm(state: any, action: any) {
      return {
        ...state,
        prizeName: action.payload.prizeName,
        activityStatus: action.payload.activityStatus,
        currentPage: 1,
      };
    },
    resetFussySearch(state: any) {
      return {
        ...state,
        prizeName: undefined,
        activityStatus: undefined,
      };
    },
  },
};

export default Model;
