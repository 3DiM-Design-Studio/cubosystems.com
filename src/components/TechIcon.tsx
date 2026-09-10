import Image from 'next/image';
import type { IconType } from 'react-icons';
import {
  SiAngular, SiJquery, SiJoomla, SiJavascript, SiBootstrap,
  SiPhp, SiPython, SiFlutter, SiReact, SiDotnet, SiSpring,
  SiGooglegemini, SiApachehadoop, SiWordpress, SiHubspot,
  SiNextdotjs, SiTypescript, SiNodedotjs, SiExpress, SiLaravel, SiRubyonrails,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbBrandAzure, TbBrandVisualStudio, TbSql, TbCpu } from 'react-icons/tb';

// SharePoint's real mark: a tilted blue page/flag with a white "S" cutout,
// plus a small chevron — no maintained icon set carries it, so it's drawn
// here at the same weight as the imported brand marks. The "S" is cut out
// of the shape via mask (rendered as the badge's own background color)
// rather than a hardcoded fill, so the whole glyph stays one color like
// every other icon in this badge system.
function SharePointIcon({ className }: { className?: string }) {
  const maskId = 'sp-s-cutout';
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <mask id={maskId}>
        <rect x="0" y="0" width="24" height="24" fill="#fff" />
        <path d="M10.9 8.3c-1.66 0-2.9.94-2.9 2.32 0 1.2.86 1.83 2.2 2.28l.63.21c.9.3 1.27.55 1.27 1.03 0 .53-.49.86-1.32.86-.86 0-1.72-.28-2.4-.75v1.7c.6.32 1.5.53 2.36.53 1.85 0 3.06-.93 3.06-2.42 0-1.14-.66-1.8-2.1-2.28l-.57-.19c-1-.34-1.43-.56-1.43-1.04 0-.47.46-.78 1.19-.78.75 0 1.5.24 2.11.63V8.75c-.58-.29-1.34-.45-2.1-.45Z" fill="#000" />
      </mask>
      <path d="M4 4.8c0-.99.8-1.8 1.8-1.8h8.4c.99 0 1.8.81 1.8 1.8v14.4c0 .99-.81 1.8-1.8 1.8H5.8A1.8 1.8 0 0 1 4 19.2V4.8Z" fill="currentColor" mask={`url(#${maskId})`} />
      <path d="M17.3 8.6 20.4 12l-3.1 3.4v-1.9l1.6-1.5-1.6-1.5V8.6Z" fill="currentColor" />
    </svg>
  );
}

// Power BI's real mark: an open-cornered frame around four ascending bars.
// Same rationale as SharePoint above — no icon-set coverage, drawn to match.
function PowerBiIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 8V19a1 1 0 0 0 1 1h13" />
      <path d="M19 5 5 5" />
      <rect x="6.5" y="14" width="2.1" height="4.4" rx="1" fill="currentColor" stroke="none" />
      <rect x="10" y="11" width="2.1" height="7.4" rx="1" fill="currentColor" stroke="none" />
      <rect x="13.5" y="8.5" width="2.1" height="9.9" rx="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// AWS's real mark: the lowercase "aws" wordmark with the signature
