import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qcgsbyvfiwvogfoimhia.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZ3NieXZmaXd2b2dmb2ltaGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMzg2MzksImV4cCI6MjA4NzYxNDYzOX0.cMSTKDBPz5ZA-pvWIiJh8ncoTLwS9SDRd6wSfnovVi4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkFinal() {
  const tables = ['hb_dons', 'hb_photos', 'hb_actualites', 'hb_evenements', 'hb_activites', 'hb_causes'];
  console.log("--- FINAL SCHEMA CHECK ---");
  for (const t of tables) {
    const { data, error } = await supabase.from(t).select('*').limit(1);
    if (!error) {
      console.log(`✅ ${t}: [${Object.keys(data[0] || {}).join(', ')}]`);
    } else {
      console.log(`❌ ${t} Error: ${error.message}`);
    }
  }
}

checkFinal();
