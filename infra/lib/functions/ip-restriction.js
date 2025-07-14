'use strict';

const IP_WHITE_LIST = ['xx.xx.xx.xx'];

// Basic認証の設定
const authUser = 'admin';
const authPass = 'password123';

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;
  const clientIp = request.clientIp;

  // IP制限チェック
  if (!IP_WHITE_LIST.includes(clientIp)) {
    callback(null, {
      status: '403',
      statusDescription: 'Forbidden',
      body: 'Access Denied: IP not allowed'
    });
    return;
  }

  // Basic認証チェック
  const authString = 'Basic ' + Buffer.from(authUser + ':' + authPass).toString('base64');
  
  if (typeof headers.authorization === 'undefined' || headers.authorization[0].value !== authString) {
    callback(null, {
      status: '401',
      statusDescription: 'Unauthorized',
      body: 'Unauthorized',
      headers: {
        'www-authenticate': [{ key: 'WWW-Authenticate', value: 'Basic realm="Restricted Area"' }],
      },
    });
    return;
  }

  // IP制限とBasic認証の両方をパスした場合
  callback(null, request);
};