// smile-arrow beneath it — no icon set carries AWS distinct from the
// retail Amazon logo. Path data taken directly from the official mark
// (traced by hand it renders illegibly at this scale), single-colored to
// currentColor to match this badge system's convention.
function AwsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 304 182" fill="currentColor" aria-hidden="true">
      <path d="M86.4,66.4c0,3.7,0.4,6.7,1.1,8.9c0.8,2.2,1.8,4.6,3.2,7.2c0.5,0.8,0.7,1.6,0.7,2.3c0,1-0.6,2-1.9,3l-6.3,4.2
        c-0.9,0.6-1.8,0.9-2.6,0.9c-1,0-2-0.5-3-1.4C76.2,90,75,88.4,74,86.8c-1-1.7-2-3.6-3.1-5.9c-7.8,9.2-17.6,13.8-29.4,13.8
        c-8.4,0-15.1-2.4-20-7.2c-4.9-4.8-7.4-11.2-7.4-19.2c0-8.5,3-15.4,9.1-20.6c6.1-5.2,14.2-7.8,24.5-7.8c3.4,0,6.9,0.3,10.6,0.8
        c3.7,0.5,7.5,1.3,11.5,2.2v-7.3c0-7.6-1.6-12.9-4.7-16c-3.2-3.1-8.6-4.6-16.3-4.6c-3.5,0-7.1,0.4-10.8,1.3c-3.7,0.9-7.3,2-10.8,3.4
        c-1.6,0.7-2.8,1.1-3.5,1.3c-0.7,0.2-1.2,0.3-1.6,0.3c-1.4,0-2.1-1-2.1-3.1v-4.9c0-1.6,0.2-2.8,0.7-3.5c0.5-0.7,1.4-1.4,2.8-2.1
        c3.5-1.8,7.7-3.3,12.6-4.5c4.9-1.3,10.1-1.9,15.6-1.9c11.9,0,20.6,2.7,26.2,8.1c5.5,5.4,8.3,13.6,8.3,24.6V66.4z M45.8,81.6
        c3.3,0,6.7-0.6,10.3-1.8c3.6-1.2,6.8-3.4,9.5-6.4c1.6-1.9,2.8-4,3.4-6.4c0.6-2.4,1-5.3,1-8.7v-4.2c-2.9-0.7-6-1.3-9.2-1.7
        c-3.2-0.4-6.3-0.6-9.4-0.6c-6.7,0-11.6,1.3-14.9,4c-3.3,2.7-4.9,6.5-4.9,11.5c0,4.7,1.2,8.2,3.7,10.6
        C37.7,80.4,41.2,81.6,45.8,81.6z M126.1,92.4c-1.8,0-3-0.3-3.8-1c-0.8-0.6-1.5-2-2.1-3.9L96.7,10.2c-0.6-2-0.9-3.3-0.9-4
        c0-1.6,0.8-2.5,2.4-2.5h9.8c1.9,0,3.2,0.3,3.9,1c0.8,0.6,1.4,2,2,3.9l16.8,66.2l15.6-66.2c0.5-2,1.1-3.3,1.9-3.9c0.8-0.6,2.2-1,4-1
        h8c1.9,0,3.2,0.3,4,1c0.8,0.6,1.5,2,1.9,3.9l15.8,67l17.3-67c0.6-2,1.3-3.3,2-3.9c0.8-0.6,2.1-1,3.9-1h9.3c1.6,0,2.5,0.8,2.5,2.5
        c0,0.5-0.1,1-0.2,1.6c-0.1,0.6-0.3,1.4-0.7,2.5l-24.1,77.3c-0.6,2-1.3,3.3-2.1,3.9c-0.8,0.6-2.1,1-3.8,1h-8.6c-1.9,0-3.2-0.3-4-1
        c-0.8-0.7-1.5-2-1.9-4L156,23l-15.4,64.4c-0.5,2-1.1,3.3-1.9,4c-0.8,0.7-2.2,1-4,1H126.1z M254.6,95.1c-5.2,0-10.4-0.6-15.4-1.8
        c-5-1.2-8.9-2.5-11.5-4c-1.6-0.9-2.7-1.9-3.1-2.8c-0.4-0.9-0.6-1.9-0.6-2.8v-5.1c0-2.1,0.8-3.1,2.3-3.1c0.6,0,1.2,0.1,1.8,0.3
        c0.6,0.2,1.5,0.6,2.5,1c3.4,1.5,7.1,2.7,11,3.5c4,0.8,7.9,1.2,11.9,1.2c6.3,0,11.2-1.1,14.6-3.3c3.4-2.2,5.2-5.4,5.2-9.5
        c0-2.8-0.9-5.1-2.7-7c-1.8-1.9-5.2-3.6-10.1-5.2L246,52c-7.3-2.3-12.7-5.7-16-10.2c-3.3-4.4-5-9.3-5-14.5c0-4.2,0.9-7.9,2.7-11.1
        c1.8-3.2,4.2-6,7.2-8.2c3-2.3,6.4-4,10.4-5.2c4-1.2,8.2-1.7,12.6-1.7c2.2,0,4.5,0.1,6.7,0.4c2.3,0.3,4.4,0.7,6.5,1.1
        c2,0.5,3.9,1,5.7,1.6c1.8,0.6,3.2,1.2,4.2,1.8c1.4,0.8,2.4,1.6,3,2.5c0.6,0.8,0.9,1.9,0.9,3.3v4.7c0,2.1-0.8,3.2-2.3,3.2
        c-0.8,0-2.1-0.4-3.8-1.2c-5.7-2.6-12.1-3.9-19.2-3.9c-5.7,0-10.2,0.9-13.3,2.8c-3.1,1.9-4.7,4.8-4.7,8.9c0,2.8,1,5.2,3,7.1
        c2,1.9,5.7,3.8,11,5.5l14.2,4.5c7.2,2.3,12.4,5.5,15.5,9.6c3.1,4.1,4.6,8.8,4.6,14c0,4.3-0.9,8.2-2.6,11.6
        c-1.8,3.4-4.2,6.4-7.3,8.8c-3.1,2.5-6.8,4.3-11.1,5.6C264.4,94.4,259.7,95.1,254.6,95.1z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M273.5,143.7c-32.9,24.3-80.7,37.2-121.8,37.2c-57.6,0-109.5-21.3-148.7-56.7
        c-3.1-2.8-0.3-6.6,3.4-4.4c42.4,24.6,94.7,39.5,148.8,39.5c36.5,0,76.6-7.6,113.5-23.2C274.2,133.6,278.9,139.7,273.5,143.7z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M287.2,128.1c-4.2-5.4-27.8-2.6-38.5-1.3c-3.2,0.4-3.7-2.4-0.8-4.5
        c18.8-13.2,49.7-9.4,53.3-5c3.6,4.5-1,35.4-18.6,50.2c-2.7,2.3-5.3,1.1-4.1-1.9C282.5,155.7,291.4,133.4,287.2,128.1z" />
    </svg>
  );
}

