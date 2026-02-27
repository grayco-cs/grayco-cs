import { useState, useEffect, useRef, useCallback } from "react";

const DEFAULT_CONTENT = {
  heroTagline: "General Contractor • Memphis, TN",
  heroHeadline1: "Building With",
  heroHighlight: "Purpose",
  heroHeadline2: "& Precision",
  heroDescription: "From commercial build-outs to residential renovations, GrayCo Construction Services delivers quality craftsmanship and reliable project management across the Mid-South.",
  stat1Num: "100+", stat1Label: "Projects Completed",
  stat2Num: "100%", stat2Label: "Client Satisfaction",
  stat3Num: "Multi", stat3Label: "Trade Expertise",
  aboutText1: "GrayCo Construction Services is a full-service general contractor based in Bartlett, Tennessee. We bring deep technical knowledge across multiple construction trades to every project — from commercial tenant improvements to residential renovations, emergency water mitigation, and insurance restoration work.",
  aboutText2: "Our hands-on approach means we don't just manage projects — we understand them inside and out. With precise estimating, meticulous material takeoffs, and a methodical eye for detail, we deliver results that exceed expectations while keeping costs under control.",
  aboutBullet1: "Licensed & Insured",
  aboutBullet2: "TN License #85034",
  aboutBullet3: "Multi-Trade Expertise",
  aboutBullet4: "On-Time Delivery",
  contactAddress: "4007 Broadway Road, Bartlett, TN 38135",
  contactPhone: "(901) 585-0944",
  contactEmail: "office@grayco-cs.com",
  contactHours: "Mon – Fri, 7:00 AM – 5:00 PM",
  ctaHeadline: "Ready to Start Your Project?",
  ctaDescription: "Get a free consultation and detailed estimate for your next build.",
  footerLicense: "Licensed General Contractor — TN #85034 — 4007 Broadway Road, Bartlett, TN 38135",
  team: JSON.stringify([
    { name: "Nick Thomas", role: "Owner", email: "nthomas@grayco-cs.com", phone: "(901) 634-4354", bio: "Nick brings extensive construction management experience and a hands-on leadership style to every GrayCo project. His deep knowledge of commercial and residential construction ensures projects are delivered with precision and quality." },
    { name: "Wesley Johnson", role: "Owner", email: "wjohnson@grayco-cs.com", phone: "(901) 692-7255", bio: "Wesley's expertise spans estimating, project oversight, and client relations. His detail-oriented approach to material takeoffs and cost control keeps projects on budget while exceeding quality expectations." },
    { name: "Glenn Miller", role: "Commercial Project Manager", email: "", phone: "", bio: "Glenn oversees GrayCo's commercial projects from start to finish, coordinating trades, managing timelines, and ensuring every phase meets the company's high standards for quality and safety." },
    { name: "Dale Perritt", role: "Residential Project Manager", email: "", phone: "", bio: "Dale manages GrayCo's residential projects on site, handling day-to-day operations, subcontractor coordination, and quality control to deliver results on time and on budget." },
  ]),
  services: JSON.stringify([
    { title: "Commercial Construction", desc: "Tenant improvements, retail build-outs, restaurant construction, and office renovations delivered on time and on budget." },
    { title: "Residential Construction", desc: "Custom homes, renovations, additions, and property restorations with meticulous attention to detail and quality craftsmanship." },
    { title: "Emergency Water Mitigation", desc: "Rapid response water damage mitigation services to minimize loss and begin restoration immediately when disaster strikes." },
    { title: "Insurance Restoration", desc: "Full-scope insurance restoration work from initial assessment through final completion, working directly with adjusters and carriers." },
    { title: "Estimating & Takeoffs", desc: "Precise material takeoffs and cost estimating backed by deep trade knowledge across all construction disciplines." },
    { title: "Project Management", desc: "End-to-end project oversight ensuring quality, safety, and schedule adherence from groundbreaking to final punch list." },
  ]),
  projects: JSON.stringify([
    { title: "Commercial Tenant Finish-Out", category: "Commercial", description: "5,000 SF warehouse-to-commercial renovation including ADA bathrooms, car wash build-out inside warehouse area, flooring throughout, office build-outs, parking lot seal and stripe, signage, and new mechanicals.", sqft: "5,000 SF", duration: "8 Weeks", type: "Renovation" },
    { title: "Car Wash Renovation", category: "Commercial", description: "Full Division 9 interior renovation including office build-outs, acoustical ceilings, paint, flooring, parapet wall construction, and exterior siding installation.", sqft: "3,200 SF", duration: "10 Weeks", type: "Renovation" },
    { title: "Fire-Damaged Property Restoration", category: "Restoration", description: "Full structural restoration and renovation of a fire-damaged residential property, returned to better-than-original condition.", sqft: "1,600 SF", duration: "16 Weeks", type: "Restoration" },
    { title: "Attic-to-Living Space Conversion", category: "Residential", description: "Complete attic addition converting unused overhead space into 500 SF of finished living area, including a full bathroom build-out with new plumbing, electrical, HVAC extension, insulation, and code-compliant egress.", sqft: "500 SF", duration: "10 Weeks", type: "Addition" },
    { title: "Fire Damage Restoration", category: "Restoration", description: "Comprehensive structural and cosmetic restoration of a fire-damaged property, including demolition of compromised framing, full rebuild of affected areas, mechanical replacements, and interior finishes returned to pre-loss condition.", sqft: "2,400 SF", duration: "20 Weeks", type: "Restoration" },
    { title: "Whole-Home Renovation & Kitchen Remodel", category: "Residential", description: "Complete renovation of a 1,900 SF Bartlett residence anchored by a full kitchen remodel with load-bearing wall removal and engineered beam installation for an open-concept layout. Scope included both bathroom remodels with new tile showers, window replacement throughout, a full roof replacement, tree removal of two mature trees, and updated cabinetry, countertops, flooring, lighting, plumbing, and electrical.", sqft: "1,900 SF", duration: "12 Weeks", type: "Renovation" },
    { title: "Water Damage Restoration & Interior Rebuild", category: "Restoration", description: "Full water damage restoration of a Collierville residence including mitigation, structural dry-out, and complete interior rebuild. Scope included new hardwood flooring throughout, full cabinet replacement in kitchen and bathrooms, drywall repair, paint, trim, and restored finishes to pre-loss condition.", sqft: "1,800 SF", duration: "10 Weeks", type: "Restoration" },
  ]),
};

