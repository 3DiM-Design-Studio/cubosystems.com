'use client';

import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { useMediaQuery } from './useMediaQuery';

function Player({ src, fit }: { src: string; fit: Fit }) {
  const { RiveComponent } = useRive({
    src,
    autoplay: true,
    layout: new Layout({ fit, alignment: Alignment.Center }),
  });
  return <RiveComponent />;
}

// Plays the .riv's default artboard/state machine; fills its container. Cover crops
// evenly top and bottom; on small cards the area is short and wide, so Contain
// keeps the whole artboard visible instead.
export default function RiveCard({ src }: { src: string }) {
  const small = useMediaQuery('(max-width: 800px)');
  return <Player key={String(small)} src={src} fit={small ? Fit.Contain : Fit.Cover} />;
}
