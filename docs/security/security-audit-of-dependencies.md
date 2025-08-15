# Security Audit of Dependencies

## Overview

This document provides a security audit of the project's dependencies as of the latest update. The audit covers both production and development dependencies listed in `package.json`.

### `npm audit` results

There were found `4 vulnerabilities (1 low, 1 moderate, 2 high)`:

#### 1. react-router 7.0.0-pre.0 - 7.5.1

- Severity: **high**
- React Router allows pre-render data spoofing on React-Router framework mode
- React Router allows a DoS via cache poisoning by forcing SPA mode

#### 2. vite 6.3.0 - 6.3.3

- Severity: **moderate**
- Vite's server.fs.deny bypassed with /. for files under project root

#### 3-4. brace-expansion 1.0.0 - 1.1.11 || 2.0.0 - 2.0.1

- brace-expansion Regular Expression Denial of Service vulnerability

After `npm audit fix` all vulnerabilities were eliminated

## Production Dependencies

### Core Framework and Runtime

- **react (^19.1.0)**

   - **Purpose**: Core library in project
   - **Version**: 19.1.0
   - **Weekly Downloads**: 40.7 million
   - **Dependencies**: 0
   - **Maintainers**: Facebook Meta core team
   - **GitHub Stars**: 236k stars
   - **npm audit**: No reported vulnerabilities
   - **CVEs**: \_
   - **Security**: Good

- **react-dom (^19.1.0)**

   - **Purpose**: React’s DOM rendering companion.
   - **Version**: 19.1.0
   - **Weekly Downloads**: 38 million
   - **Dependencies**: `scheduler`
   - **Maintainers**: Facebook Meta core team
   - **npm audit**: No reported vulnerabilities
   - **CVEs**: \_
   - **Security**: Good

### State Management

- **@reduxjs/toolkit (^2.6.1)**

   - **Purpose**: Toolset for Redux state management.
   - **Version**: 2.6.1
   - **Weekly Downloads**: 4.7 million
   - **Dependencies**: `@standard-schema/spec` `@standard-schema/utils` `immer` `redux` `redux-thunk` `reselect`
   - **Maintainers**: Redux team
   - **GitHub Stars**: 11k stars
   - **npm audit**: No reported vulnerabilities
   - **CVEs**:
      - **HIGH** CVE-2020-28477 (nodejs-immer: prototype pollution may lead to DoS or remote code execution); Fixed in 8.0.1 `immer` version, `@reduxjs/toolkit` >1.7.1 version
   - **Security**: Good

- **react-redux (^9.2.0)**
   - **Purpose**: Official React bindings for Redux.
   - **Version**: 9.2.0
   - **Weekly Downloads**: 9.5 million
   - **Dependencies**: `@types/use-sync-external-store` `use-sync-external-store`
   - **Maintainers**: Redux team
   - **GitHub Stars**: 23.5k stars
   - **npm audit**: No reported vulnerabilities
   - **CVEs**: \_
   - **Security**: Good

### Routing

- **react-router-dom (^7.6.2)**
   - **Purpose**: Browser routing for React web apps.
   - **Version**: 7.6.2
   - **Weekly Downloads**: 9.5 million
   - **Dependencies**: `react-router`
   - **Maintainers**: Remix
   - **GitHub Stars**: 55k stars
   - **npm audit**: No reported vulnerabilities
   - **CVEs**:
      - **HIGH** CVE-2025-43865 (react-router: Insufficient Verification of Data Authenticity); Fixed in 7.5.2
      - **HIGH** CVE-2025-43864 (react-router: Improper Handling of Exceptional Conditions); Fixed in 7.5.2
   - **Security**: Medium

### HTTP Client

- **axios (^1.8.4)**
   - **Purpose**: Promise-based HTTP client for browsers + Node.js.
   - **Version**: 1.8.4
   - **Weekly Downloads**: 64 million
   - **Dependencies**: `follow-redirects` `form-data` `proxy-from-env`
   - **Maintainers**: Multiple core contributors
   - **GitHub Stars**: 107k stars
   - **npm audit**: No reported vulnerabilities
   - **CVEs**:
      - **MEDIUM** CWE-918 (axios:Server-side Request Forgery (SSRF)); Fixed in 1.8.3
   - **Security**: Medium

### Utility Libraries

- **@mobily/ts-belt (^3.13.1)**

   - **Purpose**: Functional utilities in TS (Option, Result, piping, etc.)
   - **Version**: 3.13.1
   - **Weekly Downloads**: 128k
   - **Dependencies**: 0
   - **Maintainers**: mobily, ...
   - **GitHub Stars**: 1.2k stars
   - **npm audit**: No reported vulnerabilities
   - **CVEs**: \_
   - **Security**: Good

