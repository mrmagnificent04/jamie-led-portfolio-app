import React from 'react';
import fourthProbability from '../../../assets/pictures/projects/software/fourth-and-probability.png';
import campusWalk from '../../../assets/pictures/projects/software/campus-walk.png';
import junction from '../../../assets/pictures/projects/software/junction.gif';
// @ts-ignore
import runsight from '../../../assets/pictures/projects/software/runsight.mp4';
import VideoAsset from '../../general/VideoAsset';

export interface SoftwareProjectsProps {}

const SoftwareProjects: React.FC<SoftwareProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Software</h1>
            <h3>Projects</h3>
            <br />
            <p>
                Below are some of my favorite software projects I have worked on
                over the last few years.
            </p>
            <br />
            <div className="text-block">
                <h2>Fourth &amp; Probability</h2>
                <br />
                <a
                    className="site-button"
                    style={styles.demoLink}
                    rel="noreferrer"
                    target="_blank"
                    href="https://nfl-game-predictor-by-jamie.streamlit.app/"
                >
                    ▶ Live Demo
                </a>
                <br />
                <br />
                <p>
                    Fourth &amp; Probability is an interactive NFL prediction app
                    I built to estimate team win probabilities. The project is a
                    web-based tool where you generate forecasts by selecting two
                    teams and adding contextual attachments like weather,
                    injuries, and market spreads to build a comprehensive
                    prediction. The project's live data updates paused after the
                    2025 season because I had a packed academic schedule and was
                    unable to find the time to continuously refresh the
                    play-by-play and roster pipelines for current 2026 matchups.
                </p>
                <br />
                <div className="captioned-image">
                    <img src={fourthProbability} alt="Fourth & Probability interface" />
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 1:</b> Fourth &amp; Probability interface
                            demo, featuring the main matchup builder along with a
                            few of our probability bars and rationale cards.
                        </sub>
                    </p>
                </div>
                <p>
                    Fourth &amp; Probability was a really fun project to work on
                    and had a multitude of challenges. An interesting challenge
                    that you may not even notice was preventing future-data
                    leakage in the historical stats. Time-series modeling is a
                    very difficult thing to do because in the world of machine
                    learning you are dealing with such a massive amount of
                    historical play-by-play information. Even a single misplaced
                    stat can cause a model to accidentally peek at the final
                    score, causing its accuracy to read in a totally different
                    and unintended way. To deal with this we developed an
                    algorithm to group games chronologically, strictly shifting
                    the statistics backward by one game before running a rolling
                    average. Doing so resulted in relatively accurate and
                    genuinely leakage-safe team profiles when feeding the data to
                    the logistic regression and random forest models. It was a
                    surprisingly difficult challenge as it intersected both data
                    engineering and sports analytics, but was fun to work on
                    overall.
                </p>
            </div>
            <div className="text-block">
                <h2>USC Campus Walk</h2>
                <br />
                <a
                    className="site-button"
                    style={styles.demoLink}
                    rel="noreferrer"
                    target="_blank"
                    href="https://usc-campus-walk.vercel.app/"
                >
                    ▶ Live Demo
                </a>
                <br />
                <br />
                <p>
                    I designed USC Campus Walk as a single-file, no-build,
                    keyboard-only first-person browser walking tour of the
                    University Park Campus. The primary design goal was to
                    build an accessible, lightweight environment so I could
                    easily show my family what my daily campus life looks
                    like, as they are unfortunately unable to come experience
                    USC in person. To make the experience run smoothly in a
                    browser, I designed the aesthetic to prioritize geographic
                    accuracy and structural recognizability over
                    photorealism. Every building, path, and fountain sits at
                    its exact real-world location and scale, but is rendered
                    entirely with flat-shaded colored polygons rather than
                    heavy photo textures.
                </p>
                <br />
                <div className="captioned-image">
                    <img src={campusWalk} alt="USC Campus Walk interface" />
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 2:</b> Standing at Tommy Trojan in USC
                            Campus Walk, with nearby buildings labeled and the
                            minimap showing exact real-world position.
                        </sub>
                    </p>
                </div>
                <p>
                    The design process for the map generation started with
                    fusing campus geometry from OpenStreetMap (via the
                    Overpass API) with USC's own Concept3D campus map API. To
                    keep the footprint as small as possible, I merged this
                    data into a compact, delta-encoded text format using
                    integer-metre offsets. A major design decision was how to
                    orient the spatial world: I projected the entire dataset
                    onto a local flat coordinate plane centered precisely on
                    the Tommy Trojan statue, and mathematically accounted for
                    the fact that USC's street grid is rotated 28° off true
                    north. This ensured the walking experience felt
                    geographically authentic to someone familiar with the
                    actual campus layout.
                </p>
                <br />
                <p>
                    To render the environment without heavy textures, I
                    designed a custom three.js engine using a Mesher class
                    that builds all geometry as vertex-colored BufferGeometry.
                    I built a procedural style-classification system that
                    applies a shared facade library to generate architectural
                    details like arched windows, cornices, and ivy. For the
                    most iconic structures — such as Tommy Trojan, Bovard
                    Auditorium, Doheny Memorial Library, and the School of
                    Cinematic Arts — I designed a CUSTOM{} dispatch map to
                    hand-build approximately 15 landmarks to preserve their
                    unique silhouettes. To bring the layout to life, I
                    integrated animated fountains, custom pathway collision
                    detection, and an instanced rendering system to simulate a
                    moving crowd of 1,000 pedestrians.
                </p>
                <br />
                <p>
                    The tour lives in a single HTML file, loads the three.js
                    library via CDN, and requires no server backend or build
                    step, making it instantly playable for anyone I send the
                    link to.
                </p>
            </div>
            <div className="text-block">
                <h2>RunSight</h2>
                <br />
                <a
                    className="site-button"
                    style={styles.demoLink}
                    rel="noreferrer"
                    target="_blank"
                    href="https://run-site.vercel.app/"
                >
                    ▶ Live Demo
                </a>
                <br />
                <br />
                <p>
                    RunSight is an interactive football analysis platform that
                    shows where a running back should have run during a play.
                    Users select a team, watch a rushing play from either behind
                    the quarterback or through the running back's eyes, and see
                    the recommended running lane drawn directly on the field.
                    After the play, RunSight explains why that path was selected
                    using factors such as open space, blocker positioning,
                    defender pressure, cut difficulty, and potential yardage. It
                    can also review multiple plays to identify broader tendencies
                    and generate coaching-focused insights.
                </p>
                <br />
                <div className="captioned-image">
                    <VideoAsset src={runsight} />
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 3:</b> RunSight's behind-QB view, with the
                            recommended running lane drawn onto the field and the
                            model's confidence shown in the corner.
                        </sub>
                    </p>
                </div>
                <p>
                    Technically, RunSight converts every player's movement into
                    time-based field coordinates and evaluates several possible
                    paths for the running back at each moment. Its analysis
                    engine projects defender pursuit, estimates defender arrival
                    times, measures nearby blocking influence, calculates
                    available space, and applies a penalty for sharp or
                    unrealistic cuts. It combines these measurements into a
                    risk-adjusted score and expected-yard estimate for every
                    candidate lane. The highest-scoring path becomes the
                    recommendation, while the difference between the best and
                    second-best scores determines confidence. The React and
                    TypeScript interface presents the results, while Three.js
                    renders the animated 3D field, player movement, camera
                    perspectives, and running-lane overlays.
                </p>
            </div>
            <div className="text-block">
                <h2>Junction</h2>
                <br />
                <a
                    className="site-button"
                    style={styles.demoLink}
                    rel="noreferrer"
                    target="_blank"
                    href="https://junction-railway.vercel.app/"
                >
                    ▶ Live Demo
                </a>
                <br />
                <br />
                <p>
                    Junction is a browser-based, procedural 3D model railway
                    sandbox that I designed to operate as a living, breathing
                    miniature world. Inspired by the tactile joy of physical
                    model layouts like the ones my uncle loves to build, I
                    wanted to create a digital experience where you act less
                    like a traditional train driver and more like the
                    designer of an active system. Instead of starting with an
                    empty editor, you are immediately dropped into a vibrant
                    landscape where autonomous steam, diesel, and electric
                    trains are already navigating the network. You can snap
                    tracks together on a grid, paint the terrain, customize
                    trains, and ride inside the cab in the first person. All
                    of this happens while the trains independently manage
                    their own routes, junctions, and traffic stops.
                </p>
                <br />
                <div className="captioned-image">
                    <img src={junction} alt="Junction model railway sandbox" />
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 4:</b> The Countryside Loop world in
                            Junction, with trains running autonomously while
                            the terrain, weather, and track tools sit in the
                            side panel.
                        </sub>
                    </p>
                </div>
                <p>
                    On the technical side, I built it to be incredibly
                    lightweight by generating the geometry and environment
                    entirely from code at runtime instead of importing heavy
                    3D assets. The visual rendering is powered by Three.js,
                    but the railway safety logic is driven by a custom
                    backend simulation running at a strict 120 steps per
                    second. This engine utilizes a block reservation system
                    where trains continuously calculate stopping distances,
                    lock upcoming track edges, and brake for conflicts.
                    Whenever a track is modified, the underlying node graph
                    instantly rebuilds and safely reseats the trains without
                    breaking the simulation. The entire backdrop operates as
                    a complex procedural system, featuring a dynamically
                    streamed landscape built on seeded Perlin noise,
                    atmospheric weather states, and spatial-hashed wildlife
                    roaming the map.
                </p>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    video: {
        width: '100%',
        padding: 12,
    },
    caption: {
        width: '80%',
    },
    demoLink: {
        display: 'inline-block',
        textDecoration: 'none',
        color: '#000',
    },
};

export default SoftwareProjects;
