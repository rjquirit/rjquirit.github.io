# RJ Quirit Portfolio — AI Agent Knowledge Base

This document describes the current portfolio site, its data model, and the constraints AI agents should follow when making changes. Treat the source files and workbook as the authority for implementation details; this README is context, not a replacement for the resume data.

## Project at a glance

- **Purpose:** A public, single-page professional portfolio and resume for Dr. Renel Jay A. Quirit, PhD, CESE.
- **Published homepage:** `index.html`; the site is designed to be hosted as static files (the repository is `rjquirit/rjquirit.github.io`).
- **Main content source:** `resume_data.xlsx`, loaded by the homepage at runtime.
- **Main profile image:** `assets/img/profile-img.jpg`.
- **Implementation:** Plain HTML, inline CSS, and browser JavaScript. There is no package manifest, application framework, build pipeline, or test suite defined in the repository root.
- **Third-party runtime dependency:** SheetJS/XLSX 0.18.5 is loaded from cdnjs to parse the workbook.

## Repository map

| Path | Purpose |
| --- | --- |
| `index.html` | Current portfolio homepage. Contains the page markup, styles, workbook-loading code, and rendering logic. |
| `resume_data.xlsx` | Workbook used by the homepage. Its worksheet names and column headers are part of the JavaScript data contract. |
| `assets/img/profile-img.jpg` | Current circular profile/avatar image in the homepage header. |
| `assets/` | Site images, CSS, vendor resources, and other static-page resources; not all are used by `index.html`. |
| `forms/` | Form-related site resources. |
| `backup_index.html`, `old-index.html`, `new_index.html` | Additional homepage variants/backups. Do not assume they are the deployed homepage; the current root entry point is `index.html`. |
| `portfolio-details.html`, `service-details.html`, `starter-page.html` | Other standalone site pages. Check their own markup before assuming they share homepage styles or behavior. |

Keep paths relative to the repository root so they work on GitHub Pages and other static hosts.

## Homepage structure and behavior

The page is organized in this order:

1. Sticky in-page navigation: Experience, On-Going Projects, Skills, Projects, Credentials, Recognition.
2. Header: profile image, name, role/tagline, summary, and email/LinkedIn/portfolio links.
3. Resume statistics.
4. Experience timeline.
5. On-going/accomplishment cards (rendered from `Accomplishments2026`).
6. Skills grouped by category with a 1–5 rating and progress bar.
7. Systems/projects with links.
8. Education and certifications.
9. Awards, speaking engagements, and research.
10. Footer with location, phone, and email.

The page uses semantic sections with the IDs referenced by the navigation. Preserve these IDs or update the corresponding links together. The header image is an `<img>` with descriptive alt text, styled to 110 × 110 pixels, circular, cropped with `object-fit: cover`, and outlined with the accent color.

### Data-loading flow

`index.html` loads `xlsx.full.min.js` from cdnjs, then:

1. Fetches `resume_data.xlsx` relative to the page URL.
2. If the fetch fails, attempts to parse the workbook embedded in the `XLSX_B64` constant.
3. Converts worksheets to row objects using `XLSX.utils.sheet_to_json(..., { defval: "" })`.
4. Renders data into the existing page containers.
5. On an unrecoverable load/render error, replaces the main content with an error message and logs the error to the console.

The embedded base64 workbook is a fallback snapshot, not a live link to the Excel file. If workbook content is changed, keep the embedded fallback synchronized if the fallback is expected to show the same content. The external XLSX library must still load for either workbook path to work.

### Rendering conventions

- Most workbook values are inserted as text using `textContent`/text nodes through the local `h()` and `li()` helpers. Preserve this pattern for untrusted or editable data; do not interpolate workbook values into HTML strings.
- Experience highlights and accomplishment highlights are split on the literal pipe character (`|`).
- Technologies are split on commas for the accomplishment technology chips.
- Skill bars use `Level * 20%`; ratings are expected to be numeric values from 1 through 5.
- The header role concatenates the workbook title with only the first three tagline components, split on ` · `.
- Project cards open their workbook URL in a new tab with `rel="noopener"`.
- The footer is assembled from profile location, phone, and email.

The CSS is embedded in `index.html`. It includes responsive grids, light/dark color handling, reduced-motion overrides, scroll/reveal and count-up animations, and print rules that hide the navigation and call-to-action buttons. Avoid introducing dependencies or extracting assets unless the change specifically calls for it.

## Workbook: `resume_data.xlsx`

