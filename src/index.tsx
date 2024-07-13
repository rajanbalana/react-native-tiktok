import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import { response } from './response';

const { Tiktok } = NativeModules;

type ResponseType = {
  status: number;
  code: string;
  grantedPermissions: string;
  state: string;
};

export const auth = (
  state: string,
  scope: string,
  callback: (
    response: ResponseType,
    error: boolean | null,
    errMsg: string
  ) => void
) => {
  Tiktok.auth(state, scope, (resp: ResponseType) => {
    if (Platform.OS === 'ios') {
      switch (resp.status) {
        case response.success:
          callback(resp, false, '');
          break;
        case response.networkError:
          callback(resp, true, 'Network Error');
          break;
        case response.authDenied:
          callback(resp, true, 'Auth Denied');
          break;
        case response.unsupported:
          callback(resp, true, 'Unsupported');
          break;
        default:
          null;
      }
    } else {
      callback('' as any, null, '');
    }
  });
};

export const share = (
  path: string,
  callback: (code: string | null) => void
) => {
  Tiktok.share(path, (resp: number) => {
    if (Platform.OS === 'ios') {
      switch (resp) {
        case response.success:
          callback('PUBLISHED');
          break;
        case response.networkError:
          callback('NETWORK_ERROR');
          break;
        case response.canceled:
          callback('SHARING_CANCELED');
          break;
        case response.failed:
          callback('SHARING_FAILED');
          break;
        case response.unsupported:
          callback('UNSUPPORTED');
          break;
        default:
          null;
      }
    } else {
      callback(null);
    }
  });
};

export const shareAsset = (
  assetId: string,
  callback: (code: string | null) => void
) => {
  Tiktok.shareAsset(assetId, (resp: number) => {
    if (Platform.OS === 'ios') {
      switch (resp) {
        case response.success:
          callback('PUBLISHED');
          break;
        case response.networkError:
          callback('NETWORK_ERROR');
          break;
        case response.canceled:
          callback('SHARING_CANCELED');
          break;
        case response.failed:
          callback('SHARING_FAILED');
          break;
        case response.unsupported:
          callback('UNSUPPORTED');
          break;
        default:
          null;
      }
    } else {
      callback(null);
    }
  });
};

export const init = (key: string) => {
  if (Platform.OS === 'android') {
    Tiktok.init(key);
  }
};

const addListener = (_listener: string, _event: any) => { };

export const events =
  Platform.OS === 'android' ? new NativeEventEmitter(Tiktok) : { addListener };
