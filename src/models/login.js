import {routerRedux} from 'dva/router';
import {stringify} from 'qs';
import store from 'storejs';
import {fakeAccountLogin, getFakeCaptcha, getAuthorityData} from '@/services/api';
import {getPageQuery} from '@/utils/utils';
import {reloadAuthorized} from '@/utils/Authorized';
import {SUCCESS} from '@/constants';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    * login({payload}, {call, put}) {
      const response = yield call(fakeAccountLogin, payload);

      // Login successfully
      if (response.retCode === SUCCESS) {
        const indexInfo = yield call(getAuthorityData);
        yield put({
          type: 'changeLoginStatus',
          payload: {
            ...indexInfo,
            status: 'ok',
          },
        });

        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'error',
            type: 'account',
            retInfo:response.retInfo,
          },
        });
      }
    },

    * getCaptcha({payload}, {call}) {
      yield call(getFakeCaptcha, payload);
    },

    * logout(_, {put}) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
        },
      });
      reloadAuthorized();
      const {redirect} = getPageQuery();
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, {payload}) {
      if (payload.status === 'ok' && payload.userId) {
        store({'userId': payload.userId, 'isAdmin': payload.all, 'perms': payload.perms})
      }
      if (payload.status === false) {
        store.clear();
      }
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        msg: payload.retInfo,
      };
    },
  },
};
