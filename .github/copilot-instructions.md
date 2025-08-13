# Student Loan Repayment Calculator

UK Student Loan Repayment Calculator built with Next.js 15.3.3, TypeScript, TailwindCSS, and Sentry monitoring. The application provides a web interface for calculating student loan repayments based on UK loan plans.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Build

- Install dependencies and build the application:
  - `yarn install` -- takes 2 minutes. NEVER CANCEL. Set timeout to 180+ seconds.
  - `yarn build` -- takes 8 minutes. NEVER CANCEL. Set timeout to 600+ seconds.

### Development Server

- Start the development server:
  - ALWAYS run `yarn install` first if dependencies are not installed.
  - `yarn dev` -- takes 9 seconds to start. Server runs on http://localhost:3000
  - Wait for "Ready in X.Xs" message before accessing the application.

### Code Quality

- Always run before committing changes:
  - `yarn lint` -- takes 9 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
  - `yarn format` -- takes 8 seconds. Auto-formats all files with Prettier.
- Both commands must pass successfully or CI build (.github/workflows/build.yml) will fail.

## Validation

### Manual Testing Requirements

- ALWAYS test the complete user workflow after making changes:
  1. Navigate to http://localhost:3000
  2. Select a loan type (Plan 1, 2, 4, 5, or Postgraduate)
  3. Enter balance remaining (e.g., 45000)
  4. Enter course dates (use YYYY-MM-DD format for date inputs)
  5. Click "Save plan" to add the loan
  6. Enter annual salary (e.g., 35000)
  7. Click "Calculate" to test the calculation API
- EXPECTED BEHAVIOR:
  - **Without API**: The calculate step will fail with "An error occurred while calculating" due to missing backend API.
  - **With API running**: The calculation should complete successfully and display repayment results.
- ALWAYS verify the UI renders correctly and form validation works properly.

### Browser Testing

- ALWAYS test with development server (`yarn dev`) after making UI changes.
- Verify responsive design by testing different viewport sizes.
- Check browser console for errors (ignore Umami analytics failures).

## Network Configuration

### External Service Dependencies
- Umami Analytics: `umami.benscobie.com` - not accessible in restricted environments (non-critical).
- Sentry: Requires `SENTRY_AUTH_TOKEN` for source map uploads (shows warnings but doesn't fail build).
- Google Fonts: `fonts.googleapis.com` - now accessible and working correctly.

## Backend Dependencies

### Critical API Dependency

- The application requires an external backend API for calculations.
- API URL: Configured via `API_URL` environment variable (default: `http://localhost:8080`).
- Endpoint: `POST /ukstudentloans/calculate` - performs loan repayment calculations.

### Running the Backend API

- The API Docker image can be pulled and run with basic commands:
  ```bash
  docker pull benscobie/loan-repayment-api:latest
  docker run -p 8080:8080 -e SENTRY_DSN="" benscobie/loan-repayment-api:latest
  ```
- **IMPORTANT**: The Docker image requires proper environment configuration and may still have CORS configuration issues even with Sentry DSN set.
- The simple commands above may not work completely due to missing environment variables for CORS configuration.
- For full calculator functionality, contact the repository owner for complete API setup instructions.
- Source code: https://github.com/benscobie/LoanRepaymentApi
- TESTING: Without a working API, calculator functionality will show "An error occurred while calculating" which is expected behavior.

## Common Tasks

### Repository Structure

```
├── .github/workflows/     # CI/CD pipelines
├── components/           # React components
│   ├── ui/atoms/        # Basic UI components
│   ├── ui/molecules/    # Composite UI components
│   └── ui/organisms/    # Complex UI sections
├── docker/              # Docker build configuration
├── features/            # Feature-specific code (analytics)
├── models/              # TypeScript type definitions
├── pages/               # Next.js pages and API routes
│   ├── api/            # API endpoints
│   └── index.tsx       # Main calculator page
├── public/             # Static assets
├── styles/             # CSS files
└── utils/              # Utility functions
```

### Package Manager

- ALWAYS use `yarn` commands, NOT npm.
- Version: Yarn 4.3.1 (configured in `.yarnrc.yml`).
- Dependencies: Managed via `yarn.lock` file.

### Configuration Files

- `next.config.mjs`: Next.js configuration with Sentry integration
- `tailwind.config.js`: TailwindCSS configuration
- `eslint.config.mjs`: ESLint rules and TypeScript strict checking
- `.prettierrc`: Code formatting rules
- `tsconfig.json`: TypeScript compiler configuration

### Docker Build

- Production build: `docker build -f docker/Dockerfile.linux.amd64 .`
- Multi-stage build with Node.js 22 Alpine base image.
- Requires build args: `NEXT_PUBLIC_SENTRY_DSN`, `GITHUB_SHA`.
- LIMITATION: Requires network access for Sentry uploads and dependency installation.

## Key Technologies

### Core Stack

- **Framework**: Next.js 15.3.3 with Pages Router
- **Language**: TypeScript with strict type checking
- **Styling**: TailwindCSS 3.4.17 + PostCSS + Autoprefixer
- **Forms**: React Hook Form with Zod validation
- **Charts**: Chart.js + React Chart.js 2
- **Icons**: React Bootstrap Icons

### Monitoring & Analytics

- **Error Tracking**: Sentry for both client and server-side errors
- **Analytics**: Umami self-hosted analytics
- **Fonts**: Google Fonts (Open Sans) with system font fallbacks

### Development Tools

- **Linting**: ESLint with Next.js, TypeScript, and TailwindCSS rules
- **Formatting**: Prettier with single quotes and no semicolons
- **Build Analysis**: Next.js Bundle Analyzer (via `yarn analyze`)

## Deployment

### Docker Production Build

- CI/CD: GitHub Actions builds and pushes Docker images
- Registry: Docker Hub (`benscobie/student-loan-repayment-calculator:latest`)
- Environment: Supports Linux AMD64 architecture
- Health: Container exposes port 3000 with standalone Next.js server

### Environment Variables

- `API_URL`: Backend API endpoint (required for calculations)
- `NEXT_PUBLIC_SENTRY_DSN`: Public Sentry DSN for error tracking
- `SENTRY_AUTH_TOKEN`: Private token for source map uploads (build-time)

## Testing Strategy

### Current State

- NO automated tests are configured in this repository.
- NO testing frameworks or test files exist.
- Validation relies entirely on manual testing procedures.

### Manual Testing Checklist

- [ ] Application loads without errors at http://localhost:3000
- [ ] All loan types can be selected from dropdown
- [ ] Form validation works for required fields
- [ ] Date inputs accept valid dates in YYYY-MM-DD format
- [ ] Loan plans can be added and displayed correctly
- [ ] Calculate button becomes enabled when form is complete
- [ ] Error handling displays appropriate messages for API failures
- [ ] Responsive design works on different screen sizes
- [ ] Browser console shows no unexpected errors (ignore network failures)

## Troubleshooting

### Build Failures

- Dependency conflicts: Check yarn peer dependency warnings
- TypeScript errors: Run `yarn lint` to identify type issues

### Runtime Issues

- API calculation errors: Expected due to backend API configuration issues
- Analytics script failures: Non-critical, application continues to function

### Development Server

- Port 3000 conflicts: Change port with `yarn dev -p 3001`
- Hot reload issues: Restart development server
- Module resolution: Clear `.next` directory and restart
