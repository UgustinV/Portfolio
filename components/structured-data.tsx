export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Augustin Viard",
    "jobTitle": "Développeur Web Full-Stack",
    "url": "https://augustinviard.dev",
    "sameAs": [
      "https://github.com/ugustinv",
      "https://linkedin.com/in/augustin-viard-1a365b314/",
      "https://x.com/AugustinViard"
    ],
    "knowsAbout": ["React", "Next.js", "TypeScript", "Node.js", "JavaScript"],
    "description": "Développeur web full-stack spécialisé en React, Next.js et TypeScript"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}