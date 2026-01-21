# Feature Flag Configuration for Azure Static Web Apps

This document explains how to configure feature flags for the Simple Biz Toolkit website in Azure Static Web Apps.

## Available Feature Flags

### Show Free Guide Button
- **Environment Variable**: `NEXT_PUBLIC_ SHOW_FREE_GUIDE_BUTTON`
- **Default Value**: `true` (button is shown)
- **Possible Values**: 
  - `true` or not set → Button is visible
  - `false` → Button is hidden

This flag controls the visibility of the "Get Your Free Guide" button across all pages of the site, including:
- Mobile sticky CTA bar
- Navigation menu
- Other locations where the button appears

## How to Configure in Azure Static Web Apps

### Option 1: Using Azure Portal (Recommended)

1. **Navigate to your Static Web App**:
   - Go to [Azure Portal](https://portal.azure.com)
   - Find your Static Web App resource
   - Select it to open the overview

2. **Open Configuration**:
   - In the left menu, click on **Configuration** (under Settings)

3. **Add Application Setting**:
   - Click **+ Add** button
   - Enter the following:
     - **Name**: `NEXT_PUBLIC_ SHOW_FREE_GUIDE_BUTTON`
     - **Value**: `false` (to hide the button) or `true` (to show the button)
   - Click **OK**

4. **Save Changes**:
   - Click **Save** at the top of the Configuration page

5. **Rebuild the Site**:
   - The site needs to be rebuilt for the changes to take effect
   - You can trigger a rebuild by:
     - Pushing a new commit to your repository
     - Or manually triggering a redeployment in GitHub Actions (if using GitHub)

### Option 2: Using Azure CLI

```bash
# Set the variable to hide the button
az staticwebapp appsettings set \
  --name <your-static-web-app-name> \
  --resource-group <your-resource-group-name> \
  --setting-names NEXT_PUBLIC_ SHOW_FREE_GUIDE_BUTTON=false

# Or to show the button (default behavior)
az staticwebapp appsettings set \
  --name <your-static-web-app-name> \
  --resource-group <your-resource-group-name> \
  --setting-names NEXT_PUBLIC_ SHOW_FREE_GUIDE_BUTTON=true
```

After setting the variable, trigger a rebuild of your site.

### Option 3: Using GitHub Actions (Build-time Configuration)

If you're deploying via GitHub Actions, you can set the environment variable in your workflow file:

```yaml
- name: Build And Deploy
  uses: Azure/static-web-apps-deploy@v1
  with:
    # ... other configuration
  env:
    NEXT_PUBLIC_ SHOW_FREE_GUIDE_BUTTON: 'false'  # or 'true'
```

## Important Notes

1. **Build-time Variable**: Since this is a static site, the environment variable is read at **build time**, not runtime. Any changes require a rebuild and redeployment.

2. **NEXT_PUBLIC_ Prefix**: The `NEXT_PUBLIC_` prefix is required for the variable to be available in the browser/client-side code.

3. **Default Behavior**: If the variable is not set or set to any value other than `'false'`, the button will be shown by default.

4. **Testing Locally**: 
   - Create a `.env.local` file in your project root (this file is gitignored)
   - Add: `NEXT_PUBLIC_ SHOW_FREE_GUIDE_BUTTON=false`
   - Run `npm run build` and `npm run start` to test the static build locally

## Troubleshooting

If the button visibility doesn't change after updating the configuration:

1. **Verify the setting is saved** in Azure Portal → Configuration
2. **Check the variable name** matches exactly: `NEXT_PUBLIC_ SHOW_FREE_GUIDE_BUTTON`
3. **Ensure you've rebuilt the site** after changing the configuration
4. **Clear your browser cache** or use incognito mode to see fresh changes
5. **Check build logs** to confirm the environment variable was available during build

## Adding New Feature Flags

To add new feature flags in the future:

1. Add the flag to [src/config/featureFlags.ts](src/config/featureFlags.ts)
2. Use the `NEXT_PUBLIC_` prefix for any client-side variables
3. Document the flag in this file
4. Update [.env.example](.env.example) with the new variable
