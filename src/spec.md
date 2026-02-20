# Specification

## Summary
**Goal:** Implement a localStorage-based authentication system with sign-up and sign-in functionality to replace the hardcoded admin credentials.

**Planned changes:**
- Create localStorage user registry ('AXON_USERS') to store user data (Email, Password, Name, Role)
- Build toggle-based authentication UI that switches between Sign In and Create Account forms with Framer Motion slide transitions
- Implement sign-up form with Full Name, Work Email, Security Password, and Confirm Password fields
- Implement sign-in form with Work Email and Security Password fields
- Add validation to prevent duplicate email registration
- Create authentication logic that validates credentials against the 'AXON_USERS' array
- Save user session data (Name, Role) to 'CURRENT_AXON_SESSION' in localStorage on successful login
- Update DashboardLayout.tsx to display personalized 'Welcome back, [Name]' greeting from session data
- Add Sonner success toast notification on account creation
- Assign default 'USER' role to new accounts
- Update ProtectedRoute.tsx to use localStorage-based authentication
- Remove hardcoded admin@axon.com authentication logic
- Apply Indigo/White SaaS theme styling to authentication forms

**User-visible outcome:** Users can create new accounts and sign in using their credentials, with data persisted in the browser. The dashboard displays a personalized greeting with their name upon login.
