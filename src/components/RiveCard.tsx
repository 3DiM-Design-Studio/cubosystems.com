'use client';

import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

// Plays the .riv's default artboard/state machine; fills its container, cropping
// evenly top and bottom (Fit.Cover).
export default function RiveCard({ src }: { src: string }) {
  const { RiveComponent } = useRive({
    src,
    autoplay: true,
    layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
  });
  return <RiveComponent />;
}
