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

from choices.ubicaciones import PROVINCIAS_ARG_CHOICES
from choices.general import ESTADOS_CHOICES, SEXO_CHOICES
from choices.boxeador import CATEGORIAS_CHOICES, ESTILO_COMBATE_CHOICES
from entrenador.models import Entrenador

# Create your models here.

class Boxeador(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    dni = models.CharField(max_length=10, unique=True)
    sexo = models.CharField(max_length=10, choices=SEXO_CHOICES, null=True, blank=True )
    nacimiento = models.DateField()
    licencia = models.CharField(max_length=10, unique=True,null=True, blank=True)
    vencimiento = models.DateField()
    provincias = models.CharField(max_length=200, choices=PROVINCIAS_ARG_CHOICES, default='Sin provincias')
    localidad = models.CharField(max_length=200, default='Sin localidad')
    peso = models.FloatField()
    division = models.CharField(max_length=50, choices=CATEGORIAS_CHOICES )
    estado = models.CharField(max_length=50, choices=ESTADOS_CHOICES, default='Activo')
    altura = models.FloatField()
    alcance = models.FloatField()
    postura_combate = models.CharField(max_length=50, choices=ESTILO_COMBATE_CHOICES )
    foto_boxeador = models.URLField(blank=True, null=True)
    entrenador = models.ForeignKey(Entrenador, on_delete=models.SET_NULL, null=True, blank=True)


    def __str__(self):
        return self.nombre
