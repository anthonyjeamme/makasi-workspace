import { TSectionDefinition } from 'libs/core/contexts/src/SiteContext/SiteContext.types';
import dynamic from 'next/dynamic';
// import ContactSection from './ContactSection/ContactSection';

const HeadSection = dynamic(() => import('./HeadSection/HeadSection'));
const ContactSection = dynamic(() => import('./ContactSection/ContactSection'));

export const sectionDefinitions: TSectionDefinition[] = [
  {
    type: 'head',
    Component: HeadSection,
  },
  {
    type: 'contact',
    Component: ContactSection,
  },
];
