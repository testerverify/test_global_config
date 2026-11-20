# Global Config Store transfer test

A minimal Next.js application for checking whether a deployed Vercel project can read a harmless value from its connected Global Config Store before and after a controlled transfer test.

## 1. Create a test Global Config Store

Use a dedicated test store and a non-sensitive marker value:

- Key: `security_test`
- Value: `TRANSFER_TEST_SUCCESS`

Do not use production secrets or sensitive customer data.

## 2. Add the project connection

1. Import this repository into Vercel.
2. Connect the test Global Config Store to the project.
3. Ensure it is connected to the **Production** environment.
4. Confirm the project's `EDGE_CONFIG` environment variable is populated by the Vercel integration/connection.
5. Deploy the project.

If the integration does not populate `EDGE_CONFIG` automatically, add the store's connection string as the `EDGE_CONFIG` environment variable in the Vercel project settings. Do not commit the connection string to GitHub.

## 3. Establish the baseline

Open:

`https://YOUR-PROJECT.vercel.app/api/config-test`

Expected response when the connection works and the key exists:

```json
{
  "success": true,
  "key": "security_test",
  "valueFound": true,
  "value": "TRANSFER_TEST_SUCCESS"
}
```

Save the timestamp and response. Also capture the Vercel dashboard showing the Production project connection.

## 4. Perform the controlled transfer test

Using the test accounts and test teams authorized for this assessment:

1. Confirm the Developer cannot directly disconnect the Production project.
2. Confirm the Developer cannot delete the token while it is in use, if that is the observed behavior.
3. As the Developer, transfer the test Global Config Store to the destination team.
4. Do not manually change the project's environment variables or redeploy yet.
5. Call `/api/config-test` again and save the complete response.
6. Then trigger a new Production deployment and call the endpoint again.

Compare the existing deployment and the new deployment separately. This helps distinguish an effect on already-running deployments from an effect on new deployments.

## 5. Evidence to collect

- Baseline endpoint response before transfer.
- Dashboard showing the Production project connected to the store.
- Permission-denied evidence for direct disconnect/token deletion.
- Transfer success evidence from the Developer account.
- Dashboard showing the project detached after transfer.
- Endpoint response after transfer, from the existing deployment.
- Endpoint response after a new deployment.

## Notes and limitations

- A dashboard disconnection alone does not prove production downtime.
- Existing deployments may continue working if they retain a valid connection string or token.
- A new deployment may behave differently from an existing deployment.
- The endpoint returns only the test marker value. Keep that value non-sensitive.
- Run this only against resources and teams you own or are explicitly authorized to test.
- Do not use this test to disrupt a real production service.

## Local development

```bash
npm install
cp .env.example .env.local
# Set EDGE_CONFIG in .env.local using a test store connection string.
npm run dev
```

Open `http://localhost:3000/api/config-test`.
