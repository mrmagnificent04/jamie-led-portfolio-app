import React from 'react';

export interface ExperienceProps {}

type RoleProps = {
    company: string;
    role: string;
    meta: string;
    dates: string;
    link?: { label: string; href: string };
    children: React.ReactNode;
};

const Role: React.FC<RoleProps> = ({
    company,
    role,
    meta,
    dates,
    link,
    children,
}) => (
    <div style={styles.role}>
        <div style={styles.titleRow}>
            <h2 style={styles.company}>{company}</h2>
            {link && (
                <a
                    rel="noreferrer"
                    target="_blank"
                    href={link.href}
                    style={{ marginLeft: 'auto' }}
                >
                    <h4>{link.label}</h4>
                </a>
            )}
        </div>
        <div style={styles.titleRow}>
            <h4 style={styles.roleTitle}>{role}</h4>
            <b>
                <p style={styles.dates}>{dates}</p>
            </b>
        </div>
        <p style={styles.meta}>{meta}</p>
        <p style={styles.summary}>{children}</p>
    </div>
);

const Experience: React.FC<ExperienceProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1 style={{ marginLeft: -16 }}>Experience</h1>
            <br />

            <Role
                company="BlackRock"
                role="Summer Analyst"
                meta="Americas Institutional Business · San Francisco, California"
                dates="Jun 2026 – Aug 2026"
                link={{ label: 'blackrock.com', href: 'https://www.blackrock.com/' }}
            >
                Supported the institutional client business, with a focus on
                hedge fund and alternatives allocation conversations across
                family offices and endowments. Authored client-facing briefings
                on short turnaround, and built an internal AI agent that
                automated research workflows and became one of the most widely
                used tools on the firm's enterprise workspace.
            </Role>

            <Role
                company="EY-Parthenon"
                role="Summer Associate"
                meta="Strategy & Execution · Financial Services Organization · Emerging Leaders Program · San Francisco, California"
                dates="Jun 2025 – Aug 2025"
                link={{
                    label: 'ey.com/ey-parthenon',
                    href: 'https://www.ey.com/en_us/services/strategy/ey-parthenon',
                }}
            >
                Worked on strategy engagements across the Financial Services
                Organization, spanning commercial due diligence, market entry,
                and operating model work. Built market, customer, and competitor
                analyses to support client growth strategy, and delivered
                executive-facing dashboards that tracked cost and performance
                indicators for senior leadership.
            </Role>

            <Role
                company="NAOS Blockchain Capital"
                role="Strategy & Operations Intern"
                meta="LATAM Fintech Investment Platform · Mexico City, Mexico"
                dates="May 2024 – Aug 2024"
                link={{ label: 'naos.xyz', href: 'https://www.naos.xyz/' }}
            >
                Partnered directly with the executive team of an early-stage
                fintech platform on strategic and operational priorities. Built
                analyses and pitch materials that supported corporate
                development conversations, and redesigned the customer
                onboarding process to materially shorten time to activation.
            </Role>

            <Role
                company="PwC"
                role="Nonprofit Consulting Extern"
                meta="Social Welfare Nonprofit Client · Remote"
                dates="Feb 2024 – May 2024"
                link={{ label: 'pwc.com', href: 'https://www.pwc.com/' }}
            >
                Consulted for a social welfare nonprofit through a remote
                externship, interviewing executives and senior leaders to surface
                operational pain points across the organization. Recommended
                changes to outreach workflows that reduced turnaround delays, and
                advised on a content monetization strategy built around
                merchandising. Selected from a competitive pool of externs to
                present final recommendations to PwC leadership and client
                executives.
            </Role>

            <Role
                company="ZEPETO"
                role="Strategy Consulting Practicum"
                meta="USC LiNC Program · Seoul, South Korea"
                dates="Jan 2024 – May 2024"
                link={{ label: 'zepeto.me', href: 'https://web.zepeto.me/en' }}
            >
                Worked with a South Korean social platform on adapting a core
                product feature for the U.S. market as part of a semester-long
                strategy practicum. Designed a tiered user spending model and an
                accompanying interactive dashboard to guide feature targeting,
                then presented the team's findings to company leadership and
                earned a best presenter recognition.
            </Role>
        </div>
    );
};

const styles: StyleSheetCSS = {
    role: {
        flexDirection: 'column',
        width: '100%',
        marginBottom: 48,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        width: '100%',
        flexWrap: 'wrap',
        gap: 16,
    },
    company: {
        fontFamily: 'gastromond, serif',
        fontSize: 40,
        lineHeight: 1.1,
    },
    roleTitle: {
        marginTop: 4,
    },
    dates: {
        whiteSpace: 'nowrap',
    },
    meta: {
        marginTop: 8,
        fontSize: 16,
        color: '#555',
    },
    summary: {
        marginTop: 16,
        textAlign: 'justify',
    },
};

export default Experience;
