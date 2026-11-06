export const profile = {
  name: 'Eric Coupal',
  // Contact options: each one is shown only when set. LinkedIn is the main contact button.
  email: undefined as string | undefined,
  links: { linkedin: 'https://www.linkedin.com/in/ericcoupal/' } as { linkedin?: string; github?: string },
  // Files in public/. Remove an entry to hide the CV button for that language.
  cv: { fr: 'cv-fr.pdf', en: 'cv-en.pdf' },
  yearsOfExperience: 20, // shown as "20+"
};
