import { useAuth } from '../hooks/useAuth';

export default function WriterArea() {
  const { username } = useAuth();

  return (
    <main>
      <section>
        <h4>Bem vindo {username}</h4>
      </section>
    </main>
  );
}
