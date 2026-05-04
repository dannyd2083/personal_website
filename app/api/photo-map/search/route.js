import {NextResponse} from 'next/server'
import {supabase} from "@/lib/supabase";
import {AutoTokenizer,CLIPTextModelWithProjection} from "@xenova/transformers";

let tokenizer = null;
let text_model = null;

async function getTextModel() {
    if (!text_model) {
        tokenizer = await AutoTokenizer.from_pretrained("Xenova/clip-vit-base-patch32");
        text_model = await CLIPTextModelWithProjection.from_pretrained("Xenova/clip-vit-base-patch32");
    }
    return { tokenizer, text_model};
}

export async function GET(request){
    const {searchParams} = new URL(request.url);
    const query = searchParams.get('q')?.trim();
    if (!query) return NextResponse.json({photos: []});

    const { tokenizer, text_model } = await getTextModel()
    const inputs = tokenizer([query], { padding: true, truncation: true })
    const { text_embeds } = await text_model(inputs)
    const embedding = Array.from(text_embeds.data)

    const { data: photos, error } = await supabase.rpc('search_photos', {
        query_embedding: embedding,
        match_count: 20
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ photos })
}

