import Image from 'next/image';
import { memo } from 'react';
import twemoji from 'twemoji';

const U200D = String.fromCharCode(0x200d);
const UFE0Fg = /\uFE0F/g;

function Twemoji({
  emoji,
  ext = 'svg',
  width = 72,
  height = 72,
}: {
  emoji: string;
  ext?: 'svg' | 'png';
  width?: number | string;
  height?: number | string;
}) {
  const HEXCodePoint = twemoji.convert.toCodePoint(emoji.indexOf(U200D) < 0 ? emoji.replace(UFE0Fg, '') : emoji);

  return (
    <Image
      src={`https://twemoji.maxcdn.com/v/latest/${ext === 'png' ? '72x72' : 'svg'}/${HEXCodePoint}.${ext}`}
      width={width as number}
      height={height as number}
      alt={emoji}
      draggable={false}
    />
  );
}

export default memo(Twemoji);
