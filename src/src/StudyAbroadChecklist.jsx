import { useEffect, useState } from "react";

const languages = {
  sv: {
    title: "Checklista – Studera utomlands",
    beforeMove: "Innan du flyttar",
    afterMove: "När du har flyttat",
    workRules: "Jobb & visumregler",
    compare: "Jämför länder",
    listBefore: {
      default: [
        "Ansök om pass och visum",
        "Sök till skolan",
        "Ordna boende",
        "Förbered din ekonomi",
        "Skaffa försäkring"
      ]
    },
    listAfter: {
      default: [
        "Registrera dig hos myndigheter",
        "Skaffa ID och bankkonto",
        "Hämta nycklar och skriv dig i bostaden",
        "Kolla upp kollektivtrafik och appar",
        "Delta i skolans introduktion"
      ]
    },
    workNote: "Med ett studentvisum får man oftast jobba max 20h/vecka."
  },
  en: {
    title: "Checklist – Study Abroad",
    beforeMove: "Before You Move",
    afterMove: "After You Move",
    workRules: "Work & Visa Rules",
    compare: "Compare Countries",
    listBefore: {
      default: [
        "Apply for passport and visa",
        "Get accepted to a university",
        "Find housing",
        "Sort out your finances",
        "Get health insurance"
      ]
    },
    listAfter: {
      default: [
        "Register with local authorities",
        "Set up a bank account and phone",
        "Pick up keys and move in",
        "Understand public transport",
        "Attend orientation week"
      ]
    },
    workNote: "With a student visa, you're usually allowed to work up to 20 hours/week."
  }
};

export default function StudyAbroadChecklist() {
  const getInitialLanguage = () => {
    if (typeof window !== "undefined") {
      const urlLang = new URLSearchParams(window.location.search).get("lang");
      const saved = localStorage.getItem("language");
      if (urlLang && languages[urlLang]) return urlLang;
      if (saved && languages[saved]) return saved;
    }
    return "sv";
  };

  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem("language", language);
    const params = new URLSearchParams(window.location.search);
    params.set("lang", language);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [language]);

  const lang = languages[language] || languages.sv;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>{lang.title}</h1>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="sv">Svenska</option>
          <option value="en">English</option>
        </select>
      </div>

      <h2>{lang.beforeMove}</h2>
      <ul>
        {lang.listBefore.default.map((item, i) => (
          <li key={`before-${i}`}>{item}</li>
        ))}
      </ul>

      <h2>{lang.afterMove}</h2>
      <ul>
        {lang.listAfter.default.map((item, i) => (
          <li key={`after-${i}`}>{item}</li>
        ))}
      </ul>

      <h2>{lang.workRules}</h2>
      <p>{lang.workNote}</p>
    </div>
  );
}
