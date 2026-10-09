-- The dump only covers the public schema, so it omits this, but the tables use the vector type.
create extension if not exists vector with schema public;

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';



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
    ORDER BY p.embedding <=> query_embedding                                                                                                                                                                    
    LIMIT match_count;
  END;                                                                                                                                                                                                          
  $$;


ALTER FUNCTION "public"."search_photos"("query_embedding" "public"."vector", "match_count" integer) OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."photos" (
    "id" "text" NOT NULL,
    "visit_id" "text",
    "url" "text" NOT NULL,
    "alt" "text",
    "embedding" "public"."vector"(512)
);


ALTER TABLE "public"."photos" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."places" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "country" "text" NOT NULL,
    "longitude" double precision NOT NULL,
    "latitude" double precision NOT NULL,
    "description" "text",
    "camera" "text",
    "cover_photo" "text",
    "last_photographed" "text"
);


ALTER TABLE "public"."places" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."visits" (
    "id" "text" NOT NULL,
    "place_id" "text",
    "name" "text" NOT NULL,
    "date" "text"
);


ALTER TABLE "public"."visits" OWNER TO "postgres";


ALTER TABLE ONLY "public"."photos"
    ADD CONSTRAINT "photos_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."places"
    ADD CONSTRAINT "places_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."visits"
    ADD CONSTRAINT "visits_pkey" PRIMARY KEY ("id");



CREATE INDEX "photos_embedding_idx" ON "public"."photos" USING "ivfflat" ("embedding" "public"."vector_cosine_ops") WITH ("lists"='10');



ALTER TABLE ONLY "public"."photos"
    ADD CONSTRAINT "photos_visit_id_fkey" FOREIGN KEY ("visit_id") REFERENCES "public"."visits"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."visits"
    ADD CONSTRAINT "visits_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE CASCADE;



ALTER TABLE "public"."photos" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."places" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "public read photos" ON "public"."photos" FOR SELECT TO "anon" USING (true);



CREATE POLICY "public read places" ON "public"."places" FOR SELECT TO "anon" USING (true);



CREATE POLICY "public read visits" ON "public"."visits" FOR SELECT TO "anon" USING (true);



ALTER TABLE "public"."visits" ENABLE ROW LEVEL SECURITY;


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON FUNCTION "public"."search_photos"("query_embedding" "public"."vector", "match_count" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."search_photos"("query_embedding" "public"."vector", "match_count" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."search_photos"("query_embedding" "public"."vector", "match_count" integer) TO "service_role";



GRANT ALL ON TABLE "public"."photos" TO "anon";
GRANT ALL ON TABLE "public"."photos" TO "authenticated";
GRANT ALL ON TABLE "public"."photos" TO "service_role";



GRANT ALL ON TABLE "public"."places" TO "anon";
GRANT ALL ON TABLE "public"."places" TO "authenticated";
GRANT ALL ON TABLE "public"."places" TO "service_role";



GRANT ALL ON TABLE "public"."visits" TO "anon";
GRANT ALL ON TABLE "public"."visits" TO "authenticated";
GRANT ALL ON TABLE "public"."visits" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";







