export async function validateResponse(responce: Response): Promise<Response> {
  if (!responce.ok) {
    throw new Error(await responce.text());
  }
  return responce;
}