const COLORS = {
  navy: "#141463", navyLight: "#1e1e8a", navyDark: "#0e0e4a", darkBg: "#0b0b2e",
  medGray: "#555", lightGray: "#8a8aad", cream: "#f7f7fb", white: "#ffffff",
  accentGold: "#d4a843", black: "#0a0a1e", editHighlight: "#fff3cd", editBorder: "#d4a843",
};

const SERVICE_ICONS = {
  "Commercial Construction": <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="1.5"><rect x="3" y="10" width="18" height="11" rx="1"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/><line x1="8" y1="14" x2="8" y2="17"/><line x1="12" y1="14" x2="12" y2="17"/><line x1="16" y1="14" x2="16" y2="17"/></svg>,
  "Residential Construction": <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="1.5"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>,
  "Emergency Water Mitigation": <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
  "Insurance Restoration": <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  "Estimating & Takeoffs": <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/></svg>,
  "Renovation & Restoration": <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/></svg>,
  "Project Management": <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>,
};

function getServiceIcon(title) {
  return SERVICE_ICONS[title] || <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>;
}

const LOGO_SRC = "data:image/png;base64,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";

function Logo({ size = 40, variant = "dark" }) {
  // variant: "dark" = navy logo (for light bg), "light" = white logo (for dark bg), "muted" = faded white
  const filterMap = {
    dark: "none",
    light: "brightness(0) invert(1)",
    muted: "brightness(0) invert(1) opacity(0.4)",
  };
  return (
    <img
      src={LOGO_SRC}
      alt="GrayCo Construction Services"
      style={{
        height: size,
        width: "auto",
        filter: filterMap[variant] || "none",
        display: "block",
      }}
    />
  );
}

async function loadContent() {
  try {
    const result = await window.storage.get("grayco-site-content-v2");
    if (result && result.value) return { ...DEFAULT_CONTENT, ...JSON.parse(result.value) };
  } catch (e) {}
  return { ...DEFAULT_CONTENT };
}

async function saveContent(content) {
  try { await window.storage.set("grayco-site-content-v2", JSON.stringify(content)); return true; }
  catch (e) { return false; }
}

function EditableText({ value, fieldKey, isEditing, onUpdate, tag = "span", style = {}, multiline = false }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current && ref.current.innerText !== value) ref.current.innerText = value; }, [value, isEditing]);
  if (!isEditing) { const Tag = tag; return <Tag style={style}>{value}</Tag>; }
  return (
    <div ref={ref} contentEditable suppressContentEditableWarning
      onBlur={(e) => onUpdate(fieldKey, e.target.innerText)}
      style={{ ...style, outline: "none", borderBottom: `2px dashed ${COLORS.editBorder}`, background: `${COLORS.editHighlight}40`, padding: "2px 4px", cursor: "text", minHeight: multiline ? 60 : "auto", whiteSpace: multiline ? "pre-wrap" : style.whiteSpace || "normal" }} />
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useInView();
  return <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>{children}</div>;
}

function AdminBar({ isEditing, setIsEditing, onSave, onReset, saving }) {
  const [showLogin, setShowLogin] = useState(false);
  const [pass, setPass] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogin = () => { if (pass === "grayco2025") { setLoggedIn(true); setShowLogin(false); setIsEditing(true); } else { setPass(""); } };

  if (!loggedIn && !showLogin) return (
    <button onClick={() => setShowLogin(true)} title="Admin Login"
      style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999, width: 48, height: 48, borderRadius: "50%", border: "none", background: COLORS.navy, color: COLORS.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(20,20,99,0.3)", fontSize: 18, transition: "all 0.3s" }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>✎</button>
  );

  if (showLogin && !loggedIn) return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999, background: COLORS.white, padding: 24, borderRadius: 8, boxShadow: "0 8px 40px rgba(20,20,99,0.2)", border: "1px solid #e0e0ee", width: 280 }}>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.navy, marginBottom: 12 }}>Admin Login</div>
      <input type="password" placeholder="Enter password" value={pass} onChange={(e) => setPass(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        style={{ width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: 4, fontFamily: "'Outfit', sans-serif", fontSize: 13, marginBottom: 10, outline: "none", boxSizing: "border-box" }} />
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={handleLogin} style={{ flex: 1, padding: "10px", background: COLORS.navy, color: COLORS.white, border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600 }}>Login</button>
        <button onClick={() => { setShowLogin(false); setPass(""); }} style={{ padding: "10px 16px", background: "#f0f0f0", color: COLORS.medGray, border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 12 }}>Cancel</button>
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: COLORS.lightGray, marginTop: 8 }}>Default password: grayco2025</div>
    </div>
  );

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999, background: isEditing ? COLORS.accentGold : COLORS.navy, padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 -4px 20px rgba(0,0,0,0.15)", transition: "background 0.3s", flexWrap: "wrap", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: isEditing ? "#fff" : "#4ade80", animation: isEditing ? "pulse 1.5s infinite" : "none" }} />
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.white }}>{isEditing ? "EDIT MODE — Click highlighted text to edit" : "Admin Panel"}</span>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {isEditing ? (<>
          <button onClick={onSave} disabled={saving} style={{ padding: "8px 24px", background: COLORS.white, color: COLORS.navy, border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700, opacity: saving ? 0.7 : 1 }}>{saving ? "Saving..." : "Save Changes"}</button>
          <button onClick={() => setIsEditing(false)} style={{ padding: "8px 20px", background: "rgba(255,255,255,0.2)", color: COLORS.white, border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600 }}>Cancel</button>
          <button onClick={onReset} style={{ padding: "8px 20px", background: "rgba(220,38,38,0.8)", color: COLORS.white, border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600 }}>Reset</button>
        </>) : (<>
          <button onClick={() => setIsEditing(true)} style={{ padding: "8px 24px", background: COLORS.accentGold, color: COLORS.white, border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700 }}>Edit Site</button>
          <button onClick={() => { setLoggedIn(false); setIsEditing(false); }} style={{ padding: "8px 16px", background: "rgba(255,255,255,0.15)", color: COLORS.white, border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 12 }}>Logout</button>
        </>)}
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  );
}

