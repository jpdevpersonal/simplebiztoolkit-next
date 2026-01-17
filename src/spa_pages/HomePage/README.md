# HomePage Tests

This directory contains the HomePage component and its comprehensive unit tests.

## Structure

```
HomePage/
├── HomePage.tsx          # Main HomePage component
├── HomePage.test.tsx     # Comprehensive unit tests
└── index.ts             # Barrel export
```

## Test Coverage

The test suite includes **31 comprehensive tests** organized into the following categories:

### 1. SEO and Metadata (2 tests)
- Validates SEO component receives correct title, description, and canonical path
- Verifies JSON-LD structured data for organization schema

### 2. Hero Section (7 tests)
- Main heading and value proposition
- Supporting description text
- Primary CTA (Shop on Etsy button)
- Secondary CTA (Browse products link)
- Trust indicators in TrustBar
- Testimonial quote display
- Hero image with proper alt text

### 3. Featured Products Section (3 tests)
- Section heading
- ProductGrid component renders with correct featured products
- Explanatory text about Etsy checkout

### 4. Value Propositions Section (3 tests)
- Section heading
- All three value proposition cards
- Descriptive text for each value prop

### 5. Testimonials Section (4 tests)
- Section heading
- TestimonialGrid component
- Link to testimonials page
- CTA to shop on Etsy

### 6. Lead Magnet Section (5 tests)
- Section heading
- Value proposition messaging
- Benefit list items
- EmailCaptureForm with source tracking
- Privacy and unsubscribe disclaimer

### 7. Content Structure (2 tests)
- Proper semantic HTML section hierarchy
- Correct ordering of major sections

### 8. Links and Navigation (2 tests)
- External links have security attributes (target="_blank", rel="noopener noreferrer")
- Internal links don't have external attributes

### 9. Accessibility (2 tests)
- Proper heading hierarchy (single h1, multiple h2s)
- Descriptive alt text for images

### 10. Data Integration (1 test)
- Featured products correctly fetched from categories

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm test -- --run

# Run tests with UI
npm test:ui

# Run tests with coverage
npm test -- --coverage
```

## Mocking Strategy

The tests use comprehensive mocking to isolate the HomePage component:

### Component Mocks
- **Seo**: Mocked to verify props without rendering Helmet
- **TrustBar**: Mocked to render trust items as simple spans
- **EmailCaptureForm**: Mocked to verify source tracking
- **TestimonialGrid**: Mocked to avoid rendering complex testimonial data
- **ProductGrid**: Mocked to verify product count

### Data Mocks
- **categories**: Three test categories with mock products
- **LINKS**: Mock Etsy shop URL and freebie page

### Router Mocks
- **react-router-dom**: Link component mocked as anchor tag for testing

## Key Testing Principles

1. **Isolation**: Component tested in isolation using mocks
2. **User-centric**: Tests focus on what users see and interact with
3. **Comprehensive**: All major sections and features covered
4. **Maintainable**: Well-organized with descriptive test names and comments
5. **Type-safe**: Written in TypeScript for type safety

## Test Comments

Each test includes comments explaining:
- **What** is being tested
- **Why** it matters
- **How** the test validates the requirement

Example:
```typescript
it("should render primary CTA button linking to Etsy shop", () => {
  renderHomePage();

  // Find all "Shop on Etsy" buttons - there are multiple on the page
  const etsyButtons = screen.getAllByRole("link", { name: /Shop on Etsy/i });

  // Verify at least one exists with correct attributes
  expect(etsyButtons.length).toBeGreaterThan(0);
  expect(etsyButtons[0]).toHaveAttribute('href', 'https://www.etsy.com/shop/simplebiztoolkit');
  expect(etsyButtons[0]).toHaveAttribute('target', '_blank');
  expect(etsyButtons[0]).toHaveAttribute('rel', 'noopener noreferrer');
});
```

## Common Patterns

### Rendering with Router
```typescript
const renderHomePage = () => {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
};
```

### Testing Headings
```typescript
const heading = screen.getByRole("heading", { 
  name: /Expected text/i,
  level: 1 
});
expect(heading).toBeInTheDocument();
```

### Testing Links
```typescript
const link = screen.getByRole("link", { name: /Link text/i });
expect(link).toHaveAttribute('href', '/expected-path');
```

### Testing Multiple Elements
```typescript
// When there are multiple elements with same text
const elements = screen.getAllByRole("link", { name: /Text/i });
expect(elements.length).toBeGreaterThan(0);
```

## Extending the Tests

When adding new features to HomePage:

1. Add tests to the appropriate describe block
2. Use clear, descriptive test names
3. Add comments explaining what's being tested
4. Follow the existing patterns for consistency
5. Ensure tests are isolated and don't depend on other tests

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
