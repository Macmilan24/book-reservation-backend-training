## My Testing Contribution

I added automated backend tests to this book reservation app and set it up to run with GitHub Actions. Here’s what I did:

### What I Added

- **Test File**: I created `tests/app.test.js` to check if the backend works right. It tests:
  - `GET /api/books`: Makes sure it returns a 200 status and an array of books (even if it’s empty). This hits the `getBooks` function in `controllers/bookController.js`.
  - `GET /api/books/:id`: Checks that it returns a 404 with a "Book not found" message for a fake ID, testing the `getBook` function.
- **Mongoose Mocking**: Since the app uses MongoDB and I didn’t want tests to rely on a real database, I mocked Mongoose with Jest. It was tricky at first—kept hitting errors like `TypeError: Cannot read properties of undefined (reading 'ObjectId')` and `UserSchema.pre is not a function`—but I got it working by mocking `Schema`, `Types.ObjectId`, and even the `pre` method for the User model’s password hashing hook.
- **GitHub Actions**: I set up `.github/workflows/test.yml` to run the tests automatically on every push and pull request to the `main` branch. It uses Node.js 14, installs dependencies with `npm ci`, and runs `npm test`. You can see it in the "Actions" tab!

### How to Run It

- **Locally**: Just use `npm test` to run the tests. I set it up with Jest and Supertest in `package.json`.
- **Coverage**: I tweaked the test script to `jest --coverage` so you can see how much code is covered.

### Challenges I Faced

Getting the mock right took some trial and error. The app loads a bunch of models (like `Notification.js` and `User.js`) when it starts, and they needed stuff like `ObjectId` and `pre` hooks. I figured out how to mock those so the tests could focus on the API without needing MongoDB running. It’s all in `tests/app.test.js` now, and it works smoothly.

---
