# Assignment Guide Modal Implementation

## Overview

This implementation creates an AssignmentGuideModal using Next.js 13+ parallel routes and intercepting routes to provide a seamless modal experience in the dashboard.

## Architecture

### FSD Structure

Following Feature Sliced Design principles:

```
entities/
  assignment/
    ui/
      AssignmentGuideModal.tsx    # Dialog component with checklist
    action/
      index.ts                    # getAssignmentList action
    index.ts                      # Public API

features/
  assignment/
    ui/
      AssignmentGuideButton.tsx   # Button to open modal
    index.ts                      # Public API
```

### Route Structure

#### Parallel Routes

- `apps/camp/src/app/dashboard/[week]/layout.tsx` - Supports parallel routes with modal slot
- `apps/camp/src/app/dashboard/[week]/@modal/default.tsx` - Default empty modal state

#### Intercepting Routes

- `apps/camp/src/app/dashboard/[week]/@modal/(..)assignment/page.tsx` - Intercepts assignment route
- `apps/camp/src/app/dashboard/assignment/page.tsx` - Direct assignment route

## Features

### AssignmentGuideModal Component

- Displays assignment details: title, purpose, process, tips, expected output
- Shows example image if available
- Interactive checklist with progress tracking
- Task completion when all checklist items are checked
- Responsive design with scroll support for long content

### Data Integration

- Fetches assignment data using `getAssignmentList(week)` action
- Creates task record with type "assignment" when completed
- Integrates with existing task system

### Navigation

- Modal opens via intercepted route for seamless UX
- ESC key closes modal
- Direct navigation fallback for deep linking
- Back navigation support

## Usage

### In Dashboard

```tsx
import { AssignmentGuideButton } from "@/features/assignment";

<AssignmentGuideButton week={weekNum} />;
```

### Modal Navigation

- Click button: Shows modal overlay on current page
- Direct URL: `/dashboard/assignment?week=3` opens full page modal
- Browser back: Closes modal and returns to dashboard

## Task Types

Updated `TaskData` interface to include:

- `"assignment"` - For assignment completion tracking

## Database Schema

Uses existing `assignment` table with fields:

- `title` - Assignment title
- `example_image_url` - Optional example image
- `purpose` - Assignment objectives
- `process` - Step-by-step instructions (array)
- `tips` - Helpful tips (array)
- `checklist` - Required completion items (array)
- `output` - Expected deliverables
- `week` - Week number

## Benefits

1. **Seamless UX**: Modal overlay preserves dashboard context
2. **FSD Compliance**: Proper layer separation and dependencies
3. **Type Safety**: Full TypeScript integration with Supabase types
4. **Accessibility**: Keyboard navigation and proper ARIA labels
5. **Progressive Enhancement**: Works with and without JavaScript
