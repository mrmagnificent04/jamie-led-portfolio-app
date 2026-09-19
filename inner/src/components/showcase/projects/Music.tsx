import React, { useState } from 'react';

export interface MusicProjectsProps {}

type Album = {
    title: string;
    artist: string;
    year: number;
    /** Filename inside public/albums/ — e.g. 'channel-orange.jpg' */
    cover: string;
    /** Track the cover links to. Shown as "Song: ..." under the album. */
    song?: string;
    /** YouTube video URL. Leave empty to fall back to a YouTube search. */
    url?: string;
};

const HIPHOP: Album[] = [
    { title: 'To Pimp a Butterfly', artist: 'Kendrick Lamar', year: 2015, cover: 'tpab.jpg', song: 'King Kunta', url: 'https://youtu.be/hRK7PVJFbS8' },
    { title: 'Let God Sort Em Out', artist: 'Clipse', year: 2025, cover: 'let-god-sort-em-out.jpg', song: 'E.B.I.T.D.A.', url: 'https://youtu.be/nWo-lFR6R5E' },
    { title: 'All Eyez On Me', artist: '2Pac', year: 1996, cover: 'all-eyez-on-me.jpg', song: 'All About U', url: 'https://youtu.be/uo0wCdGmBE0' },
    { title: 'The College Dropout', artist: 'Kanye West', year: 2004, cover: 'college-dropout.jpg', song: 'Jesus Walks', url: 'https://youtu.be/MYF7H_fpc-g'  },
    { title: 'K.I.D.S.', artist: 'Mac Miller', year: 2010, cover: 'kids.jpg', song: 'The Spins', url: 'https://youtu.be/Gom3xUAUtfI'  },
    { title: 'More Life', artist: 'Drake', year: 2017, cover: 'more-life.jpg', song: 'Get It Together', url: 'https://youtu.be/4hBxEISsS24'  },
];

const RNB: Album[] = [
    { title: 'Kehlani', artist: 'Kehlani', year: 2026, cover: 'kehlani.jpg', song: 'Shoulda Never', url: 'https://youtu.be/crWbG90dChw'  },
    { title: "What's Going On", artist: 'Marvin Gaye', year: 1971, cover: 'whats-going-on.jpg', song: "What's Going On", url: 'https://youtu.be/o5TmORitlKk'  },
    { title: 'Icon', artist: 'Brent Faiyaz', year: 2026, cover: 'icon.jpg', song: 'Butterflies', url: 'https://youtu.be/P4GnrzUACmU'  },
    { title: 'Songs in the Key of Life', artist: 'Stevie Wonder', year: 1976, cover: 'songs-key-of-life.jpg', song: "Isn't She Lovely", url: 'https://youtu.be/oE56g61mW44'  },
    { title: 'Malibu', artist: 'Anderson .Paak', year: 2016, cover: 'malibu.jpg', song: 'Come Down', url: 'https://youtu.be/-OqrcUvrbRY'  },
    { title: 'Blonde', artist: 'Frank Ocean', year: 2016, cover: 'blonde.jpg', song: 'Self Control', url: 'https://youtu.be/BME88lS6aVY'  },
];

const LATIN: Album[] = [
    { title: 'Un Verano Sin Ti', artist: 'Bad Bunny', year: 2022, cover: 'un-verano-sin-ti.jpg', song: 'El Apagón', url: 'https://youtu.be/QdQEljUMCEM'  },
    { title: 'Prince Royce', artist: 'Prince Royce', year: 2010, cover: 'prince-royce.jpg', song: 'Recházame', url: 'https://youtu.be/kVtfXd_WdkA'  },
    { title: 'FERXXO VOL X: Sagrado', artist: 'Feid', year: 2025, cover: 'ferxxo-sagrado.jpg', song: 'Ferxxo 500', url: 'https://youtu.be/VbKeM32MvMY'  },
    { title: 'Supernatural', artist: 'Santana', year: 1999, cover: 'supernatural.jpg', song: '(Da Le) Yaleo', url: 'https://youtu.be/y9BGA78UG9w'  },
    { title: 'Cosa Nuestra', artist: 'Rauw Alejandro', year: 2024, cover: 'cosa-nuestra.jpg', song: 'Tú Con Él', url: 'https://youtu.be/NC4wwAtyBA8'  },
    { title: 'El Comienzo', artist: 'Grupo Frontera', year: 2023, cover: 'el-comienzo.jpg', song: 'un x100to', url: 'https://youtu.be/3inw26U-os4' },
];

