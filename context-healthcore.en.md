# CONTEXT.md — HealthCore

## Milestone 1: Your Company's Public Website

This document describes your company and the specific situation you're building this milestone for. Read it completely before writing any code. Everything you build must reflect this context.

## Your company

HealthCore is an outpatient healthcare services company founded in 2011 in Austin, Texas. It operates a network of 12 outpatient clinics — 9 in the United States (Texas, Florida, and Georgia) and 3 in the United Kingdom (London and Manchester) — offering primary care, specialist consultations, chronic disease management, and preventive health programmes. It employs approximately 200 people and generates around 28 million dollars in annual revenue. HealthCore's competitive edge is accessibility: same-day appointments, extended hours, and bilingual staff at US locations.

## Your department and the problem you must solve

You work in the HealthCore Digital team, the internal technology unit created by CEO Dr. Sandra Okonkwo to build the infrastructure the clinical and operational teams need. This milestone was assigned by Priya Nair, Head of Patient Experience.

HealthCore's current online presence is a single-page placeholder from 2019 with a phone number and no SSL certificate. Patients in Texas and Florida report that their first impression of HealthCore online makes them question whether the company is real. Meanwhile, the front desk receives unstructured patient enquiries by phone, spending an average of 20 minutes per call just to gather basic information before an appointment can even be considered. Priya needs a professional bilingual website that presents HealthCore's services and locations, and captures structured patient enquiry data so the front desk can follow up efficiently.

## Stakeholder

Priya Nair, Head of Patient Experience

"We've been losing patients to competitors not because our care is worse — it's because people Google us and can't find anything credible. We need a real public website, and we need it to work in English and Spanish: a large part of our patient population in Austin and Miami is Spanish-speaking, and we have nothing for them right now.

The site should have two parts. First, a landing page that presents who we are, what we offer, and where our clinics are. Second, a patient enquiry form where people can submit their information so our front desk can call them back to confirm an appointment. Right now that process happens entirely by phone with zero structure — it's costing us time and patients.

Use the content and field specifications in this document exactly. Don't invent clinic names, phone numbers, or services — use what's here. And please make it look professional. This is our digital debut."

## Language scope

The website must be fully available in English and Spanish.

## Landing page content

### Header
- HealthCore
- Navigation: Home | Services | Locations | Contact
- Language toggle: EN | ES

### Hero
- Headline: Healthcare that fits your life
- Subheadline: 12 outpatient clinics across the US and UK offering same-day appointments, extended hours, and bilingual care — so you can get the attention you need, when you need it.
- CTA: Request an appointment

### Services
1. Primary Care & Chronic Disease
2. Specialist Consultations
3. Preventive Health & Wellbeing

### Why HealthCore
- Same-day appointments at most locations
- Extended hours — weekdays until 7pm or 8pm, Saturdays available
- Bilingual staff in English and Spanish at US locations
- 12 clinics across Texas, Florida, Georgia, and the United Kingdom

### Locations (US public website)
- HealthCore Austin Central | Austin | TX | (512) 340-8800 | Mon–Fri 7am–8pm · Sat 9am–3pm
- HealthCore Austin North | Austin | TX | (512) 340-8810 | Mon–Fri 8am–7pm
- HealthCore San Antonio | San Antonio | TX | (210) 720-4400 | Mon–Fri 8am–6pm · Sat 9am–1pm
- HealthCore Miami | Miami | FL | (305) 510-7700 | Mon–Fri 7am–8pm · Sat 9am–4pm
- HealthCore Orlando | Orlando | FL | (407) 892-6600 | Mon–Fri 8am–6pm
- HealthCore Atlanta | Atlanta | GA | (404) 330-9900 | Mon–Fri 8am–7pm

### Contact
- info@healthcore.com
- Austin HQ: (512) 340-8800
- Miami: (305) 510-7700
- UK (London): +44 20 7946 0100

### Footer
- © 2025 HealthCore. All rights reserved.
- LinkedIn | Facebook | Instagram

## Patient enquiry form fields

Required form field names:
- first_name
- last_name
- date_of_birth
- email
- phone
- preferred_language
- preferred_clinic
- preferred_date
- preferred_time
- service_type
- new_patient
- has_insurance
- insurance_provider
- insurance_member_id
- health_concern
- contact_consent
- patient_id (optional if returning patient)

## Required Schema.org

MedicalOrganization for HealthCore and one MedicalClinic entry for each US location.