# Pull Request - Access Control and Logout Functionality (feat: RSS-EC-01)

## Overview

This pull request is about ensuring that only logged-in users can access core application functionality, as well as implementing a logout mechanism that erases the user's first and last name from local storage in RSS Puzzle. It meets the requirements specified in the feature ticket RSS-PZ-04.

## Features implemented

- **Access Control:**: Determines the login status by checking if the username is in the local storage. Redirects users who do not have this criterion to the login page.
- **Home Page**: Add button log-out at home page when user is login.
- **Direct Navigation for Logged-In Users**: Automatically direct users with stored login credentials to the start screen.

## Technical Details

- Add log-out functionality
- Add opportunity to clear Storage
- Implement content page change without reload.

## Screenshots
