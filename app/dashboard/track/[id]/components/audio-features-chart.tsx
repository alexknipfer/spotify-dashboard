'use client';

import { Fragment, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

import { SpotifyAudioFeatures } from '@/types/spotify.interface';

const keys = [
  'acousticness',
  'danceability',
  'energy',
  'liveness',
  'speechiness',
  'valence',
];

interface Props {
  audioFeatures: SpotifyAudioFeatures;
}

type ChartDataPoints = Array<{ x: string; y: string | number }>;

export default function AudioFeaturesChart({ audioFeatures }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<'bar', ChartDataPoints> | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          xAxes: {
            ticks: {
              display: false,
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.4)',
            },
          },
          yAxes: {
            beginAtZero: true,
            ticks: {
              display: false,
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.4)',
            },
          },
        },
      },
      data: {
        labels: keys,
        datasets: [
          {
            backgroundColor: [
              'rgba(105, 76, 163, 0.3)',
              'rgba(255, 116, 116, 0.3)',
              'rgba(70, 255, 246, 0.3)',
              'rgba(255, 160, 250, 0.3)',
              'rgba(255, 192, 75, 0.3)',
              'rgba(86, 193, 255, 0.3)',
            ],
            borderColor: [
              '#6a509c',
              '#ff4a4a',
              '#1ffff4',
              '#ff5be9',
              '#ffd932',
              '#7caaff',
            ],
            borderWidth: 1,
            data: keys.map((key) => ({
              x: key,
              y: audioFeatures[key],
            })),
          },
        ],
      },
    });

    return () => {
      chartRef.current && chartRef.current.destroy();
    };
  }, [audioFeatures]);

  return (
    <Fragment>
      <h3 className="text-xl text-white font-bold text-center mb-5">
        Track Audio Features
      </h3>
      <div className="w-full relative h-96">
        <canvas id="chart" ref={canvasRef} width="500" height="500" />
      </div>
    </Fragment>
  );
}
