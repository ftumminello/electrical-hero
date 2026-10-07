-- Seed data for Electrical Hero (fictional). Upserts, so re-running refreshes content without touching sessions.
INSERT INTO companies (id, name) VALUES ('co-kestrel', 'Kestrel Electric Co.')
ON CONFLICT(id) DO UPDATE SET name = excluded.name;

INSERT INTO accounts (id, company_id, name, building_type, address_line1, city, state, postal_code, site_contact_name, site_contact_phone, service_summary, critical_info, features, config_key)
VALUES (
  'acct-harbor-point-tower', 'co-kestrel', 'Harbor Point Tower', 'Class A multi-tenant office tower (18 storeys)',
  '1200 Waterline Avenue', 'Port Calder', 'WA', '98101',
  'Dana Whitfield (Chief Engineer)', '555-0142',
  '480Y/277V 3-phase 4-wire, 4000 A switchboard MSB-1, 750 kW generator GEN-1 with ATS-LS and ATS-OS, fire pump FP-1',
  'MSB-1 is 32 cal/cm2 (category 4) and is never opened energized. LP-14U stays live from UPS-14 when LP-14A is off. Check EC-18 for water before opening panels.',
  '["three-phase-480","switchboard","tenant-panels","generator","ats","fire-pump"]',
  'acct-harbor-point-tower.md'
)
ON CONFLICT(id) DO UPDATE SET
  company_id = excluded.company_id, name = excluded.name, building_type = excluded.building_type,
  address_line1 = excluded.address_line1, city = excluded.city, state = excluded.state, postal_code = excluded.postal_code,
  site_contact_name = excluded.site_contact_name, site_contact_phone = excluded.site_contact_phone,
  service_summary = excluded.service_summary, critical_info = excluded.critical_info,
  features = excluded.features, config_key = excluded.config_key;

INSERT INTO accounts (id, company_id, name, building_type, address_line1, city, state, postal_code, site_contact_name, site_contact_phone, service_summary, critical_info, features, config_key)
VALUES (
  'acct-cedar-ridge-medical', 'co-kestrel', 'Cedar Ridge Medical Pavilion', 'Medical office building with outpatient surgery center (3 storeys)',
  '455 Cedar Ridge Parkway', 'Brookhaven Falls', 'WA', '98052',
  'Marcus Bell (Facilities Manager)', '555-0167',
  '480Y/277V 3-phase 4-wire, 2000 A switchboard MSB-1, 500 kW generator GEN-1, essential electrical system with ATS-LS, ATS-CR and ATS-EQ',
  'Healthcare site: coordinate with facilities and the ASC charge nurse before touching any EES branch. Tenant panel and CR-1W arc-flash labels date from 2021 and count as expired.',
  '["three-phase-480","switchboard","tenant-panels","generator","ats","essential-electrical-system"]',
  'acct-cedar-ridge-medical.md'
)
ON CONFLICT(id) DO UPDATE SET
  company_id = excluded.company_id, name = excluded.name, building_type = excluded.building_type,
  address_line1 = excluded.address_line1, city = excluded.city, state = excluded.state, postal_code = excluded.postal_code,
  site_contact_name = excluded.site_contact_name, site_contact_phone = excluded.site_contact_phone,
  service_summary = excluded.service_summary, critical_info = excluded.critical_info,
  features = excluded.features, config_key = excluded.config_key;

INSERT INTO accounts (id, company_id, name, building_type, address_line1, city, state, postal_code, site_contact_name, site_contact_phone, service_summary, critical_info, features, config_key)
VALUES (
  'acct-maple-commons', 'co-kestrel', 'Maple Commons Plaza', 'Single-storey retail strip center with restaurant (6 suites)',
  '3180 Maple Commons Road', 'Lindale Heights', 'WA', '98204',
  'Priya Nandakumar (Property Manager)', '555-0189',
  '208Y/120V 3-phase 4-wire, 1200 A switchboard MDP-1 with 7-position meter center MS-1, no generator',
  'Unresolved hot lug on MS-1 position M-A (Suite A tenant breaker). HP-1 arc-flash label missing. Keep restaurant walk-ins powered: no outage longer than 2 hours.',
  '["three-phase-208","switchboard","tenant-panels","multi-meter","commercial-kitchen"]',
  'acct-maple-commons.md'
)
ON CONFLICT(id) DO UPDATE SET
  company_id = excluded.company_id, name = excluded.name, building_type = excluded.building_type,
  address_line1 = excluded.address_line1, city = excluded.city, state = excluded.state, postal_code = excluded.postal_code,
  site_contact_name = excluded.site_contact_name, site_contact_phone = excluded.site_contact_phone,
  service_summary = excluded.service_summary, critical_info = excluded.critical_info,
  features = excluded.features, config_key = excluded.config_key;
