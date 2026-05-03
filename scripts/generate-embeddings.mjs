import {createClient} from "@supabase/supabase-js";
import {AutoProcessor, CLIPVisionModelWithProjection, RawImage} from "@xenova/transformers"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const processor = await AutoProcessor.from_pretrained("Xenova/clip-vit-base-patch32")
const visionModel = await CLIPVisionModelWithProjection.from_pretrained("Xenova/clip-vit-base-patch32")

let {data,error} =  await supabase.from("photos").select('id,url').is('embedding',null);
if (error) { console.error(error); process.exit(1) }
const photos = data
console.log(`Found ${photos.length} photos without embeddings.`)

for(const photo of photos){
    const image = await RawImage.fromURL(photo.url)
    const imageInputs = await processor(image)
    const {image_embeds} = await visionModel(imageInputs)
    const embedding = Array.from(image_embeds.data)
    const { error: updateError } = await supabase.from('photos').update({ embedding }).eq('id', photo.id)
    if (updateError) { console.error(`Failed: ${updateError.message}`) }
    else { console.log(`-- ${photo.id}`) }
}
console.log('All embeddings generated!')