function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const links = ["Home", "About", "Services", "Portfolio", "Team", "Transparency", "Contact"];
  const scrollTo = (id) => { setMenuOpen(false); document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(255,255,255,0.97)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid #e0e0ee" : "1px solid transparent", transition: "all 0.4s ease", padding: scrolled ? "10px 0" : "18px 0", boxShadow: scrolled ? "0 2px 20px rgba(20,20,99,0.06)" : "none" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ cursor: "pointer" }} onClick={() => scrollTo("Home")}><Logo size={36} variant={scrolled ? "dark" : "light"} /></div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="nav-desktop">
          {links.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: 1.2, textTransform: "uppercase", color: activeSection === l.toLowerCase() ? (scrolled ? COLORS.navy : COLORS.white) : (scrolled ? COLORS.medGray : "rgba(255,255,255,0.6)"), transition: "color 0.3s", borderBottom: activeSection === l.toLowerCase() ? `2px solid ${scrolled ? COLORS.navy : COLORS.white}` : "2px solid transparent", paddingBottom: 4 }}>{l}</button>
          ))}
          <button onClick={() => scrollTo("Contact")} style={{ padding: "10px 22px", background: scrolled ? COLORS.navy : "rgba(255,255,255,0.15)", border: scrolled ? "none" : "1px solid rgba(255,255,255,0.3)", color: COLORS.white, fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s", borderRadius: 2 }}>Get a Quote</button>
        </div>
        <button className="nav-mobile-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: 5, padding: 8 }}>
          {[0, 1, 2].map((i) => (<span key={i} style={{ width: 22, height: 2, background: scrolled ? COLORS.navy : COLORS.white, transition: "all 0.3s", transform: menuOpen && i === 0 ? "rotate(45deg) translateY(7px)" : menuOpen && i === 2 ? "rotate(-45deg) translateY(-7px)" : "none", opacity: menuOpen && i === 1 ? 0 : 1 }} />))}
        </button>
      </div>
      {menuOpen && (
        <div style={{ background: COLORS.white, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16, borderTop: "1px solid #e0e0ee" }}>
          {links.map((l) => (<button key={l} onClick={() => scrollTo(l)} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 500, letterSpacing: 1.2, textTransform: "uppercase", color: activeSection === l.toLowerCase() ? COLORS.navy : COLORS.medGray }}>{l}</button>))}
        </div>
      )}
    </nav>
  );
}

