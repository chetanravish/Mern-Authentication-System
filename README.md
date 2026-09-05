# 📁 Dastavej — Secure Family Document Vault

> A full-stack document management platform where users can securely store, organize, view, download, and manage important family documents.

**Status:** MVP Complete (Phase 1)

---

# Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Axios
* Lucide Icons

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Multer
* AWS S3 (Private Bucket)

---

# Features Implemented

## Authentication

* User registration
* Email OTP verification
* Secure login with JWT
* Refresh token authentication
* Protected dashboard routes
* Logout

---

## Family Management

Every account automatically creates one immutable family member:

| Name     | Relation |
| -------- | -------- |
| Username | Self     |

Supported relations:

* Self
* Father
* Mother
* Brother
* Sister
* Spouse
* Son
* Daughter
* Other

Rules:

* Only one Self
* Only one Father
* Only one Mother
* Multiple siblings allowed
* Maximum 10 family members
* Self cannot be deleted

---

## Document Vault

Each document belongs to exactly one family member.

Supported file types:

* PDF
* JPG
* JPEG
* PNG

Stored metadata:

* Document name
* Category
* File name
* MIME type
* Size
* Owner
* Family member
* S3 Key

---

## AWS S3 Integration

Documents are **not stored in MongoDB**.

Architecture:

React → Express → Amazon S3 → MongoDB

MongoDB stores only metadata while the actual file lives inside a **private S3 bucket**.

Security:

* Private bucket
* IAM least-privilege user
* Signed View URLs
* Signed Download URLs
* S3 deletion on document delete

---

## Document Viewer

* View PDFs
* View Images
* Edit document name
* Edit category
* Download original file
* Custom delete confirmation modal

---

## Family Filter

Documents page includes circular family selector.

Features:

* All Documents
* Self
* Father
* Mother
* Every family member
* Live filtering
* Document counts
* Add Member shortcut

---

# Project Structure

```text
Frontend/
 ├── components/
 ├── pages/
 ├── api/
 └── context/

Backend/
 ├── controller/
 ├── routes/
 ├── middleware/
 ├── model/
 ├── config/
 └── utils/
```

---

# Security

* JWT Access Tokens
* Refresh Tokens
* Password hashing (bcrypt)
* Private AWS S3 bucket
* IAM restricted permissions
* User ownership verification on every document
* User ownership verification on family members

---

# MVP Test Checklist

## Authentication

* [x] Register
* [x] OTP Verification
* [x] Login
* [x] Refresh Token
* [x] Protected Routes
* [x] Logout

## Family

* [x] Self created automatically
* [x] Add members
* [x] Duplicate Father blocked
* [x] Duplicate Mother blocked
* [x] Max 10 members
* [x] Delete member
* [x] Self protected

## Documents

* [x] Upload PDF
* [x] Upload JPG
* [x] Upload PNG
* [x] Category selection
* [x] Member selection
* [x] Instant UI update
* [x] View document
* [x] Download document
* [x] Delete from S3 + MongoDB

## UI

* [x] Dark dashboard
* [x] Family circular filter
* [x] Responsive sidebar
* [x] Custom delete modal

---

# Upcoming Phase 2 — Direct S3 Upload (Architecture Upgrade)

## Current Upload Flow

```text
React
   │
   ▼
Express + Multer
   │
   ▼
Amazon S3
   │
   ▼
MongoDB Metadata
```

### Problem

Every uploaded file passes through the backend.

Example:

A 25 MB PDF travels:

1. Browser → Express
2. Express memory (Multer)
3. Express → S3

The backend becomes responsible for bandwidth, RAM, and upload performance.

---

## New Production Architecture

```text
React
   │
   ▼
Request Signed Upload URL
   │
   ▼
Express
   │
   ▼
AWS S3 (Signed PUT URL)
   ▲
   │
React uploads directly
   │
   ▼
Express saves metadata
```

### Why this is better

| Current               | Direct S3   |
| --------------------- | ----------- |
| Backend receives file | ❌ No        |
| Multer required       | ❌ Removed   |
| Lower RAM usage       | ✅ Yes       |
| Faster uploads        | ✅ Yes       |
| Upload progress       | ✅ Easy      |
| Better scalability    | ✅ Excellent |

---

# Planned Endpoints

| Method | Endpoint                  | Purpose                    |
| ------ | ------------------------- | -------------------------- |
| POST   | `/documents/presign`      | Generate signed upload URL |
| POST   | `/documents/complete`     | Save metadata after upload |
| GET    | `/documents/:id/view`     | Signed viewing URL         |
| GET    | `/documents/:id/download` | Signed download URL        |
| DELETE | `/documents/:id`          | Delete from S3 + MongoDB   |

---

# Learning Outcomes

This project demonstrates practical implementation of:

* JWT Authentication
* Refresh Token Flow
* MongoDB Relationships
* Family-based Data Modeling
* AWS IAM
* Amazon S3
* Signed URLs
* Secure File Storage
* React State Management
* Production-grade Document Lifecycle

---

## Author

**Chetan Ravish**

Building Dastavej as a production-ready full-stack SaaS project.
