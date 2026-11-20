export default function Home() {
  return (
    <main style={{ maxWidth: 760, margin: "0 auto" }}>
      <h1>Global Config Store transfer test</h1>
      <p>
        This app checks whether a deployed project can read a harmless test value
        from its connected Vercel Global Config Store.
      </p>
      <ol>
        <li>Configure the test store with the key <code>security_test</code>.</li>
        <li>Connect the store to this project&apos;s Production environment.</li>
        <li>Deploy and open <a href="/api/config-test">/api/config-test</a>.</li>
        <li>Record the response before and after the authorized transfer test.</li>
      </ol>
      <p>
        Do not put real secrets in the test store. Use a non-sensitive marker value.
      </p>
    </main>
  );
}
