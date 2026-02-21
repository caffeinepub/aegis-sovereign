# Specification

## Summary
**Goal:** Emergency system restore to fix blank screen errors and rebuild the AXON SOVEREIGN application with proper authentication flow, dashboard navigation, and all core features.

**Planned changes:**
- Fix all syntax errors causing blank screen by ensuring proper bracket closure throughout codebase
- Implement SPA structure with auth-page and dashboard-page sections that toggle based on authentication state
- Restore glassmorphic login panel with Full Name registration field
- Fix registration flow to save to localStorage.AXON_MASTER_USER and immediately show dashboard
- Restore dashboard sidebar with five navigation sections: Command Center, Neural Lab, Sentinel Protocol, Device Sync, and Vault
- Implement KPI row with Asset Shield (₹1,241,310 live ticker), Neural Ingest (link input), and Vocal Health gauge
- Add real-time animating Waveform visualization labeled 'Live Spectral Analysis' in center
- Add Synopsis Engine component in center dashboard area
- Add three-tier subscription pricing cards (Free, ₹299/month, ₹499/month) under Vault section
- Display registered user's Full Name dynamically in sidebar (no hardcoded names)
- Add Logout button that clears localStorage and returns to auth-page
- Implement login validation with 'Invalid Credentials' toast on failure
- Add secret bypass: clicking AXON logo 3 times force-shows Dashboard as 'Sovereign Administrator' with ₹499 plan unlocked

**User-visible outcome:** Users can register with their full name, log in to a fully functional dashboard with live metrics, navigate between five sections, view subscription tiers, and log out. The application loads without errors, and a secret bypass provides admin access by triple-clicking the logo.
