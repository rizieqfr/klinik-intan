# Klinik Intan - Clinic Management System

## 1. Overview

Klinik Intan is a comprehensive, web-based Clinic Management System built with Next.js. This application is designed to streamline clinic operations by digitizing patient management, appointment scheduling, medical records, billing, and reporting. It features a dual-portal system: a feature-rich administrative dashboard for clinic staff and a streamlined portal for patients to register and book appointments.

The system aims to improve efficiency, reduce paperwork, and provide better data management for a small to medium-sized clinic. Key functionalities include patient registration (for both new and existing patients), doctor schedule management, electronic health records (EHR), multi-department patient flow (Outpatient, Inpatient, ER), payment processing, and insightful reporting.

---

## 2. Key Features

### Administrative Dashboard
- **Dashboard Analytics**: At-a-glance view of key metrics like daily patient count, total patients, total medical records, and total doctors.
- **Patient Management (CRM)**:
    - Register new patients with detailed information (demographics, allergies, etc.).
    - View a comprehensive list of all patients.
    - Edit existing patient information.
    - View detailed patient profiles, including their complete medical history.
- **Doctor & Schedule Management**:
    - Add, edit, and delete doctor schedules, including their name, specialty (poli), working days, and hours.
- **Patient Registration & Queue Management**:
    - **Multi-Department Registration**: Separate registration flows for Emergency (UGD), Outpatient (Rawat Jalan), and Inpatient (Rawat Inap) care.
    - **Appointment Queue**: View a live queue of all patient reservations, with status indicators for "Served" and "Waiting".
    - Manage appointments, including deleting registrations.
- **Electronic Health Records (EHR)**:
    - Create detailed medical records for each patient visit, linked to their appointment.
    - Record patient complaints, diagnoses, ICD codes, treatments/actions performed, and prescribed medications.
    - View and print detailed medical records for each visit.
- **Billing & Payments**:
    - Manage payment status for various services (UGD, Outpatient, Inpatient).
    - Edit transaction details, including service fees and medication costs.
    - Generate and print official invoices for completed payments.
- **Reporting**:
    - **Data Export**: Generate and export comprehensive reports to Excel (`.xlsx`) format for Patients, Medical Records, Doctor Schedules, and Payments.
    - **Data Visualization**: View a Pie Chart visualizing the frequency of different patient diagnoses.
- **User Management**: Manage system users (Admin, Staff) with role-based access.

### Patient Portal
- **New Patient Registration**: A public-facing page for new patients to register themselves online, automatically generating a Medical Record Number (No. RM) and NIK.
- **Existing Patient Login**: A dedicated portal for previously registered patients to log in using their NIK and Medical Record Number.
- **Online Reservations**: Authenticated patients can book appointments by selecting a date, doctor, and service type, and describing their symptoms.

---

## 3. Tech Stack

This project is built with a modern, robust, and scalable technology stack.

- **Framework**: [Next.js](https://nextjs.org/) 14
- **Language**: JavaScript
- **Styling**:
    - [Tailwind CSS](https://tailwindcss.com/)
    - [shadcn/ui](https://ui.shadcn.com/) for UI components (Table, Select, Button, etc.)
    - [PostCSS](https://postcss.org/)
- **Form Management**: [Formik](https://formik.org/)
- **Data Fetching**: [Axios](https://axios-http.com/)
- **Data Tables**: [@tanstack/react-table](https://tanstack.com/table/v8)
- **Data Visualization**: [Chart.js](https://www.chartjs.org/) with [react-chartjs-2](https://react-chartjs-2.js.org/)
- **Authentication & Session**: [iron-session](https://github.com/vvo/iron-session)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) & [@radix-ui/react-icons](https://www.radix-ui.com/icons)
- **Utilities**:
    - [Moment.js](https://momentjs.com/)
    - [lodash](https://lodash.com/)
    - [FileSaver.js](https://github.com/eligrey/FileSaver.js/) & [SheetJS](https://sheetjs.com/)
    - `html2pdf.js`
- **Linting**: [ESLint](https://eslint.org/)

---

## 4. Project Structure

```
klinik-intan/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   └── ...
│   ├── pages/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── dokter/
│   │   ├── pasien/
│   │   ├── pembayaran/
│   │   ├── pendaftaran/
│   │   ├── pelaporan/
│   │   ├── rekam-medis/
│   │   ├── reservasi/
│   │   └── _app.js
│   │   └── _document.js
│   ├── styles/
│   └── utils/
│       ├── apiService.js
│       ├── clientApiService.js
│       ├── routeGuard.js
│       └── sessionWrapper.js
├── public/
├── .env.local.example
├── next.config.mjs
├── package.json
└── tailwind.config.js
```

---

## 5. Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17.0 or later)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

### Installation

```bash
git clone https://github.com/your-username/klinik-intan.git
cd klinik-intan

npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5005/api
SESSION_KEY=your_super_secret_password_for_iron_session_at_least_32_characters
SESSION_COOKIE_NAME=klinik_intan_session
HTTPS=false
```

### Running the Application

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

- Admin Login: `/auth/login`

### Available Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

---

## 6. Deployment

Deploy on [Vercel](https://vercel.com/new) or check [Next.js deployment docs](https://nextjs.org/docs/deployment).
