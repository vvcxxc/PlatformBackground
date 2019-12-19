const Model = {
  namespace: 'cardList',
  state: {
    cardName: undefined, // 活动名称
    activityStatus: undefined, // 活动状态
    currentPage: 1, // 当前页
    currentPageSize: 10, // 每页数量
  },
  reducers: {
    setFussyForm(state: any, action: any) {
      return {
        ...state,
        cardName: action.payload.cardName,
        activityStatus: action.payload.activityStatus,
        currentPage: 1,
      };
    },
    resetFussySearch(state: any) {
      return {
        ...state,
        cardName: undefined,
        activityStatus: undefined,
      };
    },
  },
};

export default Model;