function Hero({ content, isEditing, onUpdate }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const E = (props) => <EditableText {...props} isEditing={isEditing} onUpdate={onUpdate} />;
  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(160deg, ${COLORS.darkBg} 0%, ${COLORS.navy} 40%, ${COLORS.navyLight} 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
      <div style={{ position: "absolute", right: "-5%", top: "50%", transform: "translateY(-50%)", opacity: 0.04 }}><Logo size={200} variant="muted" /></div>
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px", maxWidth: 900 }}>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease 0.2s", marginBottom: 32 }}><Logo size={64} variant="light" /></div>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease 0.3s" }}>
          <div style={{ display: "inline-block", padding: "8px 24px", border: "1px solid rgba(255,255,255,0.2)", fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>
            <E value={content.heroTagline} fieldKey="heroTagline" style={{ color: "inherit", fontSize: "inherit", fontFamily: "inherit" }} />
          </div>
        </div>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease 0.5s" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 7vw, 76px)", fontWeight: 600, color: COLORS.white, lineHeight: 1.1, margin: "0 0 24px" }}>
            <E value={content.heroHeadline1} fieldKey="heroHeadline1" style={{ color: "inherit" }} /><br />
            <E value={content.heroHighlight} fieldKey="heroHighlight" style={{ color: COLORS.accentGold }} />{" "}
            <E value={content.heroHeadline2} fieldKey="heroHeadline2" style={{ color: "inherit" }} />
          </h1>
        </div>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease 0.7s" }}>
          <E value={content.heroDescription} fieldKey="heroDescription" tag="p" multiline style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 580, margin: "0 auto 48px", fontWeight: 300 }} />
        </div>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease 0.9s" }}>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "16px 40px", background: COLORS.white, color: COLORS.navy, fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.3s" }}
            onMouseEnter={(e) => { e.target.style.background = COLORS.accentGold; e.target.style.color = COLORS.white; }} onMouseLeave={(e) => { e.target.style.background = COLORS.white; e.target.style.color = COLORS.navy; }}>Request a Quote</button>
          <button onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "16px 40px", background: "transparent", color: COLORS.white, fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer", transition: "all 0.3s" }}>View Our Work</button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(32px, 6vw, 80px)", marginTop: 80, opacity: loaded ? 1 : 0, transition: "all 0.8s ease 1.1s" }}>
          {[{ n: "stat1Num", l: "stat1Label" }, { n: "stat2Num", l: "stat2Label" }, { n: "stat3Num", l: "stat3Label" }].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <E value={content[s.n]} fieldKey={s.n} tag="div" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 600, color: COLORS.accentGold }} />
              <E value={content[s.l]} fieldKey={s.l} tag="div" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: 4 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About({ content, isEditing, onUpdate }) {
  const E = (props) => <EditableText {...props} isEditing={isEditing} onUpdate={onUpdate} />;
  return (
    <section id="about" style={{ padding: "120px 24px", background: COLORS.white, position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 60, height: 3, background: COLORS.navy }} />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn><div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.navy, marginBottom: 16, fontWeight: 600 }}>About GrayCo</div></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }} className="about-grid">
          <FadeIn delay={0.1}><h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 600, color: COLORS.navy, lineHeight: 1.2, margin: 0 }}>Craftsmanship meets <span style={{ color: COLORS.accentGold }}>modern precision</span></h2></FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <E value={content.aboutText1} fieldKey="aboutText1" tag="p" multiline style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, lineHeight: 1.85, color: COLORS.medGray, margin: "0 0 20px", fontWeight: 300 }} />
              <E value={content.aboutText2} fieldKey="aboutText2" tag="p" multiline style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, lineHeight: 1.85, color: COLORS.medGray, margin: "0 0 32px", fontWeight: 300 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {["aboutBullet1", "aboutBullet2", "aboutBullet3", "aboutBullet4"].map((key, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 7, height: 7, background: COLORS.navy, transform: "rotate(45deg)", flexShrink: 0 }} />
                    <E value={content[key]} fieldKey={key} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500, color: COLORS.navy }} />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Services({ content }) {
  const svcs = JSON.parse(content.services);
  return (
    <section id="services" style={{ padding: "120px 24px", background: COLORS.cream }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.navy, marginBottom: 16, fontWeight: 600 }}>What We Do</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 600, color: COLORS.navy, lineHeight: 1.2, margin: 0 }}>Our Services</h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: svcs.length > 6 ? "repeat(4, 1fr)" : "repeat(3, 1fr)", gap: 20 }} className="services-grid">
          {svcs.map((s, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div style={{ background: COLORS.white, padding: 28, borderBottom: "3px solid transparent", transition: "all 0.4s ease", cursor: "default", height: "100%", boxShadow: "0 1px 12px rgba(20,20,99,0.04)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderBottomColor = COLORS.navy; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(20,20,99,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderBottomColor = "transparent"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 12px rgba(20,20,99,0.04)"; }}>
                <div style={{ marginBottom: 16 }}>{getServiceIcon(s.title)}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 600, color: COLORS.navy, margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, lineHeight: 1.7, color: COLORS.medGray, margin: 0, fontWeight: 300 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioAdmin({ content, onUpdate }) {
  const [projs, setProjs] = useState(JSON.parse(content.projects));
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", category: "", description: "", sqft: "", duration: "", type: "", photo: "" });
  const fileRef = useRef(null);

  const saveAll = (updated) => { setProjs(updated); onUpdate("projects", JSON.stringify(updated)); };

  const startEdit = (idx) => { setEditing(idx); setForm({ ...projs[idx] }); };
  const startNew = () => { setEditing("new"); setForm({ title: "", category: "Commercial", description: "", sqft: "", duration: "", type: "", photo: "" }); };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((f) => ({ ...f, photo: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const saveItem = () => {
    if (!form.title) return;
    if (editing === "new") { saveAll([...projs, form]); }
    else { const u = [...projs]; u[editing] = form; saveAll(u); }
    setEditing(null);
  };

  const deleteItem = (idx) => { saveAll(projs.filter((_, i) => i !== idx)); };
  const moveItem = (idx, dir) => { const u = [...projs]; const t = u[idx]; u[idx] = u[idx + dir]; u[idx + dir] = t; saveAll(u); };

  const inputStyle = { width: "100%", padding: "10px 12px", border: "1px solid #dddde8", borderRadius: 4, fontFamily: "'Outfit', sans-serif", fontSize: 13, outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ background: COLORS.accentGold + "15", border: `2px dashed ${COLORS.accentGold}`, padding: 24, marginBottom: 32, maxWidth: 1100, margin: "0 auto 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, color: COLORS.navy }}>
          Portfolio Manager ({projs.length} projects)
        </div>
        <button onClick={startNew} style={{ padding: "8px 20px", background: COLORS.navy, color: COLORS.white, border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600 }}>
          + Add Project
        </button>
      </div>

      {editing !== null && (
        <div style={{ background: COLORS.white, padding: 20, border: "1px solid #dddde8", borderRadius: 8, marginBottom: 16 }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.navy, marginBottom: 12 }}>
            {editing === "new" ? "Add New Project" : `Editing: ${projs[editing]?.title}`}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.medGray, fontWeight: 500 }}>Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} placeholder="e.g. Car Wash Renovation" />
            </div>
            <div>
              <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.medGray, fontWeight: 500 }}>Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={inputStyle}>
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
                <option value="Specialty">Specialty</option>
                <option value="Restoration">Restoration</option>
                <option value="Insurance">Insurance</option>
                <option value="Water Mitigation">Water Mitigation</option>
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.medGray, fontWeight: 500 }}>Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} rows={3} placeholder="Describe the project scope..." />
            </div>
            <div>
              <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.medGray, fontWeight: 500 }}>Square Footage</label>
              <input value={form.sqft} onChange={(e) => setForm({ ...form, sqft: e.target.value })} style={inputStyle} placeholder="e.g. 3,200 SF" />
            </div>
            <div>
              <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.medGray, fontWeight: 500 }}>Duration</label>
              <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} style={inputStyle} placeholder="e.g. 10 Weeks" />
            </div>
            <div>
              <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.medGray, fontWeight: 500 }}>Type</label>
              <input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={inputStyle} placeholder="e.g. Renovation" />
            </div>
            <div>
              <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.medGray, fontWeight: 500 }}>Project Photo</label>
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
              <button onClick={() => fileRef.current?.click()} style={{ ...inputStyle, cursor: "pointer", background: form.photo ? "#e8f5e9" : COLORS.white, textAlign: "left", color: form.photo ? "#2e7d32" : COLORS.medGray }}>
                {form.photo ? "Photo added — Click to change" : "Click to upload photo"}
              </button>
            </div>
          </div>
          {form.photo && (
            <div style={{ marginTop: 10 }}>
              <img src={form.photo} alt="Preview" style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 4, border: "1px solid #ddd" }} />
              <button onClick={() => setForm({ ...form, photo: "" })} style={{ marginLeft: 8, background: "none", border: "none", color: "#d32f2f", cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 11 }}>Remove</button>
            </div>
          )}
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button onClick={saveItem} style={{ padding: "8px 24px", background: COLORS.navy, color: COLORS.white, border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600 }}>
              {editing === "new" ? "Add Project" : "Save Changes"}
            </button>
            <button onClick={() => setEditing(null)} style={{ padding: "8px 16px", background: "#f0f0f0", color: COLORS.medGray, border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 12 }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {projs.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: COLORS.white, border: "1px solid #eee", borderRadius: 6 }}>
            {p.photo ? (
              <img src={p.photo} alt="" style={{ width: 48, height: 36, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} />
            ) : (
              <div style={{ width: 48, height: 36, background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.navyLight})`, borderRadius: 4, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>No img</span>
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.navy }}>{p.title}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.lightGray }}>{p.category} · {p.sqft} · {p.duration}</div>
            </div>
            <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
              {i > 0 && <button onClick={() => moveItem(i, -1)} style={{ width: 28, height: 28, border: "1px solid #ddd", background: "none", cursor: "pointer", borderRadius: 4, fontSize: 12 }}>↑</button>}
              {i < projs.length - 1 && <button onClick={() => moveItem(i, 1)} style={{ width: 28, height: 28, border: "1px solid #ddd", background: "none", cursor: "pointer", borderRadius: 4, fontSize: 12 }}>↓</button>}
              <button onClick={() => startEdit(i)} style={{ padding: "4px 12px", background: COLORS.accentGold, color: COLORS.white, border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600 }}>Edit</button>
              <button onClick={() => deleteItem(i)} style={{ padding: "4px 10px", background: "#ffebee", color: "#d32f2f", border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600 }}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Portfolio({ content, isEditing, onUpdate }) {
  const projs = JSON.parse(content.projects);
  const [af, setAf] = useState("All");
  const cats = ["All", ...new Set(projs.map((p) => p.category))];
  const filtered = af === "All" ? projs : projs.filter((p) => p.category === af);
  const bgs = [`linear-gradient(135deg, ${COLORS.navy}, ${COLORS.navyLight})`, `linear-gradient(135deg, #1a2040, #2a3460)`, `linear-gradient(135deg, ${COLORS.navyDark}, #222266)`, `linear-gradient(135deg, #161640, #2a2a5a)`, `linear-gradient(135deg, #1e1848, #302868)`, `linear-gradient(135deg, #121238, #1e1e58)`];
  return (
    <section id="portfolio" style={{ padding: "120px 24px", background: COLORS.white }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.navy, marginBottom: 16, fontWeight: 600 }}>Our Work</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 600, color: COLORS.navy, lineHeight: 1.2, margin: 0 }}>Project Portfolio</h2>
          </div>
        </FadeIn>
        {isEditing && <PortfolioAdmin content={content} onUpdate={onUpdate} />}
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 48, flexWrap: "wrap" }}>
            {cats.map((c) => (<button key={c} onClick={() => setAf(c)} style={{ padding: "10px 22px", border: "none", cursor: "pointer", borderRadius: 2, fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", background: af === c ? COLORS.navy : "transparent", color: af === c ? COLORS.white : COLORS.medGray, transition: "all 0.3s" }}>{c}</button>))}
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: filtered.length <= 2 ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: 24, maxWidth: filtered.length <= 2 ? 760 : 1100, margin: "0 auto" }} className="portfolio-grid">
          {filtered.map((p, i) => (
            <FadeIn key={p.title + i} delay={i * 0.08}>
              <div style={{ background: COLORS.white, overflow: "hidden", transition: "all 0.4s", cursor: "default", boxShadow: "0 2px 16px rgba(20,20,99,0.06)", border: "1px solid #eeeef4" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(20,20,99,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(20,20,99,0.06)"; }}>
                <div style={{ height: 180, background: p.photo ? `url(${p.photo}) center/cover no-repeat` : bgs[i % bgs.length], display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                  {!p.photo && <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />}
                  {!p.photo && <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 600, color: "rgba(255,255,255,0.08)" }}>{String(i + 1).padStart(2, "0")}</div>}
                  <div style={{ position: "absolute", top: 12, left: 12, padding: "4px 12px", background: COLORS.accentGold, fontFamily: "'Outfit', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: COLORS.white }}>{p.category}</div>
                </div>
                <div style={{ padding: 24 }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 600, color: COLORS.navy, margin: "0 0 8px" }}>{p.title}</h3>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, lineHeight: 1.65, color: COLORS.medGray, margin: "0 0 16px", fontWeight: 300 }}>{p.description}</p>
                  <div style={{ display: "flex", gap: 16, borderTop: "1px solid #eeeef4", paddingTop: 12 }}>
                    {[["sqft", p.sqft], ["duration", p.duration], ["type", p.type]].map(([k, v]) => (
                      <div key={k}><div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700, color: COLORS.navy }}>{v}</div><div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, textTransform: "uppercase", letterSpacing: 1, color: COLORS.lightGray, fontWeight: 500 }}>{k}</div></div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamAdmin({ content, onUpdate }) {
  const [members, setMembers] = useState(JSON.parse(content.team));
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", role: "", email: "", phone: "", bio: "", photo: "" });
  const fileRef = useRef(null);

  const saveAll = (updated) => { setMembers(updated); onUpdate("team", JSON.stringify(updated)); };

  const startEdit = (idx) => { setEditing(idx); setForm({ photo: "", ...members[idx] }); };
  const startNew = () => { setEditing("new"); setForm({ name: "", role: "", email: "", phone: "", bio: "", photo: "" }); };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((f) => ({ ...f, photo: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const saveItem = () => {
    if (!form.name) return;
    if (editing === "new") { saveAll([...members, form]); }
    else { const u = [...members]; u[editing] = form; saveAll(u); }
    setEditing(null);
  };

  const deleteItem = (idx) => { saveAll(members.filter((_, i) => i !== idx)); };
  const moveItem = (idx, dir) => { const u = [...members]; const t = u[idx]; u[idx] = u[idx + dir]; u[idx + dir] = t; saveAll(u); };

  const inputStyle = { width: "100%", padding: "10px 12px", border: "1px solid #dddde8", borderRadius: 4, fontFamily: "'Outfit', sans-serif", fontSize: 13, outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ background: "rgba(212,168,67,0.1)", border: `2px dashed ${COLORS.accentGold}`, padding: 24, marginBottom: 32, maxWidth: 1100, margin: "0 auto 32px", borderRadius: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, color: COLORS.white }}>
          Team Manager ({members.length} members)
        </div>
        <button onClick={startNew} style={{ padding: "8px 20px", background: COLORS.accentGold, color: COLORS.white, border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600 }}>
          + Add Member
        </button>
      </div>

      {editing !== null && (
        <div style={{ background: COLORS.white, padding: 20, border: "1px solid #dddde8", borderRadius: 8, marginBottom: 16 }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.navy, marginBottom: 12 }}>
            {editing === "new" ? "Add New Team Member" : `Editing: ${members[editing]?.name}`}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.medGray, fontWeight: 500 }}>Name *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="e.g. John Smith" />
            </div>
            <div>
              <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.medGray, fontWeight: 500 }}>Role / Title</label>
              <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} style={inputStyle} placeholder="e.g. Project Manager" />
            </div>
            <div>
              <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.medGray, fontWeight: 500 }}>Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} placeholder="email@grayco-cs.com" />
            </div>
            <div>
              <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.medGray, fontWeight: 500 }}>Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} placeholder="(901) 555-1234" />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.medGray, fontWeight: 500 }}>Bio</label>
              <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} rows={3} placeholder="Brief description of role and expertise..." />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.medGray, fontWeight: 500 }}>Headshot Photo</label>
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
              <button onClick={() => fileRef.current?.click()} style={{ ...inputStyle, cursor: "pointer", background: form.photo ? "#e8f5e9" : COLORS.white, textAlign: "left", color: form.photo ? "#2e7d32" : COLORS.medGray }}>
                {form.photo ? "Photo added — Click to change" : "Click to upload headshot"}
              </button>
            </div>
          </div>
          {form.photo && (
            <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 12 }}>
              <img src={form.photo} alt="Preview" style={{ width: 64, height: 64, objectFit: "cover", borderRadius: "50%", border: "2px solid " + COLORS.accentGold }} />
              <button onClick={() => setForm({ ...form, photo: "" })} style={{ background: "none", border: "none", color: "#d32f2f", cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 11 }}>Remove photo</button>
            </div>
          )}
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button onClick={saveItem} style={{ padding: "8px 24px", background: COLORS.navy, color: COLORS.white, border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600 }}>
              {editing === "new" ? "Add Member" : "Save Changes"}
            </button>
            <button onClick={() => setEditing(null)} style={{ padding: "8px 16px", background: "#f0f0f0", color: COLORS.medGray, border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 12 }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {members.map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6 }}>
            {m.photo ? (
              <img src={m.photo} alt="" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%", flexShrink: 0, border: "2px solid " + COLORS.accentGold }} />
            ) : (
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.accentGold}, ${COLORS.navyLight})`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontWeight: 600, color: COLORS.white }}>
                {m.name.split(" ").map(w => w[0]).join("")}
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.white }}>{m.name}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{m.role}{m.email ? ` · ${m.email}` : ""}</div>
            </div>
            <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
              {i > 0 && <button onClick={() => moveItem(i, -1)} style={{ width: 28, height: 28, border: "1px solid rgba(255,255,255,0.15)", background: "none", cursor: "pointer", borderRadius: 4, fontSize: 12, color: COLORS.white }}>↑</button>}
              {i < members.length - 1 && <button onClick={() => moveItem(i, 1)} style={{ width: 28, height: 28, border: "1px solid rgba(255,255,255,0.15)", background: "none", cursor: "pointer", borderRadius: 4, fontSize: 12, color: COLORS.white }}>↓</button>}
              <button onClick={() => startEdit(i)} style={{ padding: "4px 12px", background: COLORS.accentGold, color: COLORS.white, border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600 }}>Edit</button>
              <button onClick={() => deleteItem(i)} style={{ padding: "4px 10px", background: "rgba(211,47,47,0.15)", color: "#ff6b6b", border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600 }}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Team({ content, isEditing, onUpdate }) {
  const members = JSON.parse(content.team);
  const initials = (name) => name.split(" ").map(w => w[0]).join("");
  return (
    <section id="team" style={{ padding: "120px 24px", background: `linear-gradient(160deg, ${COLORS.darkBg}, ${COLORS.navy})` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.accentGold, marginBottom: 16, fontWeight: 600 }}>Our Leadership</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 600, color: COLORS.white, lineHeight: 1.2, margin: 0 }}>Meet the Team</h2>
          </div>
        </FadeIn>
        {isEditing && <TeamAdmin content={content} onUpdate={onUpdate} />}
        <div style={{ display: "grid", gridTemplateColumns: members.length <= 3 ? `repeat(${members.length}, 1fr)` : members.length === 4 ? "repeat(4, 1fr)" : "repeat(3, 1fr)", gap: 24, justifyItems: "center" }} className="team-grid">
          {members.map((m, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{ textAlign: "center", padding: 32, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.4s", height: "100%" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                {m.photo ? (
                  <img src={m.photo} alt={m.name} style={{ width: 90, height: 90, borderRadius: "50%", margin: "0 auto 20px", objectFit: "cover", boxShadow: "0 4px 24px rgba(0,0,0,0.3)", border: `3px solid ${COLORS.accentGold}`, display: "block" }} />
                ) : (
                  <div style={{ width: 90, height: 90, borderRadius: "50%", margin: "0 auto 20px", background: `linear-gradient(135deg, ${COLORS.accentGold}, ${COLORS.navyLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, color: COLORS.white, boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>{initials(m.name)}</div>
                )}
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: COLORS.white, margin: "0 0 4px" }}>{m.name}</h3>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: COLORS.accentGold, fontWeight: 600, marginBottom: 14 }}>{m.role}</div>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", fontWeight: 300, margin: "0 0 14px" }}>{m.bio}</p>
                {m.email && <a href={`mailto:${m.email}`} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)", textDecoration: "none", display: "block", marginBottom: 4, transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.target.style.color = COLORS.accentGold} onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.35)"}>{m.email}</a>}
                {m.phone && <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{m.phone}</div>}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Transparency() {
  return (
    <section id="transparency" style={{ padding: "120px 24px", background: COLORS.cream, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${COLORS.navy} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.navy} 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.navy, marginBottom: 16, fontWeight: 600 }}>Full Visibility</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 600, color: COLORS.navy, lineHeight: 1.2, margin: "0 0 20px" }}>Your Project, <span style={{ color: COLORS.accentGold }}>Your Eyes On It</span></h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, lineHeight: 1.85, color: COLORS.medGray, fontWeight: 300, maxWidth: 680, margin: "0 auto" }}>
              We believe you should never have to wonder what's happening on your jobsite. That's why every GrayCo project is documented in real time through CompanyCam — giving you direct access to progress photos, scope details, and step-by-step checklists from anywhere, at any time.
            </p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 48 }} className="services-grid">
          {[
            { icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>, title: "Real-Time Photo Updates", desc: "Every phase of your project is captured and uploaded as it happens — no waiting for weekly reports or site visits to see where things stand." },
            { icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>, title: "Detailed Job Checklists", desc: "Follow along with every task on the build schedule. Each checklist item is documented so you can see exactly what's been completed and what's next." },
            { icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>, title: "Complete Transparency", desc: "No surprises, no guesswork. You get full visibility into the scope of work, material selections, and quality standards — from groundbreaking to final walkthrough." },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ background: COLORS.white, padding: 32, border: "1px solid #eeeef4", transition: "all 0.4s", height: "100%", textAlign: "center" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(20,20,99,0.08)"; e.currentTarget.style.borderBottom = `3px solid ${COLORS.accentGold}`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderBottom = "1px solid #eeeef4"; }}>
                <div style={{ marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: COLORS.navy, margin: "0 0 10px" }}>{item.title}</h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, lineHeight: 1.7, color: COLORS.medGray, fontWeight: 300, margin: 0 }}>{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div style={{ textAlign: "center" }}>
            <a href="https://app.companycam.com/projects" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", padding: "16px 48px", background: COLORS.navy, color: COLORS.white, fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s", cursor: "pointer" }}
              onMouseEnter={(e) => { e.target.style.background = COLORS.navyLight; e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.target.style.background = COLORS.navy; e.target.style.transform = "translateY(0)"; }}>
              View Our Projects on CompanyCam
            </a>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: COLORS.lightGray, fontWeight: 400, marginTop: 14 }}>
              Powered by CompanyCam — ask your project manager for direct access to your job.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function CtaBanner({ content, isEditing, onUpdate }) {
  const E = (props) => <EditableText {...props} isEditing={isEditing} onUpdate={onUpdate} />;
  return (
    <section style={{ padding: "80px 24px", background: COLORS.cream, textAlign: "center" }}>
      <FadeIn>
        <E value={content.ctaHeadline} fieldKey="ctaHeadline" tag="h2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 600, color: COLORS.navy, margin: "0 0 16px" }} />
        <E value={content.ctaDescription} fieldKey="ctaDescription" tag="p" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: COLORS.medGray, margin: "0 0 32px", fontWeight: 300 }} />
        <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          style={{ padding: "16px 48px", background: COLORS.navy, color: COLORS.white, fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.3s" }}
          onMouseEnter={(e) => { e.target.style.background = COLORS.navyLight; e.target.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.target.style.background = COLORS.navy; e.target.style.transform = "translateY(0)"; }}>Contact Us Today</button>
      </FadeIn>
    </section>
  );
}

