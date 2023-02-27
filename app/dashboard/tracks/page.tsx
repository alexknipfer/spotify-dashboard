'use client';
import { Fragment } from 'react';

// import Heading from '@/components/Heading';
// import TimeRangeControls from '@/components/TimeRangeControls';

export default function Tracks() {
  return (
    <Fragment>
      {/* <div className="flex justify-between items-center flex-col mb-10 md:flex-row">
        <Heading level="h1">Top Tracks</Heading>
        <TimeRangeControls
          currentTimeFilter={currentTimeRange}
          onChange={(range) =>
            router.push({ pathname: RoutePath.TRACKS, query: { range } })
          }
          className="mt-5 md:mt-0"
        />
      </div>
      <ul>
        {topTracks ? (
          topTracks.items.map((track) => (
            <li key={track.id}>
              <TrackCard
                id={track.id}
                name={track.name}
                album={track.album}
                duration={track.duration_ms}
                artists={track.artists}
              />
            </li>
          ))
        ) : (
          <SkeletonList skeletonComponent={<TrackCard isLoading />} />
        )}
      </ul> */}
    </Fragment>
  );
}
