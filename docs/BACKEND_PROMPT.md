# Claude Opus 4.5 Prompt: Build C# Backend API for SimpleBizToolkit Blog CMS

Copy and paste this entire prompt into a new Claude conversation to generate the C# backend.

---

## PROMPT START

I need you to create a complete C# .NET 8 Web API backend for a blog CMS. This API will be consumed by a Next.js frontend that is already built. The frontend expects the API to conform to a specific contract.

### Project Overview

- **Framework**: .NET 8 Web API (Minimal APIs or Controllers - your choice)
- **Database**: PostgreSQL with Entity Framework Core
- **Auth**: JWT Bearer tokens with email/password login + Azure AD (Entra ID) support
- **Storage**: Azure Blob Storage for media uploads
- **Deployment**: Azure App Service

### Project Structure

Create a clean architecture solution with this structure:

```
SimpleBizToolkit.Api/
├── SimpleBizToolkit.Api.sln
├── src/
│   ├── SimpleBizToolkit.Api/           # Web API project
│   │   ├── Controllers/                 # API controllers
│   │   ├── Middleware/                  # Custom middleware
│   │   ├── Extensions/                  # Service extensions
│   │   ├── Program.cs
│   │   └── appsettings.json
│   ├── SimpleBizToolkit.Core/          # Domain entities & interfaces
│   │   ├── Entities/
│   │   ├── Interfaces/
│   │   └── DTOs/
│   ├── SimpleBizToolkit.Infrastructure/ # EF Core, external services
│   │   ├── Data/
│   │   ├── Repositories/
│   │   └── Services/
│   └── SimpleBizToolkit.Application/    # Business logic, CQRS handlers
│       ├── Posts/
│       ├── Tags/
│       ├── Media/
│       └── Auth/
└── tests/
    └── SimpleBizToolkit.Api.Tests/
```

### API Endpoints Required

Implement all of these endpoints:

#### Posts
- `GET /api/posts` - List posts with pagination, filtering, search
- `POST /api/posts` - Create post (admin)
- `GET /api/posts/{id}` - Get post by ID
- `PUT /api/posts/{id}` - Update post (admin)
- `DELETE /api/posts/{id}` - Delete post (admin)
- `GET /api/posts/slug/{slug}` - Get post by URL slug
- `GET /api/posts/slugs` - Get all published slugs for sitemap
- `GET /api/posts/validate-slug?slug=xxx` - Check slug uniqueness
- `POST /api/posts/{id}/publish` - Publish post (admin)
- `POST /api/posts/{id}/unpublish` - Unpublish post (admin)
- `POST /api/posts/{id}/archive` - Archive post (admin)

#### Tags
- `GET /api/tags` - List all tags
- `POST /api/tags` - Create tag (admin)
- `DELETE /api/tags/{id}` - Delete tag (admin)

#### Media
- `GET /api/media` - List media with pagination (admin)
- `POST /api/media` - Upload file (multipart/form-data, admin)
- `PUT /api/media/{id}` - Update alt text (admin)
- `DELETE /api/media/{id}` - Delete media (admin)

#### Auth
- `GET /api/auth/session` - Get current session
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/azure-ad` - Exchange Azure AD token for session
- `POST /api/auth/logout` - Logout

#### System
- `GET /api/health` - Health check
- `POST /api/revalidate` - Trigger Next.js ISR revalidation

### Data Models

#### Post Entity
```csharp
public class Post
{
    public Guid Id { get; set; }
    public string Type { get; set; } = "blog"; // "blog" or "page"
    public string Slug { get; set; } = "";
    public string Title { get; set; } = "";
    public string? Excerpt { get; set; }
    public JsonDocument? Content { get; set; } // TipTap JSON stored as JSONB
    public string Status { get; set; } = "draft"; // draft, published, archived
    public DateTime? PublishedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    // Images
    public string? CoverImageUrl { get; set; }
    
    // SEO
    public string? SeoTitle { get; set; }
    public string? SeoDescription { get; set; }
    public string? OgImageUrl { get; set; }
    public string? CanonicalUrl { get; set; }
    
    // Metadata
    public string? AuthorName { get; set; }
    public int? ReadingMinutes { get; set; }
    public string? Category { get; set; }
    public string ThemeVariant { get; set; } = "default";
    
