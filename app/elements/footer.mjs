export default function footer({ html, state }) {
  return html`
    <footer>
      <p>Footer Widget</p>
      <pre>${JSON.stringify(state, null, 2)}</pre>
    </footer>
  `;
}