function Reviews() {
  const googleLink = "https://g.page/r/CQstKeoJMtJEEBM/review";
  return (
    <section id="reviews" style={{ padding: "100px 24px", background: `linear-gradient(160deg, ${COLORS.darkBg}, ${COLORS.navy})`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", textAlign: "center" }}>
        <FadeIn>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.accentGold, marginBottom: 16, fontWeight: 600 }}>Client Feedback</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 600, color: COLORS.white, lineHeight: 1.2, margin: "0 0 16px" }}>What Our Clients <span style={{ color: COLORS.accentGold }}>Are Saying</span></h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, lineHeight: 1.85, color: "rgba(255,255,255,0.5)", fontWeight: 300, maxWidth: 600, margin: "0 auto 40px" }}>
            Your experience matters to us. See what past clients have to say, or share your own — we appreciate every review.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
            {[1,2,3,4,5].map((s) => (
              <svg key={s} width="32" height="32" viewBox="0 0 24 24" fill={COLORS.accentGold} stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.25}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={googleLink} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", background: COLORS.white, color: COLORS.navy, fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s", cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Find Us on Google
            </a>
            <a href={googleLink} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", background: "transparent", border: `2px solid ${COLORS.accentGold}`, color: COLORS.accentGold, fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s", cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = COLORS.accentGold; e.currentTarget.style.color = COLORS.white; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.accentGold; e.currentTarget.style.transform = "translateY(0)"; }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Leave Us a Review
            </a>
          </div>
        </FadeIn>
        <FadeIn delay={0.35}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 400, marginTop: 28 }}>
            Reviews help small businesses like ours grow — thank you for your support.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function Contact({ content, isEditing, onUpdate }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", projectType: "", message: "" });
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);
  const E = (props) => <EditableText {...props} isEditing={isEditing} onUpdate={onUpdate} />;
  const inputStyle = { width: "100%", padding: "14px 16px", border: "1px solid #dddde8", background: COLORS.white, color: COLORS.navy, fontFamily: "'Outfit', sans-serif", fontSize: 14, outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" };

  const handleFiles = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles].slice(0, 5));
  };
  const removeFile = (idx) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = () => {
    const subject = encodeURIComponent(`New Project Inquiry - ${form.projectType || "General"} - ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nProject Type: ${form.projectType}\n\nMessage:\n${form.message}\n\n${files.length > 0 ? `[${files.length} photo(s) attached - please reply to request photos via email]` : ""}`
    );
    window.open(`mailto:office@grayco-cs.com?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contact" style={{ padding: "120px 24px", background: COLORS.white }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="contact-grid">
          <FadeIn>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.navy, marginBottom: 16, fontWeight: 600 }}>Get In Touch</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 600, color: COLORS.navy, lineHeight: 1.2, margin: "0 0 24px" }}>Tell Us About <span style={{ color: COLORS.accentGold }}>Your Project</span></h2>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, lineHeight: 1.85, color: COLORS.medGray, margin: "0 0 48px", fontWeight: 300 }}>Ready for a quote? Share the details — scope of work, dimensions, timelines, and any photos of the jobsite or design inspiration you have in mind. The more we know upfront, the faster and more accurate your estimate will be.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {[{ label: "Address", key: "contactAddress" }, { label: "Office Phone", key: "contactPhone" }, { label: "Office Email", key: "contactEmail" }, { label: "Hours", key: "contactHours" }].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 20, height: 1, background: COLORS.navy, marginTop: 10, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: COLORS.navy, marginBottom: 4, fontWeight: 600 }}>{item.label}</div>
                      <E value={content[item.key]} fieldKey={item.key} tag="div" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: COLORS.medGray, fontWeight: 400 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32, padding: "16px 20px", background: COLORS.cream, border: "1px solid #eeeef4" }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: COLORS.navy, marginBottom: 8, fontWeight: 600 }}>Direct Contact</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.medGray, fontWeight: 400, lineHeight: 2 }}>
                  <strong style={{ color: COLORS.navy }}>Nick Thomas</strong> — <a href="tel:9016344354" style={{ color: COLORS.medGray, textDecoration: "none" }}>(901) 634-4354</a> — <a href="mailto:nthomas@grayco-cs.com" style={{ color: COLORS.navy, textDecoration: "none" }}>nthomas@grayco-cs.com</a><br />
                  <strong style={{ color: COLORS.navy }}>Wesley Johnson</strong> — <a href="tel:9016927255" style={{ color: COLORS.medGray, textDecoration: "none" }}>(901) 692-7255</a> — <a href="mailto:wjohnson@grayco-cs.com" style={{ color: COLORS.navy, textDecoration: "none" }}>wjohnson@grayco-cs.com</a>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            {submitted ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60, background: COLORS.cream, textAlign: "center", height: "100%", border: "1px solid #eeeef4" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${COLORS.navy}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: COLORS.navy, marginBottom: 20 }}>✓</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: COLORS.navy, margin: "0 0 8px", fontWeight: 600 }}>Message Sent</h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.medGray, fontWeight: 300 }}>Your email client should have opened with your message. We'll be in touch within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", projectType: "", message: "" }); setFiles([]); }}
                  style={{ marginTop: 20, padding: "10px 24px", background: "transparent", border: `1px solid ${COLORS.navy}`, color: COLORS.navy, fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}>Send Another</button>
              </div>
            ) : (
              <div style={{ background: COLORS.cream, padding: 40, border: "1px solid #eeeef4" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <input placeholder="Your Name *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} onFocus={(e) => e.target.style.borderColor = COLORS.navy} onBlur={(e) => e.target.style.borderColor = "#dddde8"} />
                    <input placeholder="Email *" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} onFocus={(e) => e.target.style.borderColor = COLORS.navy} onBlur={(e) => e.target.style.borderColor = "#dddde8"} />
                  </div>
                  <input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} onFocus={(e) => e.target.style.borderColor = COLORS.navy} onBlur={(e) => e.target.style.borderColor = "#dddde8"} />
                  <select value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })} style={{ ...inputStyle, color: form.projectType ? COLORS.navy : COLORS.lightGray, appearance: "none" }} onFocus={(e) => e.target.style.borderColor = COLORS.navy} onBlur={(e) => e.target.style.borderColor = "#dddde8"}>
                    <option value="" disabled>Project Type</option>
                    <option value="Commercial Construction">Commercial Construction</option>
                    <option value="Residential Construction">Residential Construction</option>
                    <option value="Emergency Water Mitigation">Emergency Water Mitigation</option>
                    <option value="Insurance Restoration">Insurance Restoration</option>
                    <option value="Renovation / Restoration">Renovation / Restoration</option>
                    <option value="Estimating / Takeoff">Estimating / Takeoff</option>
                    <option value="Other">Other</option>
                  </select>
                  <textarea placeholder="Tell us about your project..." rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} onFocus={(e) => e.target.style.borderColor = COLORS.navy} onBlur={(e) => e.target.style.borderColor = "#dddde8"} />

                  {/* Photo Upload */}
                  <div>
                    <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: "none" }} />
                    <button onClick={() => fileInputRef.current?.click()} type="button"
                      style={{ width: "100%", padding: "14px 16px", border: "1px dashed #b0b0c8", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.3s", boxSizing: "border-box" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.navy; e.currentTarget.style.background = `${COLORS.navy}05`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#b0b0c8"; e.currentTarget.style.background = "transparent"; }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.navy, fontWeight: 500 }}>
                        {files.length === 0 ? "Add Project Photos (up to 5)" : `${files.length} photo${files.length > 1 ? "s" : ""} selected — Add more`}
                      </span>
                    </button>
                    {files.length > 0 && (
                      <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                        {files.map((f, i) => (
                          <div key={i} style={{ position: "relative", width: 64, height: 64, borderRadius: 4, overflow: "hidden", border: "1px solid #dddde8" }}>
                            <img src={URL.createObjectURL(f)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <button onClick={() => removeFile(i)} style={{
                              position: "absolute", top: 2, right: 2, width: 18, height: 18, borderRadius: "50%",
                              background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", cursor: "pointer",
                              fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1,
                            }}>✕</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button onClick={handleSubmit}
                    style={{ padding: "16px 40px", background: COLORS.navy, color: COLORS.white, fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.3s", width: "100%" }}
                    onMouseEnter={(e) => e.target.style.background = COLORS.navyLight} onMouseLeave={(e) => e.target.style.background = COLORS.navy}>Send to office@grayco-cs.com</button>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.lightGray, textAlign: "center", fontWeight: 300 }}>
                    Opens your email client with your message pre-filled. Attach your photos directly in the email.
                  </div>
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Footer({ content, isEditing, onUpdate }) {
  const E = (props) => <EditableText {...props} isEditing={isEditing} onUpdate={onUpdate} />;
  return (
    <footer style={{ padding: "48px 24px 80px", background: COLORS.darkBg, borderTop: `1px solid ${COLORS.navyDark}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Logo size={28} variant="muted" />
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>© 2025 GrayCo Construction Services. All rights reserved.</span>
        </div>
        <E value={content.footerLicense} fieldKey="footerLicense" tag="div" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.25)", fontWeight: 300 }} />
      </div>
    </footer>
  );
}