    // Relations
    public Guid AuthorId { get; set; }
    public User Author { get; set; } = null!;
    public ICollection<PostTag> PostTags { get; set; } = new List<PostTag>();
}
```

#### Tag Entity
```csharp
public class Tag
{
    public Guid Id { get; set; }
    public string Name { get; set; } = "";
    public string Slug { get; set; } = "";
    public ICollection<PostTag> PostTags { get; set; } = new List<PostTag>();
}
```

#### Media Entity
```csharp
public class Media
{
    public Guid Id { get; set; }
    public string Filename { get; set; } = "";
    public string OriginalName { get; set; } = "";
    public string MimeType { get; set; } = "";
    public long Size { get; set; }
    public string Url { get; set; } = "";
    public string? Alt { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid? PostId { get; set; }
}
```

#### User Entity
```csharp
public class User
{
    public Guid Id { get; set; }
    public string Email { get; set; } = "";
    public string? Name { get; set; }
    public string PasswordHash { get; set; } = ""; // BCrypt hashed
    public string Role { get; set; } = "editor"; // admin, editor
    public string? AzureAdObjectId { get; set; } // For Azure AD users
}
```

### TipTap Content Storage

The `Content` field stores TipTap/ProseMirror JSON. Example:

```json
{
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": { "level": 2 },
      "content": [{ "type": "text", "text": "Hello World" }]
    },
    {
      "type": "paragraph",
      "content": [
        { "type": "text", "text": "This is " },
        { "type": "text", "text": "bold", "marks": [{ "type": "bold" }] },
        { "type": "text", "text": " text." }
      ]
    },
    {
      "type": "callout",
      "attrs": { "type": "info", "title": "Note" },
      "content": [
        {
          "type": "paragraph", 
          "content": [{ "type": "text", "text": "This is a callout block." }]
        }
      ]
    }
  ]
}
```

Store this as PostgreSQL `jsonb` column.

### API Response Format

All API responses should follow this format:

**Success:**
```json
{
  "data": { ... },
  "success": true
}
```

**Success (paginated):**
```json
{
  "items": [...],
  "total": 100,
  "page": 1,
  "pageSize": 20,
  "totalPages": 5
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "title": ["Title is required"]
    }
  }
}
```

### Authentication Requirements

1. **JWT Bearer Tokens**
   - Sign with HMAC-SHA256
   - Include `sub` (user ID), `email`, `role`, `exp`
   - 24-hour expiration

2. **Email/Password Login**
   - BCrypt password hashing
   - Rate limit: 5 attempts per minute

3. **Azure AD Integration**
   - Accept ID tokens from frontend
   - Validate with Microsoft identity platform
   - Auto-create user on first login
   - Map Azure AD roles to app roles

4. **Authorization**
   - Public: GET published posts, health check
   - Editor: Create/edit own posts
   - Admin: All operations

### Configuration (appsettings.json)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=simplebiztoolkit;Username=postgres;Password=postgres"
  },
  "Jwt": {
    "Secret": "your-256-bit-secret-key-here-make-it-long",
    "Issuer": "SimpleBizToolkit.Api",
    "Audience": "SimpleBizToolkit.Web",
    "ExpirationHours": 24
  },
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "TenantId": "your-tenant-id",
    "ClientId": "your-client-id"
  },
  "AzureBlobStorage": {
    "ConnectionString": "your-connection-string",
    "ContainerName": "media"
  },
  "NextJs": {
    "RevalidateUrl": "https://your-site.com/api/revalidate",
    "RevalidateSecret": "your-secret"
  }
}
```

### Media Upload Requirements

1. Accept multipart/form-data
2. Max file size: 10MB
3. Allowed types: image/jpeg, image/png, image/gif, image/webp, application/pdf
4. Generate unique filename with GUID
5. Upload to Azure Blob Storage
6. Return public URL
7. Store metadata in database

### Next.js Revalidation

When a post is created, updated, published, or deleted:
1. Call the Next.js revalidation endpoint
2. Send the paths to revalidate: `/blog`, `/blog/{slug}`

### CORS Configuration

Allow:
- `http://localhost:3000` (development)
- `https://your-production-domain.com`

### Database Migrations

Include Entity Framework migrations. The initial migration should create:
- Posts table with JSONB content column
- Tags table
- PostTags junction table
- Media table
- Users table
- Proper indexes on slug, status, publishedAt

### Required NuGet Packages

- `Microsoft.EntityFrameworkCore`
- `Npgsql.EntityFrameworkCore.PostgreSQL`
- `Microsoft.AspNetCore.Authentication.JwtBearer`
- `Microsoft.Identity.Web`
- `Azure.Storage.Blobs`
- `BCrypt.Net-Next`
- `FluentValidation`
- `Serilog` (logging)

### Seed Data

Create a seed script that adds:
1. An admin user (email: admin@simplebiztoolkit.com, password: Admin123!)
2. A few sample tags (bookkeeping, small-business, tutorials)
3. One sample published post

### Testing

Include unit tests for:
- Post CRUD operations
- Auth service
- Slug validation/generation

### Important Notes

1. The frontend sends `authorName` as a string, not an author object
2. The pagination uses `total` not `totalCount` in responses
3. Public endpoints filter to `status: "published"` only
4. Slugs must be lowercase alphanumeric with hyphens only
5. Auto-generate slug from title if not provided
6. Calculate `readingMinutes` from content length (200 words/min)
7. JSONB columns should handle null gracefully

### Output Format

Please provide:
1. Complete solution structure with all files
2. All entity classes with EF Core configurations
3. All controllers/endpoints
4. Repository pattern implementation
5. JWT auth service
6. Azure Blob storage service
7. Initial EF migration
8. appsettings.json template
9. README with setup instructions
10. Dockerfile for containerization

Start with the solution structure and core entities, then work through each layer systematically.

---

## PROMPT END