- **neverthrow (^8.2.0)**

   - **Purpose**: Safe error handling in TS via Result<E, V> types
   - **Version**: 8.2.0
   - **Weekly Downloads**: 820k
   - **Dependencies**: 0
   - **Maintainers**: delgdo14
   - **GitHub Stars**: 5.8k stars
   - **npm audit**: No reported vulnerabilities
   - **CVEs**: \_
   - **Security**: Good

- **zod (^3.25.42)**
   - **Purpose**: Type-safe schema validation TS-first.
   - **Version**: 3.25.42
   - **Weekly Downloads**: 32 million
   - **Dependencies**: 0
   - **Maintainers**: colinhacks
   - **GitHub Stars**: 38.6k stars
   - **npm audit**: No reported vulnerabilities
   - **CVEs**:
      - **HIGH** CVE-2023-4316 (zod: Regular Expression Denial of Service (ReDoS)); Fixed in 3.22.3
   - **Security**: Good

### Styling

- **sass (^1.86.3)**
   - **Purpose**: CSS preprocessor.
   - **Version**: 1.86.3
   - **Weekly Downloads**: 17.5 million
   - **Dependencies**: `chokidar` `immutable` `source-map-js`
   - **Maintainers**: sassbot
   - **GitHub Stars**: 4.1k stars
   - **npm audit**: No reported vulnerabilities
   - **CVEs**: \_
   - **Security**: Good

## Avoidance of Zero-Day Vulnerabilities

1. **Regular Updates**

   - Keep all dependencies up to date
   - Run `npm audit` regularly to check for vulnerabilities
   - Consider using `npm audit fix` to automatically fix vulnerabilities

2. **Dependency Management**

   - Use exact versions for critical dependencies
   - Consider implementing a dependency update strategy
   - Regularly review and remove unused dependencies

3. **Dependency Security Tools**

   - **GitHub Dependabot**

      - Enable automated security updates
      - Configure update frequency (weekly recommended)
      - Set up security alerts for vulnerable dependencies

   - **Snyk Integration**
      - Implement Snyk for continuous security monitoring
      - Set up automated vulnerability scanning
      - Set up automated fix PRs for security issues

## Package Replacement Analysis

### Current Package: Axios (^1.8.4)

#### Security Assessment Process

1. **Vulnerability Analysis**

   - Checked npm security advisories: No known vulnerabilities
   - GitHub security issues: Clean history
   - CVE database: No entries

2. **Maintenance Status**

   - Last update: 1 day ago
   - Active maintenance: Yes
   - Community size: Large

3. **Security Features**
   - Built-in XSS protection
   - CSRF protection capabilities
   - Request/response interceptors
   - Automatic JSON parsing

### Proposed Alternative: Ky (^1.8.1)

#### Security Assessment Process

1. **Vulnerability Analysis**

   - Checked npm security advisories: No known vulnerabilities
   - GitHub security issues: Clean history
   - CVE database: No entries

2. **Maintenance Status**

   - Last update: 2 months ago
   - Active maintenance: Yes
   - Community size: Growing

3. **Security Features**
   - Built on Fetch API (native browser security)
   - Automatic retry with exponential backoff
   - Request timeout handling
   - TypeScript support out of the box
   - Smaller bundle size (reduced attack surface)
   - `ky` has had no vulnerabilities jet according to SNYK records

#### Migration Steps

1. **Installation**

   ```bash
   npm uninstall axios
   npm install ky
   ```

2. **Code Changes**

   ```typescript
   // Before (Axios)
   import axios from 'axios';

   const response = await axios.get('/api/data');
   const data = response.data;

   // After (Ky)
   import ky from 'ky';

   const data = await ky.get('/api/data').json();
   ```

3. **Security Improvements**

   - Reduced bundle size
   - Native browser security features
   - Better TypeScript integration
   - Simpler API with fewer security pitfalls

#### Potential Risks

- Ky lacks support for request cancellation via `AbortController` in older browsers.
- Axios offers richer out-of-the-box request transformation, which must be manually implemented in Ky if needed.
- Migration requires rewriting request interceptors if heavily used.

#### Conclusion

The proposed replacement of Axios with Ky offers several security advantages:

- Smaller attack surface due to reduced codebase
- Native browser security features
- Better TypeScript integration
- Active maintenance and quick security patches
- Simpler API with fewer security pitfalls

The migration process is straightforward and can be completed with minimal risk to the existing codebase.

## Conclusion

The current dependency set is well-maintained and up-to-date. No critical security vulnerabilities have been identified. Regular monitoring and updates are recommended to maintain security standards.
