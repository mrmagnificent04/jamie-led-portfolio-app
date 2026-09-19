import React from 'react';
import bainPhoto from '../../../assets/pictures/projects/involvement/bain.jpg';
import mckinseyPhoto from '../../../assets/pictures/projects/involvement/mckinsey.jpg';
import lbsaFamilyPhoto from '../../../assets/pictures/projects/involvement/lbsa-family.jpg';
import tccFunPhoto from '../../../assets/pictures/projects/involvement/tcc-fun.jpg';

export interface InvolvementProjectsProps {}

const InvolvementProjects: React.FC<InvolvementProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Involvement</h1>
            <h3>Leadership</h3>
            <br />
            <div className="text-block">
                <p>
                    The organizations, teams, and communities I've been part of
                    outside of work and coursework.
                </p>
            </div>
            <div className="text-block">
                <h2>
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://www.usclbsa.com/"
                    >
                        <b>Latino Business Student Association (LBSA)</b>
                    </a>
                </h2>
                <br />
                <p>
                    LBSA has always been my home away from home. I initially
                    joined as a general member during my freshman year, drawn
                    in by the community and the genuine connections I was
                    building. That early involvement led me to the LBSA Future
                    Leaders program. There, I pitched an initiative I called
                    "El Puente." This project was designed to translate our
                    massive alumni roster into an accessible, living network
                    for current students. My peers voted to move forward with
                    it. Leading its development taught me how to turn a
                    conceptual pitch into a lasting organizational resource.
                </p>
                <br />
                <p>
                    The success of El Puente gave me the confidence to step up
                    as VP of Finance my sophomore year. I traded front-facing
                    event planning for meticulous bookkeeping and long hours
                    in Excel. That operational foundation ultimately prepared
                    me to run for President. Over my term, my primary focus
                    was [insert your core presidential achievement here]. I
                    wanted to ensure we were serving every facet of our
                    members' college experience. To do this, I organized our
                    first-ever alumni welcome-back event, coordinated beach
                    mixers, and hosted corporate industry panels. LBSA gave so
                    much to me, and pouring my energy into its growth was
                    simply my way of giving back.
                </p>
                <br />
                <div style={styles.singlePhotoWrap}>
                    <img
                        src={lbsaFamilyPhoto}
                        alt="LBSA executive board"
                        style={styles.photo}
                    />
                </div>
            </div>
            <div className="text-block">
                <h2>
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://www.consultingclubatusc.com/"
                    >
                        <b>The Consulting Club (TCC)</b>
                    </a>
                </h2>
                <br />
                <p>
                    When I first arrived at Marshall, the campus energy seemed
                    to push everyone toward becoming either an investment
                    banker or a management consultant. I gravitated toward the
                    latter. To find my footing in the industry, I joined
                    TCC's Mentorship Program as a freshman. By my junior year,
                    I had the privilege of serving as Co-President alongside
                    Raj Khanna and Megan Shi. Both of these incredible peers
                    are now thriving in their own careers.
                </p>
                <br />
                <p>
                    My core mission in leadership was revitalizing our
                    mentorship program. The existing curriculum felt
                    disconnected from the rigorous realities of modern case
                    interviews, so I spearheaded a complete structural
                    rewrite. We developed a comprehensive, semester-long
                    bootcamp. This new program took members from foundational
                    concepts to consistently acing complex case studies.
                    Beyond the curriculum, I focused on bridging the gap
                    between our members and the industry. I organized office
                    visits with West Monroe, secured an executive speaker
                    event with Avasant's CEO, and hosted multiple MBB
                    consultant panels. Watching our members build confidence
                    and land offers using the infrastructure we built remains
                    one of my proudest takeaways.
                </p>
                <br />
                <div style={styles.singlePhotoWrap}>
                    <img
                        src={tccFunPhoto}
                        alt="TCC executive board being goofy"
                        style={styles.photo}
                    />
                    <p style={styles.photoCaption}>
                        The TCC E-board, being ourselves
                    </p>
                </div>
                <br />
                <div style={styles.photoRowCentered}>
                    <div style={styles.photoColNarrow}>
                        <img
                            src={bainPhoto}
                            alt="Jamie at Bain & Company"
                            style={styles.photo}
                        />
                        <p style={styles.photoCaption}>Bain & Company</p>
                    </div>
                    <div style={styles.photoColNarrow}>
                        <img
                            src={mckinseyPhoto}
                            alt="Jamie at McKinsey & Company"
                            style={styles.photo}
                        />
                        <p style={styles.photoCaption}>McKinsey & Company</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    singlePhotoWrap: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: 460,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    photoRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: 16,
        width: '100%',
    },
    photoCol: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: '1 1 0',
        minWidth: 140,
    },
    photoRowCentered: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: 16,
        width: '100%',
    },
    photoColNarrow: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: 220,
    },
    photo: {
        width: '100%',
        display: 'block',
        border: '1px solid #ccc',
    },
    photoCaption: {
        marginTop: 8,
        fontSize: 14,
        textAlign: 'center',
    },
};

export default InvolvementProjects;
