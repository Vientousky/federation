"""
📦 MODELOS: Boxeador

🧩 Modelo principal:
---------------------

📌 Campos Principales
---------------------
Nombre:str,
apellido:str,
cargo:str,
dni:str,
n_licencia:str,
vencimiento:data,
localidad:str,
trainer_foto:str,

ATT: Vientousky💕
"""
from django.db import models

#Creación de modelos de trainers

class Entrenador(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    CARGO_CHOICES = [
        ("director tecnico", "Director Técnico"),
        ("entrenador principal", "Entrenador Principal"),
        ("preparador fisico", "Preparador Físico"),
        ("segundo entrenador", "Segundo Entrenador"),
        ("cutman", "Cutman"),
        ("nutricionista", "Nutricionista"),
        ("psicologo", "Psicólogo Deportivo"),
        ("manager", "Mánager Deportivo"),
        ("asistente_tecnico", "Asistente Técnico"),
        ("kinesiologo", "Kinesiólogo / Fisioterapeuta"),
        ("sparring", "Preparador de Sparring"),
        ("analista", "Analista de Rendimiento"),
    ]
    cargo = models.CharField(max_length=50, choices=CARGO_CHOICES)
    dni = models.CharField(max_length=10, unique=True)
    n_licencia = models.CharField(max_length=10, unique=True)
    vencimiento = models.DateField()
    LOCALIDADES_CHOICES = [
    ("Almirante Brown", [
        ("Concepción del Bermejo", "Concepción del Bermejo"),
        ("Los Frentones", "Los Frentones"),
        ("Pampa del Infierno", "Pampa del Infierno"),
        ("Taco Pozo", "Taco Pozo"),
    ]),
    ("Bermejo", [
        ("General Vedia", "General Vedia"),
        ("Isla del Cerrito", "Isla del Cerrito"),
        ("La Leonesa", "La Leonesa"),
        ("Las Palmas", "Las Palmas"),
        ("Puerto Bermejo", "Puerto Bermejo"),
        ("Puerto Eva Perón", "Puerto Eva Perón"),
    ]),
    ("Chacabuco", [
        ("Charata", "Charata"),
    ]),
    ("Comandante Fernández", [
        ("Presidencia Roque Sáenz Peña", "Presidencia Roque Sáenz Peña"),
    ]),
    ("Doce de Octubre", [
        ("Gancedo", "Gancedo"),
        ("General Capdevila", "General Capdevila"),
        ("General Pinedo", "General Pinedo"),
    ]),
    ("Dos de Abril", [
        ("Hermoso Campo", "Hermoso Campo"),
    ]),
    ("Fray Justo Santa María de Oro", [
        ("Chorotis", "Chorotis"),
        ("Santa Sylvina", "Santa Sylvina"),
    ]),
    ("General Belgrano", [
        ("Corzuela", "Corzuela"),
    ]),
    ("General Donovan", [
        ("La Escondida", "La Escondida"),
        ("La Verde", "La Verde"),
        ("Lapachito", "Lapachito"),
        ("Makallé", "Makallé"),
    ]),
    ("General Güemes", [
        ("El Sauzalito", "El Sauzalito"),
        ("El Espinillo", "El Espinillo"),
        ("Fuerte Esperanza", "Fuerte Esperanza"),
        ("Juan José Castelli", "Juan José Castelli"),
        ("Miraflores", "Miraflores"),
        ("Misión Nueva Pompeya", "Misión Nueva Pompeya"),
        ("Villa Río Bermejito", "Villa Río Bermejito"),
    ]),
    ("Independencia", [
        ("Avia Terai", "Avia Terai"),
        ("Campo Largo", "Campo Largo"),
        ("Napenay", "Napenay"),
    ]),
    ("Libertad", [
        ("Colonia Popular", "Colonia Popular"),
        ("Laguna Blanca", "Laguna Blanca"),
        ("Puerto Tirol", "Puerto Tirol"),

        ("General Obligado", "General Obligado"),
        ("Cardoso", "Cardoso"),
        ("Puerto Bastiani", "Puerto Bastiani"),
        ("Villa Jalon", "Villa Jalón"),
        ("Cruce Viejo", "Cruce Viejo"),
    ]),
    ("Libertador General San Martín", [
        ("Ciervo Petiso", "Ciervo Petiso"),
        ("General Jose de San Martín", "General Jose de San Martín"),
        ("La Eduvigis", "La Eduvigis"),
        ("Laguna Limpia", "Laguna Limpia"),
        ("Pampa del Indio", "Pampa del Indio"),
        ("Pampa Almirón", "Pampa Almirón"),
        ("Presidencia Roca", "Presidencia Roca"),
    ]),
    ("Maipu", [
        ("Tres Isletas", "Tres Isletas"),
    ]),
    ("Mayor Luis Jorge Fontana", [
        ("Coronel Du Graty", "Coronel Du Graty"),
        ("Enrique Urién", "Enrique Urién"),
        ("Villa Ángela", "Villa Ángela"),
    ]),
    ("Nueve de Julio", [
        ("Las Breñas", "Las Breñas"),
    ]),
    ("O'Higgins", [
        ("La Clotilde", "La Clotilde"),
        ("La Tigra", "La Tigra"),
        ("San Bernardo", "San Bernardo"),
    ]),
    ("Presidencia de la Plaza", [
        ("Presidencia de la Plaza", "Presidencia de la Plaza"),
    ]),
    ("Primero de Mayo", [
        ("Margarita Belén", "Margarita Belén"),
        ("Colonia Benítez", "Colonia Benítez"),
    ]),
    ("Quitilipi", [
        ("Quitilipi", "Quitilipi"),
        ("San Martín", "San Martín"),
    ]),
    ("San Fernando", [
        ("Resistencia", "Resistencia"),
        ("Barranqueras", "Barranqueras"),
        ("Basail", "Basail"),
        ("Fontana", "Fontana"),
        ("Puerto Vilelas", "Puerto Vilelas"),
    ]),
    ("San Lorenzo", [
        ("Villa Berthet", "Villa Berthet"),
        ("Samuhú", "Samuhú"),
    ]),
    ("Sargento Cabral", [
        ("Capitán Solari", "Capitán Solari"),
        ("Colonia Elisa", "Colonia Elisa"),
        ("Colonias Unidas", "Colonias Unidas"),
        ("Las Garcitas", "Las Garcitas"),
    ]),
    ("Tapenagá", [
        ("Charadai", "Charadai"),
        ("Cote Lai", "Cote Lai"),
    ]),
    ("Veinticinco de Mayo", [
        ("Machagai", "Machagai"),
    ]),
]
    localidad = models.CharField(max_length=150, choices=LOCALIDADES_CHOICES)
    trainer_foto = models.URLField(blank=True, null=True)

