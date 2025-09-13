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
from choices.ubicaciones import PROVINCIAS_ARG_CHOICES
from choices.general import SEXO_CHOICES
from choices.entrenador import CARGO_CHOICES

#Creación de modelos de trainers

class Entrenador(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    cargo = models.CharField(max_length=50, choices=CARGO_CHOICES)
    sexo = models.CharField(max_length=25, choices=SEXO_CHOICES, null=True, blank=True)
    dni = models.CharField(max_length=10, unique=True)
    licencia = models.CharField(max_length=10, unique=True, null=True, blank=True)
    vencimiento = models.DateField()
    provincias = models.CharField(max_length=200, choices=PROVINCIAS_ARG_CHOICES, default='Sin provincias')
    localidad = models.CharField(max_length=200, default='Sin localidad')
    foto_entrenador = models.URLField(blank=True, null=True)
