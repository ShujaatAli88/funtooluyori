import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://toahrnibteslnlewxefh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvYWhybmlidGVzbG5sZXd4ZWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMDAzNjUsImV4cCI6MjA5MzU3NjM2NX0.vmkiaRkgPyBfpARtWU-KefXft4lSbpoyNzgx6Pkf6t4'
)
