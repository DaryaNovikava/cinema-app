export async function validateResponse(responce) {
    if (!responce.ok) {
        throw new Error(await responce.text());
    }
    return responce;
}