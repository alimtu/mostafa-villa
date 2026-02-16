export async function GET() {
  const res = await fetch("https://api.jajiga.com/api/room/3146019", {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: true, status: res.status, statusText: res.statusText }),
      {
        status: res.status,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

