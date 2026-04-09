import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lhixlpzwupvmnshwnorj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoaXhscHp3dXB2bW5zaHdub3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5ODc5ODYsImV4cCI6MjA5MDU2Mzk4Nn0.sjMuko4D1EpOnTCXww1xOzCJtf0dp96_GZPqYpkYAUU';

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
