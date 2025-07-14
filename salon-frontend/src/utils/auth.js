// Save user to localStorage
export function setUser(user) {
  localStorage.setItem('salonUser', JSON.stringify(user));
}

// Get user from localStorage
export function getUser() {
  const userData = localStorage.getItem('salonUser');
  return userData ? JSON.parse(userData) : null;
}

// Clear user session
export function clearUser() {
  localStorage.removeItem('salonUser');
}
