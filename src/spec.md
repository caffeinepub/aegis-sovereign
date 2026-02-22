# Specification

## Summary
**Goal:** Fix store initialization error and restore missing dashboard components (Spectral Analysis and Asset Shield).

**Planned changes:**
- Add null-check guard in global state store initialization with default values (free tier, empty user profile)
- Force-reset application entry point to 'homepage-view' in App.tsx
- Re-bind 'Start Journey' button to properly trigger login portal overlay
- Repair localStorage persistence for User Name and Subscription Tier
- Add conditional check to hide dashboard when user is not logged in
- Re-inject LiveSpectralAnalysis component into Command Center dashboard
- Re-inject AssetShieldCard component into Command Center dashboard
- Maintain high-end dark theme with glassmorphic UI, scanlines, and tactical aesthetics

**User-visible outcome:** Users can successfully load the application without store errors, click 'Start Journey' to access login, and after authentication see the restored Command Center dashboard with working Spectral Analysis and Asset Shield components in the dark glassmorphic theme.
