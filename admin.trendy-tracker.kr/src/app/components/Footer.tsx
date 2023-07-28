import Link from 'next/link';
import { styled } from '@/utils/styled';
import { css } from '@styled-system/css';

export function Footer({ className }: { className?: string }) {
  return (
    <Wrapper className={className}>
      <Link
        href="https://github.com/Tech-Frontier"
        className={css({
          _hover: {
            textDecoration: 'underline',
            color: 'blue',
          },
        })}
      >
        ⓒ Tech-Frontier
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled('footer', {
  fontSize: '1rem',
  fontWeight: 'bold',
  margin: '0 auto',
  textAlign: 'center',
});
