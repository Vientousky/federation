from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.

class Boxeador(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    sexo = models.CharField(max_length=10, choices=[
        ('Masculino', 'Masculino'),
        ('Femenino', 'Femenino'),
    ])
    dni = models.CharField(max_length=10, unique=True)
    numero_licencia = models.CharField(max_length=10, unique=True)
    nacionalidad = models.CharField(max_length=50)
    provincia = models.CharField(max_length=50)
    localidad = models.CharField(max_length=150)
    fecha_nacimiento = models.DateField()
    debutaje = models.DateField()
    carrera = models.DateField()
    peso = models.FloatField()
    divicion = models.CharField(max_length=50, choices=[
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
    combates = models.IntegerField(default=0)
    rounds = models.IntegerField(default=0)
    KOs = models.IntegerField(default=0)
    foto = models.URLField(blank=True, null=True)


    def __str__(self):
        return self.nombre
    
    @property
    def total_victorias(self):
        return self.combates_principal.filter(resultados__in=[
        'KOS', 'TKO', 'RSC', 'UD', 'PTS', 'IDT', 'TDU', 'TDM'
    ]).count()

    @property
    def total_derrotas(self):
        return self.combates_principal.filter(resultados__in=[
        'DQ', 'DDQ', 'RET', 'TDS', 'AB'
        ]).count()

    @property
    def total_empates(self):
        return self.combates_principal.filter(resultados__in=[
        'MD', 'SD', 'TDD'
    ]).count()

    @property
    def total_sin_decision(self):
        return self.combates_principal.filter(resultados__in=[
        'NC', 'ND', 'BYE', 'WO'
    ]).count()
