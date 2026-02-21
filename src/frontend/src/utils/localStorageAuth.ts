// localStorage-based authentication utilities for AXON SOVEREIGN

export interface AxonUser {
  fullName: string;
  email: string;
  password: string;
  createdAt: number;
  plan: 'free' | 'core' | 'shield';
}

const USERS_KEY = 'AXON_USERS';
const SESSION_KEY = 'AXON_SESSION';
const CURRENT_USER_KEY = 'AXON_CURRENT_USER';
const MASTER_USER_KEY = 'AXON_MASTER_USER';
const ENCRYPTION_KEY = 'AXON_SOVEREIGN_ENCRYPTION_KEY_V1';

// Initialize localStorage with AXON_USERS if it doesn't exist
export function initializeStorage(): void {
  try {
    const users = localStorage.getItem(USERS_KEY);
    if (!users) {
      localStorage.setItem(USERS_KEY, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
}

// Simple encryption using base64 encoding with a salt
// Note: This is basic obfuscation, not cryptographically secure
function encrypt(data: string): string {
  try {
    const salt = ENCRYPTION_KEY;
    const combined = salt + data;
    return btoa(combined);
  } catch (error) {
    console.error('Encryption error:', error);
    return data;
  }
}

// Simple decryption
function decrypt(encryptedData: string): string {
  try {
    const combined = atob(encryptedData);
    const salt = ENCRYPTION_KEY;
    return combined.substring(salt.length);
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedData;
  }
}

// Get all registered users (decrypted)
export function getUsers(): AxonUser[] {
  try {
    const users = localStorage.getItem(USERS_KEY);
    if (!users) return [];
    
    const encryptedUsers = JSON.parse(users);
    return encryptedUsers.map((encUser: any) => ({
      fullName: decrypt(encUser.fullName),
      email: decrypt(encUser.email),
      password: decrypt(encUser.password),
      createdAt: encUser.createdAt,
      plan: encUser.plan || 'free',
    }));
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
}

// Register a new user with encryption and default FREE plan
export function registerUser(fullName: string, email: string, password: string): boolean {
  try {
    const users = getUsers();
    
    // Check if user already exists
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return false;
    }

    // Create user data object
    const userData: AxonUser = {
      fullName,
      email,
      password,
      createdAt: Date.now(),
      plan: 'free',
    };

    // Store in AXON_MASTER_USER key as JSON
    localStorage.setItem(MASTER_USER_KEY, JSON.stringify(userData));

    // Also store in encrypted AXON_USERS array for compatibility
    const encryptedUser = {
      fullName: encrypt(fullName),
      email: encrypt(email),
      password: encrypt(password),
      createdAt: Date.now(),
      plan: 'free',
    };

    const encryptedUsers = localStorage.getItem(USERS_KEY);
    const usersArray = encryptedUsers ? JSON.parse(encryptedUsers) : [];
    usersArray.push(encryptedUser);
    
    localStorage.setItem(USERS_KEY, JSON.stringify(usersArray));
    return true;
  } catch (error) {
    console.error('Error registering user:', error);
    return false;
  }
}

// Validate login credentials by checking AXON_MASTER_USER
export function signInUser(emailOrUsername: string, password: string): AxonUser | null {
  try {
    // Check AXON_MASTER_USER first
    const masterUserData = localStorage.getItem(MASTER_USER_KEY);
    if (masterUserData) {
      const user: AxonUser = JSON.parse(masterUserData);
      if (user.email.toLowerCase() === emailOrUsername.toLowerCase() && user.password === password) {
        // Set AXON_SESSION to 'ACTIVE'
        localStorage.setItem(SESSION_KEY, 'ACTIVE');
        // Store current user email for retrieval
        localStorage.setItem(CURRENT_USER_KEY, user.email);
        return user;
      }
    }

    // Fallback to AXON_USERS array for backward compatibility
    const users = getUsers();
    const user = users.find(
      u => u.email.toLowerCase() === emailOrUsername.toLowerCase() && u.password === password
    );
    
    if (user) {
      // Set AXON_SESSION to 'ACTIVE'
      localStorage.setItem(SESSION_KEY, 'ACTIVE');
      // Store current user email for retrieval
      localStorage.setItem(CURRENT_USER_KEY, user.email);
      // Also store in AXON_MASTER_USER for consistency
      localStorage.setItem(MASTER_USER_KEY, JSON.stringify(user));
      return user;
    }
    
    return null;
  } catch (error) {
    console.error('Error validating login:', error);
    return null;
  }
}

// Get current logged-in user's email
export function getCurrentUserEmail(): string | null {
  try {
    return localStorage.getItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Get current logged-in user's full data from AXON_MASTER_USER
export function getCurrentUser(): AxonUser | null {
  try {
    // Try AXON_MASTER_USER first
    const masterUserData = localStorage.getItem(MASTER_USER_KEY);
    if (masterUserData) {
      return JSON.parse(masterUserData);
    }

    // Fallback to email lookup
    const email = getCurrentUserEmail();
    if (!email) return null;
    
    const users = getUsers();
    return users.find(u => u.email === email) || null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Update user's subscription plan
export function updateUserPlan(email: string, plan: 'free' | 'core' | 'shield'): boolean {
  try {
    // Update AXON_MASTER_USER
    const masterUserData = localStorage.getItem(MASTER_USER_KEY);
    if (masterUserData) {
      const user: AxonUser = JSON.parse(masterUserData);
      if (user.email.toLowerCase() === email.toLowerCase()) {
        user.plan = plan;
        localStorage.setItem(MASTER_USER_KEY, JSON.stringify(user));
      }
    }

    // Update AXON_USERS array
    const encryptedUsers = localStorage.getItem(USERS_KEY);
    if (!encryptedUsers) return false;
    
    const usersArray = JSON.parse(encryptedUsers);
    const users = getUsers();
    
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (userIndex === -1) return false;
    
    // Update the plan in the encrypted array
    usersArray[userIndex].plan = plan;
    localStorage.setItem(USERS_KEY, JSON.stringify(usersArray));
    
    return true;
  } catch (error) {
    console.error('Error updating user plan:', error);
    return false;
  }
}

// Master bypass function for pitch security - creates Sovereign Administrator with ₹499 plan
export function masterBypass(): void {
  try {
    const masterUser: AxonUser = {
      fullName: 'Sovereign Administrator',
      email: 'sovereign@axon.master',
      password: 'master_bypass_key',
      createdAt: Date.now(),
      plan: 'shield', // ₹499 plan
    };

    // Store in AXON_MASTER_USER
    localStorage.setItem(MASTER_USER_KEY, JSON.stringify(masterUser));
    // Set session active
    localStorage.setItem(SESSION_KEY, 'ACTIVE');
    localStorage.setItem(CURRENT_USER_KEY, masterUser.email);
  } catch (error) {
    console.error('Error in master bypass:', error);
  }
}

// Legacy function for compatibility
export function validateLogin(emailOrUsername: string, password: string): AxonUser | null {
  return signInUser(emailOrUsername, password);
}

// Set session (legacy compatibility)
export function setSession(user: AxonUser, rememberMe: boolean = false): void {
  try {
    localStorage.setItem(SESSION_KEY, 'ACTIVE');
    localStorage.setItem(CURRENT_USER_KEY, user.email);
  } catch (error) {
    console.error('Error setting session:', error);
  }
}

// Check if session is active
export function isSessionActive(): boolean {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    return session === 'ACTIVE';
  } catch (error) {
    console.error('Error checking session:', error);
    return false;
  }
}

// Get session (returns true if active)
export function getSession(): { authenticated: boolean } | null {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    if (session === 'ACTIVE') {
      return { authenticated: true };
    }
    return null;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

// Clear session
export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Error clearing session:', error);
  }
}

// Terminate session (alias for clearSession)
export function terminateSession(): void {
  clearSession();
}
