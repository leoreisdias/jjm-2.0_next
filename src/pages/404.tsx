import Link from 'next/link';

export default function Error404() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>
        Oops... Essa página não existe{' '}
        <span role="img" aria-label="emojiFace">
          🤨 ❌
        </span>
      </h1>
      <h3>Volte para a tela inicial</h3>
      <h3 style={{ color: '#1D75A5' }}>
        <span role="img" aria-label="EmojiWind">
          💨
        </span>
        <Link href="/"> Página Inicial JJM</Link>
      </h3>
    </div>
  );
}
