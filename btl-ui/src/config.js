

const apiURL = process.env.REACT_APP_API_URL;
const platform = process.env.REACT_APP_PLATFORM || 'WEB';
const appVersion = process.env.REACT_APP_VERSION || '1.0.0';
const appCode = process.env.REACT_APP_CODE || 'BAITAPLON';
const appBaseURL = process.env.PUBLIC_URL || 'http://localhost:3001';
const appBasePath = process.env.REACT_APP_ROOT || '/';
const appURL = `${appBaseURL}${appBasePath}`.toString().replace(/([^:]\/)\/+/g, '$1');
// const tokenName = `${platform}_${appCode}_ACCESS_TOKEN`;
const tokenName = 'TOKEN_BTL'
const profileName = `${platform}_${appCode}_PROFILE`;

const Config = {
    apiURL: apiURL,
    platform: platform,
    appVersion: appVersion,
    appCode: appCode,
    appURL: appURL,
    tokenName: tokenName,
    profileName: profileName

};

export default Config;