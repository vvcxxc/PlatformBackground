const Model = {
  namespace: 'activityInfo',
  state: {
    ID: '', // 卡券ID
    activityName: '', // 活动名称
    storeName: undefined, // 商家名称
    status: undefined, // 卡券状态
    expandForm: false, // 展开还是折叠
    currentPage: 0, // 当前页
    currentPageSize: 0, // 每页数量
  },
  reducers: {
    setFussyForm(state: any, action: any) {
      return {
        ...state,
        ID: action.payload.ID,
        activityName: action.payload.activityName,
        storeName: action.payload.storeName,
        status: action.payload.status,
      };
    },
    resetFussySearch(state: any) {
      return {
        ...state,
        ID: '',
        activityName: '',
        storeName: undefined,
        status: undefined,
      };
    },
    switchExpandForm(state: any, action: any) {
      return {
        ...state,
        expandForm: !state.expandForm,
      };
    },
    setPaginationCurrent(state: any, action: any) {
      return {
        ...state,
        currentPage: action.payload.currentPage,
        currentPageSize: action.payload.currentPageSize,
      };
    },
  },
};

export default Model;
