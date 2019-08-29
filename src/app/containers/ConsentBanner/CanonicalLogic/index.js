import Cookie from 'js-cookie';
import setCookieOven from './setCookieOven';

const PRIVACY_COOKIE = 'ckns_privacy';
const EXPLICIT_COOKIE = 'ckns_explicit';
const POLICY_COOKIE = 'ckns_policy';
const COOKIE_EXPIRY = 365;
const PRIVACY_BANNER_APPROVED = 'july2019';
const COOKIE_BANNER_APPROVED = '1';
const POLICY_APPROVED = '111';
const POLICY_DENIED = '000';

const onClient = typeof window !== 'undefined';

const setCookie = (name, value) =>
  Cookie.set(name, value, { expires: COOKIE_EXPIRY });

const setPolicyCookie = (value, logger) => {
  setCookie(POLICY_COOKIE, value);
  setCookieOven(POLICY_COOKIE, value, logger);
};

// if `ckns_policy` is 0 => show banner
// if `ckns_policy` is 1 => show banner
// if `ckns_policy` is unset => show banner
// if `ckns_policy` is `july2019` => dont show banner
// if `ckns_policy` is anything else => dont show banner
const showPrivacyBanner = () => {
  const cookieValue = Cookie.get(PRIVACY_COOKIE);
  return !cookieValue || cookieValue === '0' || cookieValue === '1';
};

const showCookieBanner = () =>
  Cookie.get(EXPLICIT_COOKIE) !== COOKIE_BANNER_APPROVED;

const policyCookieSet = () => !!Cookie.get(POLICY_COOKIE);

const setSeenPrivacyBanner = () =>
  setCookie(PRIVACY_COOKIE, PRIVACY_BANNER_APPROVED);
const setDefaultPolicy = logger => setPolicyCookie(POLICY_DENIED, logger);
const setApprovedPolicy = logger => setPolicyCookie(POLICY_APPROVED, logger);
const setDismissedCookieBanner = () =>
  setCookie(EXPLICIT_COOKIE, COOKIE_BANNER_APPROVED);

const consentBannerUtilities = ({
  setShowPrivacyBanner,
  setShowCookieBanner,
  logger,
}) => {
  const runInitial = () => {
    if (onClient) {
      if (showPrivacyBanner()) {
        setShowPrivacyBanner(true);
        setSeenPrivacyBanner();
      }

      if (showCookieBanner()) {
        // Up to the application renderer to show the privacy
        // banner and cookie banner in the correct order
        setShowCookieBanner(true);
      }

      if (!policyCookieSet()) {
        setDefaultPolicy(logger);
      }
    }
  };

  const privacyOnAllow = () => {
    setShowPrivacyBanner(false);
  };

  const privacyOnReject = () => {
    setShowPrivacyBanner(false);
  };

  const cookieOnAllow = () => {
    setShowCookieBanner(false);
    setDismissedCookieBanner();
    setApprovedPolicy(logger);
  };

  const cookieOnReject = () => {
    setShowCookieBanner(false);
    setDismissedCookieBanner();
  };

  return {
    runInitial,
    privacyOnAllow,
    privacyOnReject,
    cookieOnAllow,
    cookieOnReject,
  };
};

export default consentBannerUtilities;
