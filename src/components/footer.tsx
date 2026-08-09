export function Footer() {
  return (
    <footer className="site-footer is-full-width">
      <div className="footer-shell">
        <section className="footer-banner">
          <div>
            <p>(Start a project)</p>
            <h2>Make the next<br /><em>move matter.</em></h2>
            <a href="/hubungi">Tell us everything <span>↗</span></a>
          </div>
          <div className="footer-orbit" aria-hidden="true"><i /><i /><b>JCP</b></div>
        </section>
        <div className="footer-grid">
          <div className="footer-company">
            <img className="footer-company-logo" src="/jcp-logo-nav.png" alt="JCP - Jogja Creative Production" width="288" height="288" loading="lazy" />
            <p>PT Jogja Creative Production<br />Yogyakarta, Indonesia</p>
            <div>
              <a href="tel:+6285600604388">+62 856-0060-4388</a>
              <a href="mailto:jogjacreativeproduction@gmail.com">jogjacreativeproduction@gmail.com</a>
            </div>
          </div>
          <div>
            <span>Quick links</span>
            <a href="/tentang">Tentang JCP</a>
            <a href="/layanan">Layanan</a>
            <a href="/portfolio">Portofolio</a>
            <a href="/hubungi">Hubungi kami</a>
          </div>
          <div>
            <span>Creative units</span>
            <a href="/layanan/north-production">North Production</a>
            <a href="/layanan/north-creative">North Creative</a>
            <a href="/layanan/north-booth">North Photobooth</a>
            <a href="/layanan/virtual-tour-360">Virtual Tour 360</a>
            <a href="/layanan/drone-training">Drone Training</a>
            <a href="/layanan/ai-kreasi-cerdas">AI Kreasi Cerdas</a>
          </div>
          <div>
            <span>Follow JCP</span>
            <a href="https://wa.me/6285600604388">WhatsApp ↗</a>
            <a href="https://www.instagram.com/jogjacreativeproduction/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href="mailto:jogjacreativeproduction@gmail.com">Email us ↗</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>PT Jogja Creative Production. All rights reserved.</p>
          <p>Yogyakarta / Indonesia</p>
        </div>
      </div>
     </footer>
  );
}
