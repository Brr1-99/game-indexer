/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    return {
        owner_name: params.name,
    }
}
