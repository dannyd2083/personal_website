import {createClient} from "@supabase/supabase-js";
import {readFileSync} from "fs";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const seedData = JSON.parse(readFileSync("data/places-seed.json", "utf-8"));

for (const place of seedData.places) {
    console.log(`Inserted ${place.name}`);
    const {visits, ...placeData} = place;
    const {error} = await supabase.from("places").upsert(placeData);
    if (error) { console.error('Place error:', error); process.exit(1) }
    for (const visit of visits){
        const {photos, ...visitData} = visit;
        const {error} = await supabase.from("visits").upsert({ ...visitData, place_id: place.id });
        if (error) { console.error('Visit error:', error); process.exit(1) }
        for (const photo of photos){
            const {error} = await supabase.from("photos").upsert({...photo, visit_id: visit.id} );
            if (error) { console.error('Photo error:', error); process.exit(1) }
        }
    }
}
console.log("Database seeded successfully!");
