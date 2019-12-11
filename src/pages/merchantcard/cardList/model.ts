const Model = {
  namespace: 'merchantCard',
  state: {
    cardID: '', // 卡券ID
    activityName: '', // 活动名称
    storeName: undefined, // 商家名称
    cardStatus: undefined, // 卡券状态
    currentPage: 0, // 当前页
    currentPageSize: 0, // 每页数量
    expandForm: false, // 展开还是折叠
  },
  reducers: {
    resetFussySearch(state) {
      return {
        ...state,
        cardID: '',
        activityName: '',
        storeName: undefined,
        cardStatus: undefined,
      };
    },
    setFussyForm(state, action) {
      return {
        ...state,
        cardID: action.payload.cardID,
        activityName: action.payload.activityName,
        storeName: action.payload.storeName,
        cardStatus: action.payload.cardStatus,
      };
    },
    switchExpandForm(state, action) {
      return {
        ...state,
        expandForm: !state.expandForm,
      };
    },
    setPaginationCurrent(state, action) {
      return {
        ...state,
        currentPage: action.payload.currentPage,
        currentPageSize: action.payload.currentPageSize,
      };
    },
  },
};

export default Model;