export default function App() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => { loadContent().then((c) => { setContent(c); setLoaded(true); }); }, []);
  useEffect(() => {
    const sections = ["home", "about", "services", "portfolio", "team", "transparency", "contact"];
    const obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); }, { threshold: 0.3 });
    sections.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [loaded]);

  const handleUpdate = useCallback((key, value) => { setContent((prev) => ({ ...prev, [key]: value })); }, []);
  const handleSave = async () => { setSaving(true); const ok = await saveContent(content); setSaving(false); if (ok) { setIsEditing(false); } };
  const handleReset = async () => { setContent({ ...DEFAULT_CONTENT }); await saveContent(DEFAULT_CONTENT); setIsEditing(false); };

  if (!loaded) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.darkBg }}><Logo size={60} variant="muted" /></div>;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${COLORS.white}; overflow-x: hidden; }
        ::placeholder { color: ${COLORS.lightGray}; }
        ::selection { background: ${COLORS.navy}20; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .portfolio-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .team-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .services-grid { grid-template-columns: 1fr 1fr !important; }
          .portfolio-grid { grid-template-columns: 1fr 1fr !important; }
          .team-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
      <Nav activeSection={activeSection} />
      <Hero content={content} isEditing={isEditing} onUpdate={handleUpdate} />
      <About content={content} isEditing={isEditing} onUpdate={handleUpdate} />
      <Services content={content} />
      <CtaBanner content={content} isEditing={isEditing} onUpdate={handleUpdate} />
      <Portfolio content={content} isEditing={isEditing} onUpdate={handleUpdate} />
      <Team content={content} isEditing={isEditing} onUpdate={handleUpdate} />
      <Transparency />
      <Reviews />
      <Contact content={content} isEditing={isEditing} onUpdate={handleUpdate} />
      <Footer content={content} isEditing={isEditing} onUpdate={handleUpdate} />
      <AdminBar isEditing={isEditing} setIsEditing={setIsEditing} onSave={handleSave} onReset={handleReset} saving={saving} />
    </>
  );
}
