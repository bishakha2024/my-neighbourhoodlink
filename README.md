# NeighbourhoodLink

NeighbourhoodLink is an Expo React Native application for buying, borrowing, giving away items, offering services, and connecting with neighbours through a community feed.

## Team

- **Ezra Ayeni** — authentication, home, marketplace, listings, and services.
- **Bishakha** — community, messaging, profiles, account settings, and notifications.

This repository organizes an existing application into two file groups for team review and integration. The groups define responsibility for importing, checking, and maintaining the files; upload ownership does not establish original authorship. The earlier repository retains the initial development and upload history: [NeighbourhoodLink](https://github.com/bishakha2024/NeighbourhoodLink).

## Screen responsibilities

The app contains **25 user-facing screens**. Navigation layouts and the initial redirect route are excluded from this count. Each upload package contains **41 project files**, including shared components, logic, configuration, and tests.

| Ezra — 11 screens | Bishakha — 14 screens |
| --- | --- |
| Login | Community Feed |
| Register | Messages |
| Forgot Password | Profile |
| Home | Chat |
| Marketplace | Create Community Post |
| Create Listing / Service | Community Post Details |
| Listing Details | Delete Account |
| Manage Listing | Edit Profile |
| Search & Filters | Information — About and Privacy |
| Service Details | Neighbour Profile |
| Manage Service | Notifications |
| | Report a Problem |
| | Reviews & Ratings |
| | Settings |

Shared files have separate assignments in the two package manifests. The team coordinates changes to contexts, types, navigation, Firebase rules, and configuration before editing them.

## Features

- Email/password registration, login, and password reset.
- Sale, borrowing, giveaway listings, and services.
- Creation, editing, and deletion of items and services by their owners.
- Up to six listing photos, galleries, and full-screen photo viewing.
- Listing and community post likes and comments.
- Conversations with neighbours and links to their profiles.
- In-app notifications, unread counts, bold unread conversations, and tab indicators.
- Profile editing with name, neighbourhood, and photo.
- Account deletion and associated Firestore data cleanup.
- Reports and reviews.

All signed-in users can currently browse listings regardless of distance. Maps, nearby filtering, user verification, device push delivery, and report moderation are deferred. Uploaded Cloudinary files require separate removal by the app owner after account deletion.

## Collaboration workflow

The following is the agreed import procedure. Completion should be recorded through actual commits, pull requests, reviews, and Jira links.

1. **Bishakha prepares the repository** with this README and grants Ezra collaborator access.
2. **Ezra clones the repository**, creates a branch, imports his assigned files, reviews them, commits, and pushes. He opens a pull request into `main`.
3. **Bishakha reviews Ezra's pull request**, requests corrections when needed, and merges it after review.
4. **Bishakha pulls the updated `main`**, creates her own branch, imports her assigned files, checks the combined app, commits, and pushes. She opens a pull request.
5. **Ezra reviews Bishakha's pull request** and merges it after review and any corrections.
6. **Both pull the combined `main`** and test the application.

The first import is intentionally incomplete. Install and run the app after both groups have been merged. Commit messages should describe importing the existing implementation accurately. Each contributor uses their own Git identity. Subsequent work follows the same branch, pull request, peer review, and merge process.

Before a new task:

```bash
git switch main
git pull --ff-only origin main
git switch -c YOUR-JIRA-KEY-task-description
```

Stage only the files changed for that task, review the staged diff, commit, and push the branch. Include the actual Jira issue key in the branch or pull request title when linking development activity to Jira.

## Technology

- Expo, React Native, TypeScript, and Expo Router.
- Firebase Authentication and Cloud Firestore.
- Cloudinary unsigned image uploads.
- AsyncStorage for local preferences and account-specific cached state.
- Node test runner with React component and data-layer tests.

## Run locally

After both file groups have been merged:

```bash
git clone https://github.com/bishakha2024/my-neighbourhoodlink.git
cd my-neighbourhoodlink
npm ci
cp .env.example .env
```

If `.env` already exists, keep it rather than replacing it. Fill in the Firebase web app configuration and these Cloudinary values:

```dotenv
EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
EXPO_PUBLIC_ENABLE_STORAGE=false
EXPO_PUBLIC_ENABLE_PUSH_NOTIFICATIONS=false
```

The Cloudinary preset must use **Unsigned** signing mode. Do not place Cloudinary API secrets or Firebase service-account credentials in the client app. Keep `.env` out of Git.

Enable Firebase Email/Password authentication and create the default Firestore database. Publish the project's `firestore.rules` to the configured Firebase project. Uploading the file to GitHub does not publish Firebase rules.

Start Expo:

```bash
npx expo start --clear
```

Open the app in a compatible Expo Go installation, or press `w` to run the web version. Each contributor maintains their own local environment configuration.

## Validation

Run these checks on the combined application before merging changes:

```bash
npm run typecheck
npm test
```

Firestore security-rule tests are a separate emulator check:

```bash
npm run test:rules
```

The emulator requires a compatible Java installation. Ordinary unit tests do not verify the rules deployed in Firebase. Also test registration, password reset delivery, uploads, two-account messaging, permissions, and account deletion on devices. Record the checks actually performed in each pull request and its Jira task.

## Repository hygiene

- Keep `.env`, `node_modules`, generated builds, and logs out of Git.
- Preserve teammates' changes; pull current `main` before creating branches.
- Resolve conflicts together rather than force-pushing over shared history.
- Update Jira with actual work, test results, and pull request links.
- GitHub stores the code; Expo runs the app, and hosting or native builds are separate release steps.
