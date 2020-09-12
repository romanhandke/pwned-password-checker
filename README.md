# Password Checker

Check a password against the haveibeenpwned API.

## Installation

`npm install @rhandke/password-checker`

## Usage

```
import PasswordChecker from "@rhandke/password-checker";

const passwordChecker = new PasswordChecker();
passwordChecker.hasBeenLeaked('password').then(response => {
  console.log(response);
})
```
