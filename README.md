# Event Check-In API - Attendance System

A simple backend API to manage events, generate tickets, and record attendance with QR validation. 

## Features
- Create events with organizer
- Auto-generate tickets with unique QR codes (TKT-XXX)
- Validate tickets at entry
- Block fake QR codes
- Block duplicate entry (already used)
- Get attendance list dashboard (total, checked-in, remaining)

## Tech Stack
- Node.js, Express
- 【entity-MongoDB¦canonical_name=MongoDB】, Mongoose
- Compass (local) - can switch to Atlas
- Nodemon for development

## Folder Structure