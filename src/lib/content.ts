export type Service = { n: string; title: string; desc: string };
// headline: *wrapped* words are rendered underlined.
export type Solution = { n: string; title: string; headline: string; desc: string };
export type TechCategory = 'Front End' | 'Back End' | 'Mobile' | 'Cloud & Infrastructure' | 'AI & Data' | 'CMS';
export type TechItem = { src: string; name: string; desc: string };
// Front End and Back End split their items into Languages vs Frameworks &
// Libraries subgroups on desktop; every other category stays a flat list.
export type TechGroup = { label: string; items: TechItem[] };
export type TechCategoryContent = TechItem[] | TechGroup[];
export type Testimonial = { name: string; quote: string };
export type Stat = { value: number; suffix: string; label: string };
export type NavLink = { label: string; id: string; gradient?: boolean };

export const navLinks: NavLink[] = [
  { label: 'GenAI', id: 'ai', gradient: true },
  { label: 'What we do', id: 'services' },
  { label: 'Solutions', id: 'solutions' },
  { label: 'Products', id: 'products' },
  { label: 'Technology', id: 'technology' },
  { label: 'Contact', id: 'contact' },
];

export const services: Service[] = [
  { n: '01', title: 'Product Innovation & Technology Management', desc: 'Cloud-ready products and technology roadmaps built around your business priorities.' },
  { n: '02', title: 'Consultancy & Process Management', desc: 'Practical guidance that makes complex processes simpler, faster and more reliable.' },
  { n: '03', title: 'Advanced BI & Analytics', desc: 'Convert business data into clear, decision-ready intelligence.' },
  { n: '04', title: 'AI, Blockchain & IoT', desc: 'Apply emerging technologies where they create genuine operational value.' },
  { n: '05', title: 'Software Engineering & Development', desc: 'Design, build, test and deploy resilient digital products.' },
  { n: '06', title: 'Research & Development', desc: 'Continuously explore better technologies and more effective solutions.' },
];

export const solutions: Solution[] = [
  { n: '01', title: 'Agentic AI Development', headline: '*Agentic AI* that plans, decides and acts across your systems', desc: 'Build AI agents that reason over your data, use your tools and complete multi-step work, with people kept in control.' },
  { n: '02', title: 'GenAI Integrations', headline: '*GenAI integrations* woven into the tools your teams already use', desc: 'Embed generative AI into your existing apps, data and workflows, securely and without a rebuild.' },
  { n: '03', title: 'Business Transformation', headline: 'Business *transformation*, built around how you actually work', desc: 'Modernise systems and improve the processes that keep your business moving.' },
  { n: '04', title: 'Automation', headline: '*Automation* that takes *repetitive work* off your team', desc: 'Reduce repetitive work with reliable, scalable workflows.' },
  { n: '05', title: 'Data & Intelligence', headline: 'Turning scattered data into *intelligence* you can trust', desc: 'Turn complex data into insight your teams can act on.' },
  { n: '06', title: 'Integration', headline: '*Integration* that connects your platforms into *one operation*', desc: 'Connect platforms, APIs and applications into one coherent operation.' },
];

