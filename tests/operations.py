"""Petites fonctions utilitaires pour les exercices de tests."""


def addition(a, b):
    """Retourne la somme de deux valeurs."""
    return a + b


def maximum(nombres):
    """Retourne la valeur maximale d'une séquence; Non si elle est vide."""
    if not nombres:
        return None
    return max(nombres)


def format_nom(prenom, nom):
    """Formate un nom complet avec un prénom capitalisé et un nom en majuscules."""
    prenom_formate = prenom.strip().title()
    nom_formate = nom.strip().upper()
    return f"{prenom_formate} {nom_formate}"

