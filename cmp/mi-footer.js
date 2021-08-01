class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
       
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