const REGGAE: Album[] = [
    { title: 'Backyard Boogie', artist: 'J Boog', year: 2011, cover: 'backyard-boogie.jpg', song: 'Mystery', url: 'https://youtu.be/JhyzLgHVukI'  },
    { title: 'Collection: 50th State of Mind', artist: 'Fiji', year: 2018, cover: '50th-state-of-mind.jpg', song: 'Inspiration', url: 'https://youtu.be/YTrJzGEIveI'  },
    { title: 'Dear Billy', artist: 'Spawnbreezie', year: 2011, cover: 'dear-billy.jpg', song: "If It's You", url: 'https://youtu.be/7BMkzM-w36E'  },
    { title: 'The Green', artist: 'The Green', year: 2010, cover: 'the-green.jpg', song: "I'm Yours", url: 'https://youtu.be/ptlkQy7WwyQ'  },
    { title: 'Honey Baby', artist: 'Three Plus', year: 1999, cover: 'honey-baby.jpg', song: 'Cool Operator', url: 'https://youtu.be/ikeqtkv-6j0'  },
    { title: 'The Breakthrough', artist: 'Maoli', year: 2020, cover: 'the-breakthrough.jpg', song: 'A Place In the Sun', url: 'https://youtu.be/8-h0PPwpW1s'  },
];

const linkFor = (album: Album) =>
    album.url ||
    `https://www.youtube.com/results?search_query=${encodeURIComponent(
        `${album.artist} ${album.title}`
    )}`;

const AlbumCard: React.FC<{ album: Album }> = ({ album }) => {
    const [failed, setFailed] = useState(false);
    const src = `${process.env.PUBLIC_URL}/albums/${album.cover}`;

    return (
        <div style={styles.card}>
            <a
                href={linkFor(album)}
                target="_blank"
                rel="noreferrer"
                style={styles.coverLink}
                title={
                    album.song
                        ? `Play "${album.song}" on YouTube`
                        : `Search YouTube for ${album.title}`
                }
            >
                {failed ? (
                    <div style={styles.coverFallback}>
                        <p style={styles.coverFallbackText}>{album.title}</p>
                    </div>
                ) : (
                    <img
                        src={src}
                        alt={`${album.title} by ${album.artist}`}
                        style={styles.cover}
                        onError={() => setFailed(true)}
                    />
                )}
            </a>
            <p style={styles.albumTitle}>{album.title}</p>
            <p style={styles.albumMeta}>
                {album.artist} - {album.year}
            </p>
            {album.song && (
                <p style={styles.albumSong}>Song: {album.song}</p>
            )}
        </div>
    );
};

const Section: React.FC<{ label: string; albums: Album[] }> = ({
    label,
    albums,
}) => (
    <div style={styles.section}>
        <p style={styles.sectionLabel}>{label}</p>
        <div style={styles.grid}>
            {albums.map((album) => (
                <AlbumCard key={album.title} album={album} />
            ))}
        </div>
    </div>
);

const MusicProjects: React.FC<MusicProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Music</h1>
            <h3>Quick Thoughts</h3>
            <br />
            <div className="text-block">
                <p>
                    A running list of the albums I keep coming back to, grouped
                    by genre. Each cover links out to something worth starting
                    with.
                </p>
            </div>

            <Section label="HIP-HOP / RAP" albums={HIPHOP} />
            <Section label="R&B" albums={RNB} />
            <Section label="LATIN" albums={LATIN} />
            <Section label="REGGAE" albums={REGGAE} />
        </div>
    );
};

const styles: StyleSheetCSS = {
    section: {
        flexDirection: 'column',
        width: '100%',
        marginBottom: 48,
    },
    sectionLabel: {
        fontFamily: 'Terminal, monospace',
        fontSize: 16,
        letterSpacing: 2,
        color: '#666',
        marginBottom: 20,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: 32,
        width: '100%',
    },
    card: {
        flexDirection: 'column',
    },
    coverLink: {
        display: 'block',
        lineHeight: 0,
    },
    cover: {
        width: '100%',
        aspectRatio: '1 / 1',
        objectFit: 'cover',
        display: 'block',
    },
    coverFallback: {
        width: '100%',
        aspectRatio: '1 / 1',
        backgroundColor: '#e8e8e8',
        border: '1px solid #ccc',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        boxSizing: 'border-box',
    },
    coverFallbackText: {
        fontFamily: 'Terminal, monospace',
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
    },
    albumTitle: {
        fontFamily: 'MillenniumBold, serif',
        fontSize: 18,
        marginTop: 12,
    },
    albumMeta: {
        fontFamily: 'Terminal, monospace',
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    albumSong: {
        fontFamily: 'Terminal, monospace',
        fontSize: 14,
        color: '#555',
        marginTop: 6,
    },
};

export default MusicProjects;
