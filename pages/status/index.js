import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status do Sistema</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <p>
      <strong>Última atualização:</strong> {updatedAtText}
    </p>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let dbInfo = "Carregando...";

  if (!isLoading && data) {
    const db = data.dependencies.database;
    dbInfo = (
      <>
        <p>
          <strong>Versão do Banco de Dados:</strong> {db.version}
        </p>
        <p>
          <strong>Conexões Máximas:</strong> {db.max_connections}
        </p>
        <p>
          <strong>Conexões Abertas:</strong> {db.opened_connections}
        </p>
      </>
    );
  }

  return <>{dbInfo}</>;
}
