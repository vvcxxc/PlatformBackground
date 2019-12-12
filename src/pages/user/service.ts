import request from '@/utils/request';
export function fakeAccountLogin(params: any) {
  return request('/api/auth/login', {
    method: 'POST',
    data: params,
  });
}
