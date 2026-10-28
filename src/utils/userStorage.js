export function getUserStorageId(user) {
  if (user?.id !== undefined && user.id !== null) {
    return String(user.id);
  }

  return typeof user?.email === 'string' ? user.email.trim().toLowerCase() : null;
}

export function hasStoredSession() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return Boolean(localStorage.getItem('token') && getUserStorageId(user));
  } catch {
    return false;
  }
}
