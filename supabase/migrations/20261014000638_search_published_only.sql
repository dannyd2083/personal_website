CREATE OR REPLACE FUNCTION "public"."search_photos"("query_embedding" "public"."vector", "match_count" integer) RETURNS TABLE("id" "text", "url" "text", "alt" "text", "place_name" "text", "country" "text", "visit_name" "text", "similarity" double precision)
    LANGUAGE "plpgsql"
AS $$
BEGIN
    SET LOCAL enable_indexscan = off;
    RETURN QUERY
        SELECT
            p.id::text,
            p.url,
            p.alt,
            pl.name  AS place_name,
            pl.country,
            v.name   AS visit_name,
            (1 - (p.embedding <=> query_embedding))::float AS similarity
        FROM photos p
                 JOIN visits v  ON v.id  = p.visit_id
                 JOIN places pl ON pl.id = v.place_id
        WHERE p.status = 'published' AND p.embedding is not null
        ORDER BY p.embedding <=> query_embedding
        LIMIT match_count;
END;
$$;



