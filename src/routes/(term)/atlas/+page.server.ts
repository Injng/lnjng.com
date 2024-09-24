export async function load({ locals: { supabase }}) {
    // Download the file from the 'misc' bucket
    const { data, error: downloadError } = await supabase.storage
        .from('misc')
        .download('flag.txt');

    if (downloadError) {
        console.log(downloadError)
        return {
            flag: null
        };
    }

    // Convert the downloaded data to text
    const flagContent = await data.text();

    // Return the flag content to be used in +page.svelte
    return {
        flag: flagContent
    };
}