export const stack: Record<TechCategory, TechCategoryContent> = {
  'Front End': [
    {
      label: 'Languages',
      items: [
        { src: '/media/yjznrong/18.png', name: 'JavaScript', desc: 'The core scripting language of the web, used across browsers and servers.' },
        { src: '/media/frontend/typescript.png', name: 'TypeScript', desc: 'A typed superset of JavaScript that improves reliability at scale.' },
      ],
    },
    {
      label: 'Frameworks & Libraries',
      items: [
        { src: '/media/5w5fqx4n/14.png', name: 'AngularJS', desc: 'A structural framework for building dynamic single-page web applications.' },
        { src: '/media/kcjbi1iz/15.png', name: 'jQuery', desc: 'A fast, lightweight library for DOM manipulation and event handling.' },
        { src: '/media/pkifq4nm/20.png', name: 'Knockout', desc: 'A JavaScript library that implements the MVVM pattern for rich UIs.' },
        { src: '/media/bvnmkoud/bootstrap.png', name: 'Bootstrap', desc: 'A component library for building responsive, mobile-first interfaces.' },
        { src: '/media/frontend/nextjs.png', name: 'Next.js', desc: 'A React framework for building fast, production-ready web applications.' },
        { src: '/media/frontend/react.png', name: 'React', desc: 'A component-based library for building interactive user interfaces.' },
      ],
    },
  ],
  'Back End': [
    {
      label: 'Languages',
      items: [
        { src: '/media/p2gonffj/23.png', name: 'PHP', desc: 'A server-side scripting language used to build dynamic web applications.' },
        { src: '/media/tgsjhpqp/27.png', name: 'Python', desc: 'A general-purpose language known for readability and a broad ecosystem.' },
        { src: '/media/xrbgf0eh/8.png', name: 'Java', desc: 'A widely used, class-based language for building portable, scalable systems.' },
        { src: '/media/hq3hsuei/9.png', name: 'Java EE', desc: 'An enterprise extension of Java for building large-scale server applications.' },
      ],
    },
    {
      label: 'Frameworks & Libraries',
      items: [
        { src: '/media/sccjo4pl/10.png', name: 'Spring', desc: 'A Java framework for building enterprise-grade backend applications.' },
        { src: '/media/11djacpv/2.png', name: '.NET Core', desc: 'A cross-platform framework for building high-performance applications.' },
        { src: '/media/backend/nodejs.png', name: 'Node.js', desc: 'A JavaScript runtime for building fast, scalable server-side applications.' },
        { src: '/media/backend/express.png', name: 'Express.js', desc: 'A minimal, flexible framework for building Node.js web applications and APIs.' },
        { src: '/media/backend/laravel.png', name: 'Laravel', desc: 'A PHP framework for building elegant, well-structured web applications.' },
        { src: '/media/backend/rails.png', name: 'Ruby on Rails', desc: 'A convention-driven Ruby framework for building web applications quickly.' },
      ],
    },
  ],
  Mobile: [
    { src: '/media/xbugkcew/16.png', name: 'Flutter', desc: 'A UI toolkit for building natively compiled mobile apps from one codebase.' },
    { src: '/media/3ejj3dsm/26.png', name: 'React Native', desc: 'A framework for building native mobile apps using React.' },
  ],
  'Cloud & Infrastructure': [
    { src: '/media/aws/aws.png', name: 'AWS', desc: "Amazon's cloud platform for compute, storage and managed infrastructure services." },
    { src: '/media/xyummodr/4.png', name: 'Azure', desc: "Microsoft's cloud platform for hosting, compute and infrastructure services." },
    { src: '/media/tkiaukmx/5.png', name: 'Visual Studio', desc: 'An integrated development environment for building and debugging software.' },
    { src: '/media/vtips0op/7.png', name: 'SharePoint', desc: 'A platform for document management and enterprise collaboration.' },
  ],
  'AI & Data': [
    { src: '/media/3gxkvvij/36.png', name: 'Artificial Intelligence', desc: 'Systems and models that support automation, prediction and insight.' },
    { src: '/media/12zpizhw/37.png', name: 'Google AI', desc: "Tooling and services from Google's applied AI ecosystem." },
    { src: '/media/pw4jq5st/untitled-1.png', name: 'Machine Learning', desc: 'Algorithms that learn patterns from data to inform decisions.' },
    { src: '/media/51spk1lh/3.png', name: 'Microsoft SQL Server', desc: 'A relational database engine for structured data management.' },
    { src: '/media/zxeprsh2/6.png', name: 'Power BI', desc: 'A business analytics tool for visualising and sharing data insight.' },
    { src: '/media/sygp30ef/19.png', name: 'Hadoop', desc: 'A framework for distributed storage and processing of large datasets.' },
  ],
  CMS: [
    { src: '/media/ypvhjbwp/17.png', name: 'Joomla', desc: 'An open-source content management system for building websites.' },
    { src: '/media/cms/wordpress.png', name: 'WordPress', desc: 'The most widely used content management system for building and publishing websites.' },
    { src: '/media/cms/hubspot.png', name: 'HubSpot', desc: 'A CRM and marketing platform for managing content, campaigns and customer relationships.' },
  ],
};

// Dropdown entries for nav items that have one, keyed by nav link id.
// AI-related entries get the same gradient treatment as the GenAI nav link.
const dropdownItem = (label: string, href: string) => ({ label, href, gradient: /\b(Gen)?AI\b/.test(label) });
export const navDropdowns: Record<string, { label: string; href: string; gradient: boolean }[]> = {
  services: services.map((s) => dropdownItem(s.title, '#services')),
  solutions: solutions.map((s) => dropdownItem(s.title, '#solutions')),
  technology: (Object.keys(stack) as TechCategory[]).map((c) => dropdownItem(c, '#technology')),
};

// Products shown in the Products carousel and the logo strip under the hero.
// desc is placeholder copy: replace with a real one-liner per product.
export const products = [
  { name: 'Zoneberry', logo: '/media/zy1l3chb/zoneberry-white.png', desc: 'A digital product designed, built and supported by Cubo Systems.' },
  { name: 'Realtr', logo: '/media/byebhoao/realtr_white.png', desc: 'A digital product designed, built and supported by Cubo Systems.' },
  { name: 'Xelution', logo: '/media/ksmpgull/xelutionwhite.png', desc: 'A digital product designed, built and supported by Cubo Systems.' },
];

export const testimonials: Testimonial[] = [
  { name: 'ThyssenKrupp Aerospace', quote: 'You guys helped solve million dollar problems. We hope to continue work with you all using your expertise.' },
  { name: 'Hakitaak', quote: 'They have been a very reliable partner throughout the project. We appreciate their technology skills, creative problem solving, straightforward communication, flexibility and dedication to the project.' },
  { name: 'Meetingrooms.com', quote: 'Extremely efficient and logical team to work with. Highly motivated and handles projects in a very efficient manner. Great working with CUBO team.' },
  { name: 'Office Freedom', quote: 'We have worked with Cubo for 10+ years. They looked after our CRM and website and helped us a lot over this time.' },
  { name: 'Nanekma', quote: 'Excellent partner to work with, smooth transition. Takes ownership and delivers high-tech solutions.' },
];

export const stats: Stat[] = [
  { value: 50, suffix: '+', label: 'Clients' },
  { value: 80, suffix: '+', label: 'Projects' },
  { value: 5, suffix: '', label: 'Awards' },
  { value: 40, suffix: '+', label: 'Employees' },
];

export const whyCubo = [
  { n: '01', label: 'Business-first thinking' },
  { n: '02', label: 'Deep technical expertise' },
  { n: '03', label: 'Long-term partnerships' },
  { n: '04', label: 'Practical innovation' },
];

export const footerGroups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Explore',
    links: navLinks
      .filter((l) => l.id !== 'contact')
      .map((l) => ({ label: l.label, href: '#' + l.id })),
  },
  {
    title: 'Services',
    links: services.map((s) => ({ label: s.title, href: '#services' })),
  },
];
