import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qcgsbyvfiwvogfoimhia.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZ3NieXZmaXd2b2dmb2ltaGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMzg2MzksImV4cCI6MjA4NzYxNDYzOX0.cMSTKDBPz5ZA-pvWIiJh8ncoTLwS9SDRd6wSfnovVi4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('hb_dons').select('*');
  console.log('hb_dons:', JSON.stringify({ data, error }, null, 2));

  const { data: d2, error: e2 } = await supabase.from('donations').select('*');
  console.log('donations:', JSON.stringify({ data: d2, error: e2 }, null, 2));
}

test();
