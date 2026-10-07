---
id: tmpl-planned-breaker-replacement
title: Planned shutdown to replace a breaker
difficulty: beginner
requires: []
skills: [shutdown-planning, lockout-tagout, documentation]
rules: [R-NOTIFY-01, R-LOTO-01, R-VERIFY-01, R-DOC-01, R-LABEL-01]
protocols: [sp-loto, sp-switching]
---
Create a planned job to replace one branch or feeder breaker in a specific panel named in the site file. The reason is one of: a cracked case, a breaker that failed a trip test, or a wrong-type breaker found during maintenance. The electrician must plan and run the shutdown.

Vary:
- which panel it is, and which tenants or house loads lose power during the shutdown;
- whether any affected loads are sensitive (servers, refrigeration, healthcare branches, UPS or generator backfeed);
- the work window the customer asks for;
- one complication found on site, such as a replacement breaker with the wrong interrupting rating, a second damaged breaker next to it, or a panel schedule that doesn't match the field.

A good approach:
1. Confirm the replacement breaker is listed for the panel and matches the rating and interrupting capacity.
2. Identify every affected load and send written 72-hour notice (R-NOTIFY-01).
3. On the day, confirm with the site contact, lock out the panel main or the upstream device, and check for backfeed sources (R-LOTO-01).
4. Verify absence of voltage (R-VERIFY-01).
5. Photograph before and after, and record torque values (R-DOC-01).
6. Update the typed panel schedule and labels (R-LABEL-01).
7. Restore power in a controlled sequence and confirm the loads with the customer.

Red flags: swapping the breaker hot; skipping or shortening the notice; installing a non-listed or under-rated breaker; ignoring UPS or generator backfeed.
