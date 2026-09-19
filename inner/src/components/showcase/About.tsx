import React from 'react';
import { Link } from 'react-router-dom';

export interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1 style={{ marginLeft: -16 }}>Welcome</h1>
            <h3>I'm Jamie Ledesma</h3>
            <br />
            <div className="text-block">
                <p>
                    I am a senior at USC's Marshall School of Business, majoring
                    in Business Administration with a minor in Artificial
                    Intelligence Applications from the Viterbi School of
                    Engineering.
                </p>
                <br />
                <p>Thanks for stopping by to see what I've been working on.</p>
            </div>
            <div className="text-block">
                <h3>About Me</h3>
                <br />
                <p>
                    Plan A was a simple one: make it to the league and play for
                    the Dallas Cowboys.
                </p>
                <br />
                <p>
                    I was a California All-State running back with an
                    International Baccalaureate diploma, balancing varsity
                    football with four different jobs from refereeing soccer to
                    literally pouring concrete. When I realized the NFL was
                    taking its sweet time drafting me, I took that same grit and
                    redirected it toward the business world.
                </p>
                <br />
                <p>
                    It turns out that navigating a career requires the exact same
                    agility as dodging linebackers. Since then, I've traded the
                    gridiron for global markets, and have spent time in
                    EY-Parthenon's Financial Services Organization and, most
                    recently, spending my summer in San Francisco with
                    BlackRock's Americas Institutional Business Group.
                </p>
                <br />
                <p>
                    When I'm not deep in the professional trenches, you can
                    usually find me at the beach. I balance my time between
                    surfing, creative coding, and hunting down whatever outdoorsy
                    hobby catches my eye next. You can also find me fiercely
                    debating the best new spots to rank on Beli.
                </p>
                <br />
                <br />
                <p>
                    Thanks for stopping by, and I hope you enjoy exploring the
                    rest of my portfolio! Whether you have a question, a comment,
                    or just want to chat, feel free to drop me a message through
                    the <Link to="/contact">contact page</Link> or find me on{' '}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://www.linkedin.com/in/jamie-ledesma/"
                    >
                        LinkedIn
                    </a>
                    .
                </p>
                <br />
                <br />
                <p>All the best,</p>
                <br />
                <p style={styles.signature}>Jamie</p>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    signature: {
        fontFamily: 'gastromond, serif',
        fontSize: 36,
        fontStyle: 'italic',
    },
};

export default About;
