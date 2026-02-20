// localStorage-based authentication utility for AXON SOVEREIGN

export interface User {
  email: string;
  password: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

export interface SessionData {
  name: string;
  role: 'USER' | 'ADMIN';
  email: string;
}

const USERS_KEY = 'AXON_USERS';
const SESSION_KEY = 'CURRENT_AXON_SESSION';

// Initialize users array if it doesn't exist
export function initializeStorage(): void {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
}

// Get all users
export function getAllUsers(): User[] {
  initializeStorage();
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
}

// Validate email uniqueness
export function validateEmailUnique(email: string): { valid: boolean; message?: string } {
  const users = getAllUsers();
  const emailLower = email.toLowerCase();
  const exists = users.some((user) => user.email.toLowerCase() === emailLower);
  
  if (exists) {
    return { valid: false, message: 'This email is already registered' };
  }
  
  return { valid: true };
}

// Register new user
export function registerUser(name: string, email: string, password: string): { success: boolean; message?: string } {
  // Validate email uniqueness
  const validation = validateEmailUnique(email);
  if (!validation.valid) {
    return { success: false, message: validation.message };
  }
  
  // Create new user with default USER role
  const newUser: User = {
    email: email.toLowerCase(),
    password,
    name,
    role: 'USER',
  };
  
  // Add to users array
  const users = getAllUsers();
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return { success: true };
}

// Authenticate user
export function authenticateUser(email: string, password: string): User | null {
  const users = getAllUsers();
  const emailLower = email.toLowerCase();
  
  const user = users.find(
    (u) => u.email.toLowerCase() === emailLower && u.password === password
  );
  
  return user || null;
}

// Set current session
export function setCurrentSession(user: User): void {
  const sessionData: SessionData = {
    name: user.name,
    role: user.role,
    email: user.email,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
}

// Get current session
export function getCurrentSession(): SessionData | null {
  const sessionJson = localStorage.getItem(SESSION_KEY);
  return sessionJson ? JSON.parse(sessionJson) : null;
}

// Clear current session
export function clearCurrentSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getCurrentSession() !== null;
}
