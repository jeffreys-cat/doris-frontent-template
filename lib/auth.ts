export function checkLogin(): boolean {
  return typeof localStorage.getItem('username') === 'string';
}
