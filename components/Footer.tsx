import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/privacy-policy">Privacy</Link>
      </nav>
    </footer>
  );
}
