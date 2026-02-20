# Specification

## Summary
**Goal:** Restore the original clean dashboard UI with Deep Onyx background, Emerald accents, and integrate functional components including Control Panel, Active Plan, Telemetry Feed, and Team Status.

**Planned changes:**
- Restore original sidebar and main content spacing with Deep Onyx (#050505) background and Emerald (#10b981) accents
- Display clean and prominent 'Welcome back' header at the top
- Add Control Panel card with Neural Shield and Stealth Mode toggles that log to telemetry feed
- Add Active Plan card showing 'Sovereign Enterprise' badge with nearby Log Out button
- Implement compact scrolling Telemetry Feed on the right side displaying logged events
- Add Team Status card showing simple list of active users
- Configure Neural Scan transition to play only once upon successful login
- Remove redundant logos and Initializing screens
- Standardize all dashboard icons to Lucide icon set with Emerald color
- Ensure Log Out button clears AXON_SESSION and redirects to Sign-In
- Maintain localStorage authentication logic (AXON_SESSION determines dashboard vs Sign-In display)

**User-visible outcome:** Users see a clean, high-density dashboard with the original spacing and color scheme, functional toggles that log to a telemetry feed, team status visibility, and proper session management with single-play Neural Scan transition on login.