Worksheet names and headers are consumed directly by `index.html`; renaming a worksheet or column requires a matching code change. Empty cells are read as empty strings. Keep the existing pipe-delimited convention for multi-item highlights.

| Worksheet | Columns used by the page |
| --- | --- |
| `Profile` | `Field`, `Value` |
| `Stats` | `Value`, `Label` |
| `Experience` | `Organization`, `Role`, `Start`, `End`, `Location`, `Highlights (| separated)` |
| `Skills` | `Category`, `Skill`, `Level` |
| `Accomplishments2026` | `Title`, `Domain`, `Scale / Impact`, `Technology`, `Highlights (| separated)` |
| `Projects` | `Name`, `URL`, `Description` |
| `Education` | `Degree`, `School`, `Years`, `Note` |
| `Certifications` | `Name`, `Issuer`, `Year` |
| `Awards` | `Year`, `Award`, `Body` |
| `Speaking` | `Topic`, `Venue`, `Date` |
| `Research` | `Title`, `Venue`, `Year` |

The `Profile` worksheet is a key/value table. Its current fields include `Name`, `Title`, `Tagline`, `Summary`, `Location`, `Email`, `Phone`, `Website`, and `LinkedIn`.

### Current professional profile and portfolio facts

- Name: **Dr. Renel Jay A. Quirit, PhD, CESE**.
- Current title: **Regional Information Technology Officer**.
- Location: **Cagayan de Oro City, Philippines**.
- Professional focus in the workbook: IT leadership, systems administration, full-stack development, AI, and digital transformation.
- The profile summary describes 15+ years in software development, systems administration, network infrastructure, and ICT project management; regional ICT operations for DepEd Region X; supervision of 16 personnel across 14 school divisions; management of ₱159.8M in ICT modernization projects; and in-house systems used by thousands.
- Public contact and profile links are maintained in the workbook, not hard-coded into the page markup.

Current statistics are:

| Value | Label |
| --- | --- |
| 15+ | Years in IT & software |
| ₱159.8M | ICT projects managed |
| 16 | Personnel supervised |
| 14 | School divisions served |
| 4.57 | 2025 IPCRF rating (Outstanding) |
| 18 | Custom systems built in 2025 |
| 48K+ | Educators using the OMR app |

### Experience represented in the workbook

- **Department of Education – Regional Office 10** — Regional Information Technology Officer, Jun 2022–Present, Cagayan de Oro. Leads 16 ICT personnel serving 14 divisions; manages computerization projects; lists six custom systems built in 2025; regional network rehabilitation; external partnerships; a 96.83% technical-assistance resolution rate in 2024; and Outstanding performance awards for 2023–2025.
- **Department of Education – Gingoog City Division** — Division Information Technology Officer, Jun 2015–May 2022. Developed 20+ web systems, supported websites for 95 schools and internet connectivity for 68 schools, and worked on load balancing, structured cabling, CCTV, ICT training, and procurement compliance.
- **St. Rita's College of Balingasag** — IT Program Department Head, Apr 2013–May 2015. Revised the BSIT curriculum, developed an Associate in IT bridging program, managed faculty/CHED compliance, and submitted 38 Windows mobile apps to the Microsoft Store.
- **Christ the King College** — College Instructor, May 2011–Mar 2013. Taught programming, networking, graphics, video editing, animation, and computer architecture; mentored student projects.
- **Freelance & Part-time (International and local)** — Software, Mobile & Web Developer · Server Admin, 2010–2017. Work listed includes car-sales systems and Nginx administration, Ionic-Cordova apps, TESDA VII finance/procurement systems, and local POS, inventory, payroll, and attendance systems.

### Skills, project examples, and accomplishments

Skills are grouped under Leadership, Software, Data, Infrastructure, and Creative. Workbook ratings range from 3 to 5. They cover ICT governance and procurement/project/team management; PHP/Laravel, JavaScript/web technologies, React, Python, Java/Android, C++, OpenCV, Kotlin, Flutter and Ionic-Cordova; MySQL/MariaDB, SQL Server, PostgreSQL, Power BI and Excel; networking, MikroTik, Linux, Nginx, Docker, CI/CD, cybersecurity, Wazuh/SIEM/SOAR and incident response; and creative applications/editing.

The `Accomplishments2026` worksheet currently documents seven initiatives:

