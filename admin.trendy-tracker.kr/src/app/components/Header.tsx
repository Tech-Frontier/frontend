import { styled } from '@/utils/styled';
import { ActiveLink } from './ActiveLink';
import { Logo } from './Logo';
import { MENUS } from '../constants';

export function Header({ className }: { className?: string }) {
  return (
    <Wrapper className={className}>
      <Nav>
        <Logo />
        <Menus>
          {
            MENUS.map(({ path, title }: any) =>
              <Menu key={`${path}`}>
                <ActiveLink path={path} title={title} />
              </Menu>,
            )
          }
        </Menus>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled('div', {
  position: 'sticky',
  top: '0px',
  background: '#f6f5f4',
});

const Nav = styled('nav', {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  gap: '12px',
  justifyContent: 'space-between',
  paddingRight: '12px',
  paddingLeft: '12px',
  alignItems: 'center',
  padding: '8px',
  height: '100%',
});

const Menus = styled('ul', {
  display: 'flex',
  gap: '12px',
  listStyle: 'none',
});

const Menu = styled('li', {
  fontFamily: 'Noto Sans KR',
  _hover: {
    fontWeight: 'bold',
  },
});
