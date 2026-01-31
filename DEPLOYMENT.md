# Deployment notes (Next.js)

This project has been migrated to Next.js App Router with SSR support.

## Recommended: Azure App Service (SSR Mode)

This is the recommended deployment option for full CMS functionality with server-side rendering.

### Prerequisites
- Azure account with active subscription
- Azure CLI installed (`az`)
- Node.js 20 LTS

### Environment Variables
Set these in Azure App Service > Configuration > Application Settings:

```
NEXT_PUBLIC_API_URL=https://your-api.azurewebsites.net
NEXT_PUBLIC_USE_CMS=true
NEXT_PUBLIC_SITE_URL=https://your-site.azurewebsites.net
AZURE_AD_CLIENT_ID=your-azure-ad-app-id
AZURE_AD_TENANT_ID=your-tenant-id
```

### Deployment Steps

1. **Create Azure Resources**
```bash
# Login to Azure
az login

# Create resource group
az group create --name simplebiztoolkit-rg --location eastus

# Create App Service plan (F1 is free tier, B1 for production)
az appservice plan create \
  --name simplebiztoolkit-plan \
  --resource-group simplebiztoolkit-rg \
  --sku F1 \
  --is-linux

# Create web app
az webapp create \
  --name simplebiztoolkit-web \
  --resource-group simplebiztoolkit-rg \
  --plan simplebiztoolkit-plan \
  --runtime "NODE:20-lts"
```

2. **Configure GitHub Actions for CI/CD**

Create `.github/workflows/azure-deploy.yml`:
```yaml
name: Deploy to Azure App Service

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      
      - uses: azure/webapps-deploy@v3
        with:
          app-name: 'simplebiztoolkit-web'
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: .
```

3. **Get publish profile and add to GitHub Secrets**
```bash
az webapp deployment list-publishing-profiles \
  --name simplebiztoolkit-web \
  --resource-group simplebiztoolkit-rg \
  --xml
```
Add the XML output as `AZURE_WEBAPP_PUBLISH_PROFILE` secret in GitHub.

### Production Considerations

- **Custom Domain**: Configure in Azure Portal > App Service > Custom domains
- **SSL Certificate**: Use Azure-managed certificate (free with custom domain)
- **Scaling**: Upgrade to B1 or higher for production workloads
- **CDN**: Consider Azure CDN for static assets

---

## Alternative: Vercel
- Push the repo to GitHub.
- Import in Vercel.
- Build command: `npm run build`
- Output: handled by Vercel automatically.
- Set environment variables in Vercel dashboard.

---

## Alternative: Node server (any VPS)
- Build: `npm run build`
- Start: `npm run start`
- Run behind a reverse proxy (nginx/Caddy) and enable HTTPS.
- Use PM2 for process management:
```bash
npm install -g pm2
pm2 start npm --name "simplebiztoolkit" -- start
pm2 save
pm2 startup
```

---

## C# API Deployment (Separate Project)

The CMS backend API should be deployed as a separate Azure App Service or Azure Functions app.

### Recommended: Azure App Service (API)
```bash
# Create API app service
az webapp create \
  --name simplebiztoolkit-api \
  --resource-group simplebiztoolkit-rg \
  --plan simplebiztoolkit-plan \
  --runtime "DOTNET:8"
```

### Environment Variables for API
```
ConnectionStrings__DefaultConnection=your-db-connection-string
AzureAd__ClientId=your-azure-ad-app-id
AzureAd__TenantId=your-tenant-id
Jwt__Secret=your-jwt-secret-key
Storage__ConnectionString=your-blob-storage-connection
```

### API Project Structure
The C# API should implement the OpenAPI spec in `docs/api-spec.yaml`.

---

## SEO Endpoints
- `GET /sitemap.xml` - Dynamic sitemap generated from CMS posts
- `GET /robots.txt` - References the sitemap automatically

## Legacy Static Mode

If you need a fully static export (no SSR), you can:
1. Set `output: 'export'` in `next.config.ts`
2. Remove server-side features
3. Deploy to Azure Static Web Apps or any static host

Note: Static mode does not support the CMS admin features.


