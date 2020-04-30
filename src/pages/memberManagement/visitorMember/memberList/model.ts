const Model = {
    namespace: 'visitorMemberList',
    state: {
        mobile: undefined,      // 手机号
        memberName: undefined, // 会员名称
        memberStatus: undefined, // 会员状态
        registerChannel: undefined, // 注册渠道
        currentPage: 1,
        currentPageSize: 10
    },
    reducers: {
        setFussyForm(state: any, action: any) {
            return {
                ...state,
                mobile: action.payload.mobile,
                memberName: action.payload.memberName,
                memberStatus: action.payload.memberStatus,
                registerChannel: action.payload.registerChannel,
                currentPage: 1,
            };
        },
        resetFussySearch(state: any) {
            return {
                ...state,
                mobile: undefined,
                memberName: undefined,
                memberStatus: undefined,
                registerChannel: undefined,
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

export default Model;