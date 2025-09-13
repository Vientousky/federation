"""
📦 MODELOS: Boxeador

🧩 Modelo principal:
---------------------

📌 Campos Principales
---------------------
Nombre: str, 
apellido:str, 
sexo: str,
dni:str,
n_licencia: str,  
nacionalidad: str, 
provincia:str,
localidad:str, 
fecha_nacimiento:date,
debutaje:data, 
carrera: data, 
peso:int, 
division:str, 
status:str, 
altura:int, 
stance :int, 
combates:int, 
rounds:int, 
KOs:int, 
boxer_foto:str,

🏅 Propiedades calculadas (@property):
---------------------
Se derivan automaticamente de los modelos de combates, por la relación del forenkey

- Total_Victorias: Muestra todas las victorias que tuvo
- Total_derrotas: Muestra todas las derrotas que tuvo
- Total_empates: Muestra todas las empates que tuvo 
- Total_sin_decición: Muestra todas las sin_decición que tuvo  


ATT: vientousky💕
"""

from django.db import models

# Create your models here.

class Boxeador(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    sexo = models.CharField(max_length=10, choices=[
        ('Masculino', 'Masculino'),
        ('Femenino', 'Femenino'),
    ])
    dni = models.CharField(max_length=10, unique=True)
    n_licencia = models.CharField(max_length=10, unique=True)
    provincia = models.CharField(max_length=50)
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
    fecha_nacimiento = models.DateField()
    debutaje = models.DateField()
    carrera = models.DateField()
    peso = models.FloatField()
    division = models.CharField(max_length=50, choices=[
        ('Peso Mosca', 'Peso Mosca'),
        ('Peso Gallo', 'Peso Gallo'),
        ('Peso Pluma', 'Peso Pluma'),
        ('Peso Ligero', 'Peso Ligero'),
        ('Peso Welter', 'Peso Welter'),
        ('Peso Medio', 'Peso Medio'),
        ('Peso Supermedio', 'Peso Supermedio'),
        ('Peso Semipesado', 'Peso Semipesado'),
        ('Peso Crucero', 'Peso Crucero'),
        ('Peso Pesado', 'Peso Pesado'),
    ])
    status = models.CharField(max_length=50, choices=[
        ('Activo', 'Activo'),
        ('Inactivo', 'Inactivo'),
        ('Suspendido', 'Suspendido'),
        ('Retirado', 'Retirado')
    ], default='Activo')
    altura = models.FloatField()
    alcance = models.FloatField()
    stance = models.CharField(max_length=50, choices=[
        ('Ortodoxo', 'Ortodoxo'),
        ('Zurdo', 'Zurdo'),
        ('Switch', 'Switch'),
    ])
    boxer_foto = models.URLField(blank=True, null=True)


    def __str__(self):
        return self.nombre
    
    @property 
    def combates_stats(self):
        combates = self.combates_principal.all()

        victorias = combates.filter(resultados__in=[
            'KOS', 'TKO', 'RSC', 'UD', 'PTS', 'IDT', 'TDU', 'TDM'
        ]).count()

        derrotas = combates.filter(resultados__in=[
            'DQ', 'DDQ', 'RET', 'TDS', 'AB'
        ]).count()

        empates = combates.filter(resultados__in=[
            'MD', 'SD', 'TDD'
        ]).count()

        sin_decision = combates.filter(resultados__in=[
            'NC', 'ND', 'BYE', 'WO'
        ]).count()

        total = victorias + derrotas + empates + sin_decision
        rounds = combates.aggregate(total=models.Sum('rounds'))['total'] or 0
        porcentaje_KOs = (self.KOs / total) * 100 if total > 0 else 0

        return {
            'total': total,
            'total_rounds': rounds,
            'porcentaje_KOs': round(porcentaje_KOs, 2),
            'total_victorias': victorias,
            'total_derrotas': derrotas,
            'total_empates': empates,
            'total_sin_decision': sin_decision
        }