// Knockout's mark is an ornate script "K" wordmark with no simplified glyph
// version anywhere — reducing it to a hand-drawn icon path would lose the
// exact lettering that makes it recognizable, so the real logo (cropped to
// just the K, sourced from knockoutjs.com) is used as an image instead.
function KnockoutIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/media/knockout-k.png"
      alt="Knockout"
      width={24}
      height={24}
      className={className}
    />
  );
}

// Maps each real technology name to its brand icon. Two entries (the
// AI-concept technologies with no brand identity of their own) fall back to
// a neutral chip glyph rather than a mismatched substitute.
const iconMap: Record<string, IconType> = {
  AngularJS: SiAngular,
  jQuery: SiJquery,
  Joomla: SiJoomla,
  JavaScript: SiJavascript,
  Knockout: KnockoutIcon,
  Bootstrap: SiBootstrap,
  Java: FaJava,
  'Java EE': FaJava,
  PHP: SiPhp,
  Python: SiPython,
  Flutter: SiFlutter,
  'React Native': SiReact,
  '.NET Core': SiDotnet,
  AWS: AwsIcon,
  Azure: TbBrandAzure,
  'Visual Studio': TbBrandVisualStudio,
  SharePoint: SharePointIcon,
  Spring: SiSpring,
  'Google AI': SiGooglegemini,
  'Microsoft SQL Server': TbSql,
  'Power BI': PowerBiIcon,
  Hadoop: SiApachehadoop,
  WordPress: SiWordpress,
  HubSpot: SiHubspot,
  'Next.js': SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  Laravel: SiLaravel,
  'Ruby on Rails': SiRubyonrails,
};

export default function TechIcon({ name }: { name: string }) {
  const Icon = iconMap[name] ?? TbCpu;
  return <Icon className="tech-icon-svg" aria-hidden="true" />;
}
