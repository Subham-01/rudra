# Project Architecture Documentation

## Directory Structure

```
src/
  /modules
    /feature1
      /data
        /models          # Data models used by feature1
        /repositories    # Data access and manipulation for feature1
      /domain
        /entities        # Business logic entities for feature1
        /use_cases       # Use cases for feature1 (business rules)
      /components
        feature1_component.dart  # UI components specific to feature1
      /providers        # State management for feature1
    /feature2
      /data
        /models          # Data models used by feature2
        /repositories    # Data access and manipulation for feature2
      /domain
        /entities        # Business logic entities for feature2
        /use_cases       # Use cases for feature2 (business rules)
      /components
        feature2_component.dart  # UI components specific to feature2
      /providers        # State management for feature2


  /core
    /data                # Shared data layer
      /models            # Shared data models
      /repositories      # Shared data access and manipulation
      /services
    /errors              # Application-wide error handling
    /use_cases           # Application-wide use cases
    /utils               # Utility functions and constants
    /routing
      routes.dart        # Definitions of routes
      route_generator.dart  # Logic for generating routes
    /services           # Application-wide services
    /theme              # Application-wide theme data
    /extensions         # Application-wide extension methods
    /mixins             # Application-wide mixins
  /pages
    home_page.dart       # Home page of the application
    feature1_page.dart   # Page for feature1
    feature2_page.dart   # Page for feature2
  /widgets              # Application-wide reusable widgets
  /l10n                 # Localization files
  /config               # Environment-specific configurations
test/
  /unit                 # Unit tests
    /modules
      /feature1
        /data              # Unit tests for data layer of feature1
        /domain            # Unit tests for domain layer of feature1
        /presentation      # Unit tests for presentation layer of feature1
      /feature2
        /data              # Unit tests for data layer of feature2
        /domain            # Unit tests for domain layer of feature2
        /presentation      # Unit tests for presentation layer of feature2
    /core                  # Unit tests for core functionality
  /integration           # Integration tests
  /mocks                 # Mock objects for testing
```

## Architecture Overview

This project follows a modular architecture pattern with clear separation of concerns:

### Modules
Each feature is organized as a separate module with its own:
- **Data Layer**: Models and repositories for data access
- **Domain Layer**: Business logic entities and use cases
- **Presentation Layer**: UI components and state management

### Core
Shared functionality and utilities used across the application:
- Common data models and services
- Error handling
- Routing configuration
- Theme and styling
- Utility functions

### Pages
Main application screens and navigation destinations.

### Testing
Comprehensive test coverage with unit tests for each layer and integration tests.