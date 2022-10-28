import dynamic from 'next/dynamic';
// import ContactSection from './ContactSection/ContactSection';

const HeadSection = dynamic(() => import('./HeadSection/HeadSection'));

const ContactSection = dynamic(() => import('./ContactSection/ContactSection'));

export const sectionDefinitions = [
  {
    type: 'head',
    Component: HeadSection,
  },
  {
    type: 'contact',
    Component: ContactSection,
  },
];
