// use localStorage to store the authority info, which might be sent from server in actual project.
import store from 'storejs';

export function getAuthority(str) {
  if (store('isAdmin')) {
    return 'all';
  } else {
    const authorityString =
      typeof str === 'undefined' ? store('perms') : str;
    let authority;
    try {
      authority = JSON.parse(authorityString);
    } catch (e) {
      authority = authorityString;
    }
    if (typeof authority === 'string') {
      return [authority];
    }
    return authority;
  }
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return store('perms', JSON.stringify(proAuthority));
}
