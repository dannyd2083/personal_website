import{ NextResponse } from 'next/server'
import {supabase} from "@/lib/supabase";

export async function GET() {
    const { data: places, error } = await supabase.from('places').select(`                                                                                                        
    *,                                                                                                                                                                          
    visits (                                                                                                                                                                    
      id, name, date,                                                                                                                                                           
      photos ( id, url, alt )
    )                                                                                                                                                                           
  `)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ places })
}