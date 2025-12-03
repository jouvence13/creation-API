from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Variables d'environnement manquantes (SUPABASE_URL ou SUPABASE_SERVICE_KEY)")
    exit()

try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    # simple requête pour tester la connexion
    response = supabase.table("test_connection").select("*").limit(1).execute()

    print("Connexion à Supabase réussie")
    print("Réponse :", response.data)

except Exception as e:
    print("Erreur de connexion à Supabase :", e)