- MSRUTE Native Mobile OMR Scanner — mobile engineering and computer vision; designed for 48,000+ educators in 2,450+ schools, BYOD use, configurable scanning, and low-to-mid Android devices.
- MSRUTE Psychometric ETL & Analytics Warehouse — Laravel/MySQL analytics over 900,000 student records and 70 columns, with validation, deduplication, access scoping, and competency diagnostics.
- Cyber Threat Intelligence Orchestration Platform — parallel enrichment from eight threat feeds, normalized scoring, and Gemini-assisted MITRE ATT&CK mapping/threat profiles.
- Self-Hosted SIEM & SOAR Environment — Wazuh-based log collection, enrichment, correlation, and response using self-hosted infrastructure.
- GIS Campus Mapping Application — decoupled Laravel API and Leaflet/OpenStreetMap frontend for regional public schools, including marker clustering and search.
- Storage Optimization & rsync Backup Automation — reclaimed 660GB+, corrected stale Docker-layer backup behavior, and added guarded/locked scheduled syncs and audit logs.
- Layer 7 Web Attack Incident Response — reverse-proxy/firewall containment and hardening after an attack pushed CPU use to 190%, with the workbook reporting zero data exfiltration and zero downtime.

The six systems in the `Projects` worksheet are Document Tracking System, Inventory System, Learner Tracking, Lesson Hub, HR System, and Regional Kiosk. Use the workbook for their exact URLs and descriptions.

### Credentials and recognition

- **Education:** PhD in Technology Management (Cebu Technological University, 2015–2022); Master in Information Technology (University of Science and Technology of Southern Philippines, 2011–2013); BS Information Technology (Central Mindanao University, 2007–2011).
- **Certifications:** Career Executive Service Eligible (CESE); MikroTik network certifications; Google Certified Trainer/Educator Level 2; Microsoft Innovative Educator; EC-Council Certified Secure Computer User v2; IBM Certified Academic Associate; Professional Civil Service Exam Passer; TESDA NC II Computer Hardware Servicing; Google Project Management and AI Essentials certificates.
- **Awards:** Outstanding Performance Awardee (DepEd Region X, 2023–2025); Best Educational Innovation Awardee (DepEd National, 2022); CSC Honor Awards nomination (2019); Outstanding Employee of the Year (2018); Outstanding Education Support Award (2017); Best Paper at USTP's graduate research forum (2013).
- **Speaking:** Workbook topics focus on AI in education, ethics, teaching, research, and governance. Venues include Kwentong Bayani / DZXL 558 Manila, St. Theresa College of Tandag, Kung Hua School, Capitol University, and Liceo de Cagayan University, plus engagements listed as “Various.”
- **Research:** Includes an offline Raspberry Pi-powered LMS, e-government SMS data collection and QA monitoring, and a decision support system for degree selection.

For exact wording, dates, issuers, venues, highlights, and numeric claims, consult the workbook rather than paraphrasing from this summary.

## Working locally

Serve the repository root over HTTP so the browser can fetch the workbook; opening `index.html` as a `file://` URL may prevent the fetch from working.

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/`. No install/build step is currently required. Internet access is needed for the SheetJS CDN script unless the dependency is deliberately changed.

## Guidance for AI agents

1. **Inspect before editing.** `index.html` is a standalone homepage with inline CSS and JavaScript. Do not assume a framework, build system, or test runner.
2. **Treat the workbook as the resume content source.** Update workbook rows for content edits; avoid duplicating workbook values in HTML/README. Keep the embedded `XLSX_B64` snapshot synchronized if changing workbook data and preserving fallback behavior.
3. **Preserve the worksheet/column contract.** A workbook rename, reordered/renamed header, or data-type change may break rendering. Update the consumer and verify the page if changing the schema.
4. **Preserve safe text rendering.** Continue using the existing DOM helpers and text APIs for workbook-derived values. Validate external URLs and avoid introducing HTML injection paths.
5. **Preserve static-host compatibility.** Keep referenced files in the repository and use relative asset paths. Do not add server-only behavior or a package/build dependency without a clear requirement.
6. **Keep navigation and section IDs aligned.** The page uses anchors to scroll to the content sections.
7. **Respect responsive, accessibility, and motion behavior.** Preserve alt text, keyboard-accessible anchors, the dark-mode rules, reduced-motion overrides, and print styles when touching presentation.
8. **Avoid unrelated legacy-page edits.** The root contains older/template HTML pages and shared assets; modify them only when the request explicitly includes those pages.
9. **Verify proportionally.** For a content/data change, check workbook headers and load the homepage over HTTP. For a markup or style change, inspect desktop and narrow viewport behavior and check the browser console. There is no configured automated test suite at present.

